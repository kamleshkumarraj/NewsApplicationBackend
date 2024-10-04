import { asyncHandler } from "../../error/asyncHandler.error.js";
import { userModels } from "../../models/user.model.js";

export const updatePassword = asyncHandler(async (req , res , next) => {
    const {oldPassword , newPassword , confirmNewPassword} = req.body;
    if(!oldPassword || !newPassword || !confirmNewPassword) return next(new ErrorHandler("please enter all fields !",402))
    if(newPassword != confirmNewPassword) return next(new ErrorHandler("password and confirm password do not match !",403))
    //now we write code for comparing the passowrd;
    const user = await userModels.findById(req.user.id).select("+password");

    if(! (await user.comparePassword(oldPassword))) return next(new ErrorHandler("Old password is incorrect !",403))

    user.password = newPassword;
    await user.save({validateBeforeSave : false})
    res.status(200).json({
        success : true,
        message : "Password updated successfully"
    })
})