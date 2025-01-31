import { ErrorCodeEnum, ErrorCodeEnumType } from '@enums/error-code.enum';
import { StatusCodes as HttpStatusCode } from 'http-status-codes';

export class AppError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode: ErrorCodeEnumType;

  constructor(message: string, statusCode: HttpStatusCode, errorCode?: ErrorCodeEnumType) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode ?? ErrorCodeEnum.INTERNAL_SERVER_ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message: string, errorCode?: ErrorCodeEnumType) {
    super(message, HttpStatusCode.UNAUTHORIZED, errorCode ?? ErrorCodeEnum.ACCESS_UNAUTHORIZED);
  }
}

export class NotFoundException extends AppError {
  constructor(message: string, errorCode?: ErrorCodeEnumType) {
    super(message, HttpStatusCode.NOT_FOUND, errorCode ?? ErrorCodeEnum.NOT_FOUND);
  }
}

export class BadRequestException extends AppError {
  constructor(message: string, errorCode?: ErrorCodeEnumType) {
    super(message, HttpStatusCode.BAD_REQUEST, errorCode ?? ErrorCodeEnum.BAD_REQUEST);
  }
}

export class ForbiddenException extends AppError {
  constructor(message: string, errorCode?: ErrorCodeEnumType) {
    super(message, HttpStatusCode.FORBIDDEN, errorCode ?? ErrorCodeEnum.ACCESS_UNAUTHORIZED);
  }
}
