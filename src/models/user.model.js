import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import { type } from "os";

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required  :[true , "please enter firstname"],
        minlength : [3 , "firstname must be at least 3 characters"]
    },
    middlename : {
        type : String,
    },
    lastname : {
        type : String,
    },
    username : {
        type  :String,
        required : [true , "please enter username"],
        unique : [true , "username must be unique"],
        minlength : [3 , "username must be at least 3 characters"]
    },
    email : {
        type: String,
        required: true,
        unique: [true,"email must be unique"],
        match: /^\S+@\S+\.\S+$/,
        lowercase: true, 
        
    },
    password : {
        type : String,
        select : false
    },
    avatar : {
        public_id : {
            type : String,
            required : ['true' , "please enter public_id"],
            
        },
        url : {
            type : String,
            required : ['true' , "please enter url"],
           
        }
    },
    roles : {
        type : String,
        default : 'user'
    },
    userType :{
        type : String,
        enum : ['Reader' , 'Author'],
        default : 'Reader',
        
    },
    resetPasswordTocken : String,
    resetPasswordExpiry : Date,
    verifyEmailTocken : String,
    verifyEmailExpiry : Date,
    
    isEmailVerified : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

//method for hashing the password before save in database using bcrypt library.
userSchema.pre('save' , async function(next) {
    //means that password when modified then only it will be hashed
    if(!this.isModified('password')) return next()
    
    this.password = await bcrypt.hash(this.password , 15);
})

//! method for comparing hashed password for login the user.
userSchema.methods.comparePassword = async function(password){
    const res = await bcrypt.compare(password , this.password)
    return res
}

//! generate the jwt tocken for login the user.
userSchema.methods.generateJWTTocken = async function(){
    const tocken = jwt.sign({id : this.id} , process.env.JWT_SECRET , {
        expiresIn : Date.now() +  process.env.TOCKEN_EXPIRY*60*60*1000
    })
    return tocken;
}

//! now we create function for generating resetpassword tocken and expiry.
userSchema.methods.generateResetPasswordTocken = async function(){
    const resetTocken = crypto.randomBytes(20).toString('hex')
    const hashResetTocken = crypto.createHash('sha256').update(resetTocken).digest('hex');

    this.resetPasswordTocken = hashResetTocken;
    this.resetPasswordExpiry = Date.now() + 15*60*1000;

    return resetTocken
}

//! now we create function for generating verify email tocken and expiry.
userSchema.methods.generateEmailVerifyTocken = async function(){
    const resetTocken = crypto.randomBytes(20).toString('hex')
    const hashResetTocken = crypto.createHash('sha256').update(resetTocken).digest('hex');

    this.verifyEmailTocken = hashResetTocken;
    this.verifyEmailExpiry = Date.now() + 15*60*1000;

    return resetTocken
}



export const userModels = mongoose.model('User' , userSchema)