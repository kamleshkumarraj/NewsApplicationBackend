import { asyncHandler } from "../../../error/asyncHandler.error.js";
import ErrorHandler from "../../../error/ErrorHandler.error.js";

export const isAuthor = asyncHandler(async (req , res , next) => {
    if(req?.user?.userType === 'Author') return next();
    return next(new ErrorHandler("Only author can create news",401))
})