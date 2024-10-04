// Code for handling asynchronous error using Promise.

export const asyncHandler = (method) => (req , res , next) =>{
    Promise.resolve(method(req , res , next))
    .catch(next)
}