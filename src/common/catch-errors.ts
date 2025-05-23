import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    this.logger.error(
      '================================================================================================================',
    );
    this.logger.error(
      exception instanceof HttpException ? exception.message : exception,
    );
    this.logger.error(
      '================================================================================================================',
    );

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      // message: process.env.NODE_ENV === 'prod' ? null : getMessage(exception),
      // response: process.env.NODE_ENV === 'prod' ? null : getResponse(exception),
      message: getMessage(exception),
      response: getResponse(exception),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

const getMessage = (exception: any) => {
  return exception?.message;
};

const getResponse = (exception: any) => {
  return exception?.response;
};
