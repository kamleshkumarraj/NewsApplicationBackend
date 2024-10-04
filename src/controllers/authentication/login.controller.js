import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { userModels } from "../../models/user.model.js";
import { generateJWTAndLogin } from "../../utils/generateJWTAndLogin.utils.js";

export const userLogin = asyncHandler(async (req , res , next) => {
    const {password , email} = req.body;

    // first we check user is registered or not .
    let user = await userModels.findOne({email}).select('+password')
    if(!user) {
       user = await userModels.findOne({username : email}).select('+password')
    }
    if(!user) return next(new ErrorHandler("Invalid email/username or password !",402));

    // if user is exists then we compare the password.
    if(!(await user.comparePassword(password))) return next(new ErrorHandler("Invalid email/username or password !",402))

    generateJWTAndLogin(res , user)



})