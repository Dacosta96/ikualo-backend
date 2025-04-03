import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from '../dtos/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('/ping')
  // ping() {
  //   return {
  //     messge: 'Service Users is running',
  //   };
  // }

  @ApiOperation({ summary: 'Create a new user with Clerk' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('/create-with-clerk')
  createWithClerkUser(
    @Body(new ValidationPipe()) userCreateDTO: UserCreateDTO,
  ) {
    return this.usersService.createWithClerkUser(userCreateDTO);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get a user by email' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('/by-email')
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
