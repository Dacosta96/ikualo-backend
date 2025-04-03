import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';
import {
  MovementEntity,
  MovementEntitySchema,
} from 'src/database/entities/movement.entity';
import {
  UserEntity,
  UserEntitySchema,
} from 'src/database/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MovementEntity.name,
        schema: MovementEntitySchema,
      },
      {
        name: UserEntity.name,
        schema: UserEntitySchema,
      },
    ]),
  ],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule {}
