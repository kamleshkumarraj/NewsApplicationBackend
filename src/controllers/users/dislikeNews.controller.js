import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const dislikeNews = asyncHandler(async (req , res , next) => {
    const {id} = req.params 
    const news = await newsModels.findById(id)
    if(!news) return next(new ErrorHandler("Invalid news id !"))

    const dislikableNews = news.reactions.findIndex((reaction) => reaction.creator == req.user.id)
    news.reactions.splice(dislikableNews , 1)
    await news.save({validateBeforeSave : false})
    res.json({
        success : true,
        message : "News disliked successfully !",
        data : news.reactions
    })


    
})