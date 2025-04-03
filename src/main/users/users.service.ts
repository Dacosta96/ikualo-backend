import { Inject, Injectable } from '@nestjs/common';
import { UserCreateDTO } from '../dtos/user.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClerkClient, createClerkClient } from '@clerk/backend';
import { config } from 'src/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UsersService {
  private clerkClient: ClerkClient;

  constructor(
    @InjectModel(UserEntity.name)
    private userEntityModel: Model<UserEntity>,
    @Inject(config.KEY) private configModule: ConfigType<typeof config>,
  ) {
    this.clerkClient = createClerkClient({
      secretKey: this.configModule.clerk.secretKey,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userEntityModel.find();
    } catch (err) {
      console.error('Error fetching users:', err);
      throw new Error('Error fetching users');
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await this.userEntityModel.findOne({ email });
    } catch (err) {
      console.error(`Error fetching user by email (${email}):`, err);
      throw new Error('Error fetching user');
    }
  }

  async createWithClerkUser(userCreateDTO: UserCreateDTO): Promise<UserEntity> {
    try {
      const { firstName, lastName, email, password } = userCreateDTO;

      // Step 1: Validate unique email
      const existingUser = await this.userEntityModel.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Step 2: Create user in Clerk
      const clerUserResponse = await this.createClerkUser({
        email,
        firstName,
        lastName,
        password,
      });
      if (!clerUserResponse?.status) {
        throw new Error(
          `Error creating user in Clerk: ${clerUserResponse?.message}`,
        );
      }

      const clerUser = clerUserResponse.data;
      // console.log('clerUser:', clerUser);
      if (!clerUser) throw new Error('Error creating user in Clerk');

      // Step 3: Save to the database
      const userSaved = await this.userEntityModel.create({
        firstName,
        lastName,
        email,
        clerkId: clerUser.id,
      });

      return userSaved;
    } catch (err) {
      console.log('err:', err?.message);
      throw err;
    }
  }

  async createClerkUser({ email, firstName, lastName, password }) {
    try {
      const user = await this.clerkClient.users.createUser({
        emailAddress: [email],
        firstName: firstName,
        lastName: lastName,
        password,
      });

      return {
        status: true,
        data: user,
      };
    } catch (err) {
      console.error('Error creating or inviting user:', err);
      return {
        status: false,
        message: err?.errors[0]?.message,
      };
    }
  }
}
