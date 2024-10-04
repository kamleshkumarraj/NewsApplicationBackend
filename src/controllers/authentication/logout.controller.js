import { asyncHandler } from "../../error/asyncHandler.error.js";

export const userLogout = asyncHandler(async (req , res , next) => {
    const option = {
        expires : new Date(Date.now()),
        httpOnly : true,
    }
    res.status(200).cookie('token',undefined , option).json({
        success : true,
        message : "User logged out successfully."
    })
})