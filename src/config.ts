import { registerAs } from '@nestjs/config';
import { enviroments } from './environments';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    mongo: {
      uri: process.env.MONGO_URI,
    },
    clerk: {
      secretKey: process.env.CLERK_SECRET_KEY,
    },
  };
});

export const configModule = {
  envFilePath: enviroments[process.env.NODE_ENV ?? 'development'] || '.env',
  load: [config],
  isGlobal: true,
  validationSchema: Joi.object({
    MONGO_URI: Joi.string().not().empty().required(),
    CLERK_SECRET_KEY: Joi.string().not().empty().required(),
  }),
};
