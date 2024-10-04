import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { userModels } from "../../models/user.model.js";
import { sendMail } from "../../utils/sendMail.utils.js";

export const forgotPassword = asyncHandler(async (req , res , next) => {
    const {email} = req.body;
    const user = await userModels.findOne({email})

    if(!user) return next(new ErrorHandler("User doesn't exists or Invalid email",400));

    const resetPasswordToken = await user.generateResetPasswordTocken();
    await user.save({validateBeforeSave : true})

    //! code for getting fronted hostname and port.
    const origin = req.get('origin')
    const referer = req.get('referer')
   

    // const url = new URL(origin)

    const hostname = 'localhost';
    const port = 3000
    const protocol = 'http'
   
    //! now we create link for sending email with reset password token
    const link = `${protocol}://${hostname}:${port}/api/v1/auth/reset-password/${resetPasswordToken}`

    const message = `Welcome in my New application /n You can reset your password by clicking on the link below : /n ${link}`

    // send email to user with reset password link
    try{
        await sendMail({message , email , subject : "Reset password link kfor news aplication."})

        res.status(200).json({
            success : true,
            message : "Forgot password link sent successfully on your mail."
        })

    }
    catch(err){
        user.resetPasswordExpiry = undefined
        user.resetPasswordTocken = undefined
        await user.save({validateBeforeSave : false})
        return next(new ErrorHandler("Mail sending failed please try again !",402))
    }
})