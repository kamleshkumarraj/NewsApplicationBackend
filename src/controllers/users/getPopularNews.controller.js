import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";
import { sensitiveNews } from "../../models/sensitiveNews.models.js";

export const getPopularNews = asyncHandler(async (req , res , next) => {
    //* code for getting all popular news;
    const popularNewsList = await newsModels.find({viewCount : {$gte : 500}})

    res.status(200).json({
        success : true,
        message : "All popular news get successfully !",
        data : popularNewsList
    })
})