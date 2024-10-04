import { asyncHandler } from "../../../error/asyncHandler.error.js"
import ErrorHandler from "../../../error/ErrorHandler.error.js";
import { newsModels } from "../../../models/newsModels.js";

export const deleteNews = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const news = await newsModels.findById(id)
    if(!news) return next(new ErrorHandler("News not found !",404))
    await newsModels.findByIdAndDelete(id)
    res.status(200).json({
        success : true,
        message : "News deleted successfully."
    })
})