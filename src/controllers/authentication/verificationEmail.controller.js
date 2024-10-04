import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { userModels } from "../../models/user.model.js";

export const verificationEmail = asyncHandler(async (req , res , next) => {
    const tocken = req.params.tocken
    const verifyEmailTocken = crypto.createHash('sha256').update(tocken).digest('hex')
    const user = await userModels.findOne({verifyEmailTocken , verifyEmailExpiry : {$gt : Date.now()}})

    if(!user) return next(new ErrorHandler("verification link is expired or invalid !",402))
    
    user.verifyEmailExpiry = undefined
    user.verifyEmailTocken = undefined
    user.isEmailVerified = true;
    await user.save({validateBeforeSave  :false})
    
    res.status(200).json({
        success : true,
        message : "User verified successfully"
    })
})