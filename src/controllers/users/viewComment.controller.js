import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const viewsNews = asyncHandler(async (req , res , next) => {
    const news = await newsModels.findById(req.params.id)
    if(!news) return next(new ErrorHandler("No any news found !",404))

    news.viewCount += 1;
    news.save({validateBeforeSave : false})
    res.status(200).json({
        success : true,
        message : "News views saved successfully",
        data : news.viewCount
    })
})