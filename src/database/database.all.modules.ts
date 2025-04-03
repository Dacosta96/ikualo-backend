import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './entities/user.entity';

export const databaseAllModules = [
  MongooseModule.forFeature([
    {
      name: UserEntity.name,
      schema: UserEntitySchema,
    },
  ]),
];
