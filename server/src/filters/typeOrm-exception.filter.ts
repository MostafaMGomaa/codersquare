import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeormExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;
    const isDevelopment = process.env.NODE_ENV === 'development';

    let message = 'Something went wrong, please try again later.';
    let detailMessage = exception.detail || '';

    switch (exception.code) {
      // Foreign key violation
      case '23503':
        const missingKey = detailMessage.match(/\(([^)]+)\)=\(([^)]+)\)/);
        message = missingKey
          ? `Invaild value for ${missingKey[1]}`
          : 'The specified record does not exist.';
        break;

      // Unique constraint violation
      case '23505':
        const conflictField = detailMessage.match(/\(([^)]+)\)/);
        message = conflictField
          ? `The value provided for ${conflictField[1].replace(/"/g, '')} already exists. Please use a different value.`
          : 'This record already exists. Duplicate entries are not allowed.';
        break;

      // Not null violation
      case '23502':
        const nullField = detailMessage.match(/"([^"]+)"/);
        message = nullField
          ? `The field ${nullField[1]} cannot be empty. Please provide a valid value.`
          : 'A required field is missing.';
        break;

      // Invalid text representation (UUID or other invalid input)
      case '22P02':
        const invalidField = exception.message.match(
          /invalid input syntax for type uuid: "([^"]+)"/,
        );
        console.log({ invalidField });
        message = invalidField
          ? `Invaild ID. Please provide a correctly formatted UUID and try again.`
          : 'The input format is invalid. Please check your data and try again.';
        break;

      default:
        message =
          'An unexpected error occurred. Please contact support if this issue persists.';
    }

    if (isDevelopment) {
      console.error('Database error:', exception);
    }

    const errorResponse = {
      statusCode: status,
      message,
    };

    if (isDevelopment) {
      errorResponse['details'] = {
        error: exception.name,
        code: exception.code,
        detail: exception.detail,
      };
    }

    response.status(status).json(errorResponse);
  }
}
