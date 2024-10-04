class ErrorHandler extends Error{
    constructor(message , status){
        super();
        this.message = message;
        this.status = status;

        Error.captureStackTrace(this , this.constructor)
    }
}

export default ErrorHandler;