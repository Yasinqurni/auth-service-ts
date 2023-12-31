import { Request, Response, NextFunction } from 'express'
import { ApiResponse, CustomError } from '../handler/response/custom_response'

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof CustomError) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: err.statusCode,
        message: err.message,
      },
    }
    res.status(err.statusCode).json(response)
  } else {
    console.error(err) 
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: 500,
        message: 'Internal Server Error',
      },
    }
    res.status(500).json(response)
  }
}
