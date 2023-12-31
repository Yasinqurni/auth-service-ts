// custom response
interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    message?: string
    error?: {
      code: number
      message: string
    }
  }
  
 
  
// custom error response
class CustomError extends Error {
    constructor(public statusCode: number, public message: string) {
      super(message)
      this.name = this.constructor.name
      Error.captureStackTrace(this, this.constructor)
    }
  }
  
  export { ApiResponse, CustomError }