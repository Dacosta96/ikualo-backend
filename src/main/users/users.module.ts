import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { databaseAllModules } from 'src/database/database.all.modules';

@Module({
  imports: [...databaseAllModules],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
