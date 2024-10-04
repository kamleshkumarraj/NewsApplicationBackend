import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";
import { apiFeatures } from "../../utils/apiFeatures.utils.js";

export const getAllNews = asyncHandler(async (req , res , next ) => {
    const apiFeature =  new apiFeatures(newsModels.find() , req.query).searchByCategory();
    const newsList = await apiFeature.query;

    if(newsList.length == 0 ) return next(new ErrorHandler("No news found !",404))
    res.status(200).json({
        success : true,
        message : "News get successfully.",
        data : newsList
    })
}) 