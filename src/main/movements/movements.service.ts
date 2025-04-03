import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MovementEntity } from 'src/database/entities/movement.entity';
import { MovementCreateDTO, MovementUpdateDTO } from '../dtos/movement.dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(MovementEntity.name)
    private movementEntityModel: Model<MovementEntity>,
    @InjectModel(UserEntity.name)
    private userEntityModel: Model<UserEntity>,
  ) {}

  async create(movementCreateDTO: MovementCreateDTO): Promise<MovementEntity> {
    // Validate user exists
    const user = await this.userEntityModel.findOne({
      email: movementCreateDTO.emailUser,
    });
    console.log('User:', user);

    if (!user) {
      throw new NotFoundException(
        `User with ID ${movementCreateDTO.emailUser} not found`,
      );
    }

    // Create the movement
    const movement = await this.movementEntityModel.create({
      userId: new Types.ObjectId(user?._id as string),
      type: movementCreateDTO.type,
      amount: movementCreateDTO.amount,
      description: movementCreateDTO.description || '',
      date: movementCreateDTO.date
        ? new Date(movementCreateDTO.date)
        : new Date(),
    });

    // Update user capital based on movement type
    const amount = movementCreateDTO.amount;
    if (movementCreateDTO.type === 'income') {
      user.capital += amount;
    } else if (movementCreateDTO.type === 'expense') {
      // Check if user has enough capital

      user.capital -= amount;
    }

    // Save updated user capital
    await this.userEntityModel.findByIdAndUpdate(user._id, {
      capital: user.capital,
    });

    return movement;
  }

  async findAll(): Promise<MovementEntity[]> {
    return this.movementEntityModel.find().exec();
  }

  async findOne(id: string): Promise<MovementEntity> {
    const movement = await this.movementEntityModel.findById(id).exec();
    if (!movement) {
      throw new NotFoundException(`Movement with ID ${id} not found`);
    }
    return movement;
  }

  async remove(id: string): Promise<MovementEntity> {
    // Get the movement to be deleted
    const movement = await this.movementEntityModel.findById(id).exec();
    if (!movement) {
      throw new NotFoundException(`Movement with ID ${id} not found`);
    }

    // Get the user
    const user = await this.userEntityModel.findById(movement.userId).exec();
    if (!user) {
      throw new NotFoundException(
        `User with ID ${movement.userId.toString()} not found`,
      );
    }

    // Revert the movement's effect on capital
    if (movement.type === 'income') {
      user.capital -= movement.amount;
    } else if (movement.type === 'expense') {
      user.capital += movement.amount;
    }

    // Delete the movement
    await this.movementEntityModel.findByIdAndDelete(id).exec();

    // Save updated user capital
    await this.userEntityModel.findByIdAndUpdate(user._id, {
      capital: user.capital,
    });

    return movement;
  }

  async findByUser(emailUser: string): Promise<MovementEntity[]> {
    // Buscar el usuario por email
    console.log('Email User:', emailUser);
    const user = await this.userEntityModel.findOne({ email: emailUser });
    console.log('User:', user);

    // Verificar si el usuario existe
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Buscar los movimientos asociados al userId (convertido explícitamente en ObjectId)
    return this.movementEntityModel
      .find({ userId: new Types.ObjectId(user._id as string) })
      .sort({ date: -1 })
      .exec();
  }

  async update(movementUpdateDTO: MovementUpdateDTO): Promise<MovementEntity> {
    const { _id, type, amount, description, date } = movementUpdateDTO;

    // Buscar el movimiento existente
    const movement = await this.movementEntityModel.findById(_id);
    if (!movement) {
      throw new NotFoundException(`Movement with ID ${_id} not found`);
    }

    // Buscar al usuario asociado
    const user = await this.userEntityModel.findById(movement.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${movement.userId.toString()} not found`,
      );
    }

    // Revertir el impacto del movimiento anterior en el capital del usuario
    if (movement.type === 'income') {
      user.capital -= movement.amount;
    } else if (movement.type === 'expense') {
      user.capital += movement.amount;
    }

    // Aplicar los nuevos valores si están presentes en DTO
    if (type) movement.type = type;
    if (amount !== undefined) movement.amount = amount;
    if (description !== undefined) movement.description = description;
    if (date) movement.date = new Date(date);

    // Aplicar el nuevo impacto en el capital del usuario
    if (movement.type === 'income') {
      user.capital += movement.amount;
    } else if (movement.type === 'expense') {
      user.capital -= movement.amount;
    }

    // Guardar cambios en la base de datos
    await this.userEntityModel.findByIdAndUpdate(user._id, {
      capital: user.capital,
    });
    await movement.save();

    return movement;
  }
}
