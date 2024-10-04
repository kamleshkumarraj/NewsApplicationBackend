import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";
import { sensitiveNews } from "../../models/sensitiveNews.models.js";

export const getRecentNews = asyncHandler(async (req , res , next) => {
    //! now we write code for getting all recent news from database.
    const news = await newsModels.find()
    const recentNews  = news.slice(news.length -20 , news.length)
    const result = recentNews.reverse()
    
    res.status(200).json({
        success : true,
        message : "Get all recent news successfully",
        data : result
    })
})