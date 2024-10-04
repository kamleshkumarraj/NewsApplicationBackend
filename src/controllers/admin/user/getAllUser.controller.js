import { asyncHandler } from "../../../error/asyncHandler.error.js";
import ErrorHandler from "../../../error/ErrorHandler.error.js";
import { userModels } from "../../../models/user.model.js";

export const getAllUsers = asyncHandler(async (req , res , next) => {
    const allUsers = await userModels.find();
    if(allUsers.length === 0) return next(new ErrorHandler("No users found !",404))
    res.status(200).json({
        success : true,
        message : "All users fetched successfully",
        data : allUsers
    }) 
}) 