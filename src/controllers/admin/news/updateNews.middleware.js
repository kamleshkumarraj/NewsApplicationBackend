import { asyncHandler } from "../../../error/asyncHandler.error.js";
import ErrorHandler from "../../../error/ErrorHandler.error.js";
import { newsModels } from "../../../models/newsModels.js";

export const updateNews = asyncHandler(async (req , res , next) => {
    const id = req.params.id;
    const news = await newsModels.findById(id);
    if(!news) return next(new ErrorHandler("No news found !",404))
    const updateNews = await newsModels.findByIdAndUpdate(id , req.body , {
        new : true,
        runValidators : true,
        useFindAndModify : true
    })
    res.status(200).json({
        success : true,
        message : "News updated successfully",
        data : updateNews
    })
})