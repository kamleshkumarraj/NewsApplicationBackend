import { asyncHandler } from "../../error/asyncHandler.error.js";

export const isAdmin = asyncHandler(async (req , res , next) => {
    const roles = req.user?.roles;
    if(roles == 'admin') next();
    else return next(new ErrorHandler("Only admin can access this resource.",403));
})