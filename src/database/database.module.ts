import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { uri } = configService.mongo;
        if (process.env.MONGO_TLS_CA_FILE) {
          return { uri, tlsCAFile: process.env.MONGO_TLS_CA_FILE };
        }
        return { uri };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
