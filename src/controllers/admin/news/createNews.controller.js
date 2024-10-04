
import { asyncHandler } from "../../../error/asyncHandler.error.js";
import ErrorHandler from "../../../error/ErrorHandler.error.js";
import { newsModels } from "../../../models/newsModels.js";
import { sensitiveNews } from "../../../models/sensitiveNews.models.js";
import { fileUploadOnCloudinary } from "../../../utils/cloudinary.config.js";

export const cerateNews = asyncHandler(async (req , res , next) => {
    const {title , content , summary , category } = req.body;

    const newsData = {title , content , summary , category , id : req.user.id}
    let image;
  
    const response = await fileUploadOnCloudinary(req.file.path)
   
    if(response == null) return next(new ErrorHandler("Image upload failed ",400))
    req.body.image = response.secure_url;
    
    const news = await newsModels.create(req.body)
    
    if(!news) return next(new ErrorHandler("News creation failed !",402))
    res.status(200).json({
        success : true,
        message : "News created successfully",
        data : news
    })
})