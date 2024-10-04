import { asyncHandler } from "../../error/asyncHandler.error.js";
import { userModels } from "../../models/user.model.js";
import { sendMail } from "../../utils/sendMail.utils.js";

export const verifyEmail = asyncHandler(async (req  ,res , next) => {
    const user = await userModels.findById(req.user.id);

    const tocken = await user.generateEmailVerifyTocken();
    await user.save({validateBeforeSave : false})
    const messageUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/verification/${tocken}`
    const message = `This mail is sending for verify yourself . \n\n Your verification link is : \n\n ${messageUrl}`
    try{
        await sendMail({email : req.user.email , message , subject : "Verify yourself using email."})
        res.status(200).json({
            success : true,
            message : "Email sent successfully for verification"
        })
    }
    catch(err){
        user.verifyEmailExpiry = undefined;
        user.verifyEmailTocken = undefined;
        await user.save({validateBeforeSave : false})
        res.status(401).json({
            success : false,
            message : "Email sent failed for verification."
        })
    }
})