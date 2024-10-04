import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const createLike = asyncHandler(async (req , res , next) => {
    const newsID = req.params.id 
    const likedNews = await newsModels.findById(newsID)
    if(!likedNews) return next(new ErrorHandler("Invalid news id !",402))
    
    likedNews.reactions.push({creator : req.user.id , reactionType : "like"})

    likedNews.likeCount = likedNews.reactions.length;

    likedNews.save({validateBeforeSave : false});

    res.status(200).json({
        success : true,
        message : "News liked successfully !",
        data : likedNews.reactions
    })

})