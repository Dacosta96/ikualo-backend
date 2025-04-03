import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModule } from './config';
import { DatabaseModule } from './database/database.module';
import { databaseAllModules } from './database/database.all.modules';
import { UsersModule } from './main/users/users.module';
import { MovementsModule } from './main/movements/movements.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    DatabaseModule,
    ...databaseAllModules,
    UsersModule,
    MovementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
