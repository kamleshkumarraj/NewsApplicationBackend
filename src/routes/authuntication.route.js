import { Router } from "express";
import { userRegister } from "../controllers/authentication/register.controller.js";
import { avatarUploads } from "../middlewares/authentication/avataUpload.middleware.js";
import { userLogin } from "../controllers/authentication/login.controller.js";
import { userLogout } from "../controllers/authentication/logout.controller.js";
import { forgotPassword } from "../controllers/authentication/forgotPassword.controller.js";
import { resetPassword } from "../controllers/authentication/resetPassword.controller.js";
import { updatePassword } from "../controllers/authentication/updatePassword.controller.js";
import { verifyEmail } from "../controllers/authentication/verifyEmail.controller.js";
import { googleAuth } from "../controllers/authentication/googleAuthentication.controller.js";
import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.middleware.js";
import { directLogin } from "../controllers/authentication/directlogin.controller.js";

export const authenticationRouter = Router();

authenticationRouter.route('/register').post(avatarUploads,userRegister)
authenticationRouter.route('/login').post(userLogin)
authenticationRouter.route('/logout').post(userLogout)
authenticationRouter.route('/forgot-password').post(forgotPassword)
authenticationRouter.route('/reser-password/:tocken').post(resetPassword)
authenticationRouter.route('/update-password').post(updatePassword)
authenticationRouter.route('/verify-email').post(verifyEmail)
authenticationRouter.route('/login-google').get(googleAuth)
authenticationRouter.route('/direct-login').get(isLoggedIn , directLogin)