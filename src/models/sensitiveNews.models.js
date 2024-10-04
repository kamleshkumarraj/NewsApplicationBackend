import mongoose from "mongoose";

const sensitiveNewsSchema = new mongoose.Schema({
    popularNews : {
        type : []
    },
    recentNews : {
        type : []
    }
})

export const sensitiveNews = mongoose.model('sensitiveNews' , sensitiveNewsSchema)