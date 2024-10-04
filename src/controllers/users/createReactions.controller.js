import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const createReactions = asyncHandler(async (req , res , next) => {
    const {reactionType} = req.body;
    const news = await newsModels.findById(req.params.id);
    if(!news) return next(new ErrorHandler("Invalid id news not found !",404))

    const isReacted = async () => {
        news.reactions.find((react) => react.creator === req.user.id)
    }

    if(await isReacted()){
        news.reactions.forEach((reaction) => {
            if(reaction.creator === req.user.id){
                reaction.reactionType = reactionType;
            }
        })
    }else{
        news.reactions.push({creator : req.user.id , reactionType : reactionType})
    }
    news.save({validateBeforeSave : false})
    res.status(200).json({
        success : true,
        message : "Reacted successfully ",
    })
})