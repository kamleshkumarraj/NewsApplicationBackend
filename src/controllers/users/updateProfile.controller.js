import { asyncHandler } from "../../error/asyncHandler.error.js";
import { userModels } from "../../models/user.model.js";

export const updateProfile = asyncHandler(async (req, res, next) => {
    const user = await userModels.findByIdAndUpdate(req.user.id ,req.body , {
        new : true,
        runValidators : true,
        useFindAndModify : false
    } )
    res.status(200).json({
        success : true,
        message : "User profile updated successfully",
        user
    })
})