import { asyncHandler } from "../../../error/asyncHandler.error.js";
import ErrorHandler from "../../../error/ErrorHandler.error";
import { userModels } from "../../../models/user.model.js";

export const deleteUser = asyncHandler(async (req , res , next) =>{
    const id = req.params.id;
    const user = await userModels.findById(id);
    if(!user) return next(new ErrorHandler("No user found !",404))
    await userModels.findByIdAndDelete(id)
    res.status(200).json({
        success : true,
        message : "User deleted successfully !"
    })
})