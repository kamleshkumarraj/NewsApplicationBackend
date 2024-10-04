import { asyncHandler } from "../../error/asyncHandler.error.js";
import { userModels } from "../../models/user.model.js";
import { generateJWTAndLogin } from "../../utils/generateJWTAndLogin.utils.js";
import { googleAuthProvider } from "../../utils/googleAuth2Login.js";
import axios from 'axios'


export const googleAuth = asyncHandler(async (req , res , next) => {
    const {code} = req.query

    try{
    const googleRes = await googleAuthProvider().getToken(code);
    googleAuthProvider().setCredentials(googleRes.tokens)

    const user = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

    const {name , email , picture} = user.data;

    const userExist = await userModels.findOne({email})
    if(userExist){
        generateJWTAndLogin(res,userExist)
    }else{
        const user = await userModels.create({firstname : name , email , avatar :{url : picture , public_id : 'google authenticated'}, username : email , } )
        generateJWTAndLogin(res,user)
    }
    }catch(err){
        res.json({
            success : false,
            message : err.stack,
        })
    }

})