import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const getAllLikedNews = asyncHandler(async (req , res , next) => {
    const newsId = req.params.id
    const News = await newsModels.findById(newsId);
    if(!News) return next(new ErrorHandler("Invalid news id !",400))

    res.status(200).json({
        success : true,
        message : "You get all liked for this id successfully",
        data : News.reactions 
    })
})