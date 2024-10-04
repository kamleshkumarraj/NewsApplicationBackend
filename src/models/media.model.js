import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    artilcleId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "articleModels",
        required : true,
    },
    mediaType : {
        type : String,
        enum : ['image', 'video', 'audio'],
    },
    url : {
        type : String,
        required : true
    },
    caption : {
        type : String,
    }
},{timestamps : true})

export const mediaModels = mongoose.model('mediaModel' , mediaSchema)