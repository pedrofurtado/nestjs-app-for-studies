import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CatsExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const validation_msgs = exception.getResponse();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        peter: 'furtado',
        path: request.url,
        exception_message: exception.message,
        exception_name: exception.name,
        validation_messages: validation_msgs,
        backtrace: exception.stack.split("\n"),
      });
  }
}
