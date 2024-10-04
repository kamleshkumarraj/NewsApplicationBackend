import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { userModels } from "../../models/user.model.js";
import cloudinary from "cloudinary"
import fs from 'fs'


export const userRegister = asyncHandler(async (req , res , next) => {
    
    const {firstname , middlename , lastname , username , password , email } = req.body;

    //! now we check that user is already registered or not by email.
    const existsUser = await userModels.findOne({email})
    if(existsUser) return next(new ErrorHandler("User already registered!" , 402))

    //! check user exists or not by username.
    const exists = await userModels.findOne({username})
    if(exists) return next(new ErrorHandler("Username must be unique!" , 402))
    
    //! now we upload profile image on cloudinary.
    const avatar = {public_id : '' , url : ''}
    try{
        const response = await cloudinary.uploader.upload(req.file.path)
        avatar.public_id = response.public_id
        avatar.url = response.secure_url
        fs.unlink(req.file.path , (err) => {
            if(err) return next(new ErrorHandler("file uploaded failed.",402))
        })
        
    }
    catch(err){
        fs.unlink(req.file.path , (err) => {
            if(err) return next(new ErrorHandler("file uploaded failed.",402))
        })
        return next(new ErrorHandler("file upload failed ",402))
    }

    const user = {firstname , middlename, lastname, username, password , avatar , email}
    await userModels.create(user)

    res.status(200).json({
        success : true,
        message : "User registered successfully"
    })
})