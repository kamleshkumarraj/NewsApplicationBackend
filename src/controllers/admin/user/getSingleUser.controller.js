import { asyncHandler } from "../../../error/asyncHandler.error.js";
import ErrorHandler from "../../../error/ErrorHandler.error.js";
import { userModels } from "../../../models/user.model.js";

export const getSingleUser = asyncHandler(async (req , res , next) => {
    const id = req.params.id;
    const user = await userModels.findById(id);
    if(!user) return next(new ErrorHandler("User not found", 404))

    res.status(200).json({
        success : true,
        message : "User get successfully.",
        data : user
    })
})