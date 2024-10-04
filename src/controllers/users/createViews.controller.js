import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const createViews = asyncHandler(async (req , res , next) => {
    const {id} = req.params
    const news = await newsModels.findById(id);
    if(!news) return next(new ErrorHandler("Invalid news id !",400))
    
    const viewsList = news.views
    //now we check user is already seen or not !

    const check = viewsList.find((view) => view.viewCreator == req.user.id)
    if(check) return next(new ErrorHandler("Already seen this news !",400))
    news.views.push({viewCreator : req.user.id})
    news.viewCount += 1;
    news.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        message : "User views news successfully !",
        data : {viewers : news.views , viewCount : news.viewCount}
    })
})


//* method for sending all viewers for a particular news 
export const getAllViews = asyncHandler(async (req , res , next) => {
    const {id} = req.params
    const news = await newsModels.findById(id)
    if(!news) return next(new ErrorHandler("Invalid news id !",401))
    
    res.status(200).json({
        success : true,
        message : "You get all viewrs successfully !",
        data : {viewers : news.views , viewCount : news.viewCount}
    })
})