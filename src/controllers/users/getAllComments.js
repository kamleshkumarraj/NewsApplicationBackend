import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const getAllComments = asyncHandler(async (req , res , next) => {
    const {id} = req.params 
    const news = await newsModels.findById(id);
    if(!news) return next(new ErrorHandler("Invalid news id !",404))
    res.status(200).json({
        success : true,
        message : "You get all comments successfully",
        data : news.comment
    })
})