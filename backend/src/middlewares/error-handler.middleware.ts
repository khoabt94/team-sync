import { AppError, BadRequestException } from "@utils/app-error.util";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { StatusCodes as HttpStatusCode } from "http-status-codes";
import { ErrorCodeEnum } from "@enums/error-code.enum";
import { config } from "@config/app.config";
import { MongoServerError } from "mongodb";

function formatZodError(errors: ZodError) {
  return errors.errors.map((error) => {
    return {
      field: error.path.join("."),
      message: error.message,
    };
  });
}

function handleDuplicateFieldsDB(err: MongoServerError) {
  const sanitize = err.errmsg.match(/(["'])(\\?.)*?\1/);
  if (!sanitize) return "Something when wrong";
  const value = sanitize[0];

  return `Duplicate field value: ${value}. Please use another value!`;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    res.status(HttpStatusCode.BAD_REQUEST).send({
      message: "Validation error",
      errorCode: ErrorCodeEnum.VALIDATION_ERROR,
      errors: [
        {
          message: handleDuplicateFieldsDB(err),
        },
      ],
    });
    return next();
  }
  if (err instanceof ZodError) {
    res.status(HttpStatusCode.BAD_REQUEST).send({
      message: "Validation error",
      errorCode: ErrorCodeEnum.VALIDATION_ERROR,
      errors: formatZodError(err),
    });
    return next();
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).send({
      message: err.message,
      errorCode: err?.errorCode,
      ...(config.NODE_ENV === "development" && { stack: err.stack }),
    });
    return next();
  }

  res.status(err.statusCode ?? 500).send({
    message: "Something went wrong",
    errorCode: "Unexpected error",
    stack: err.stack,
  });
  return next();
};
