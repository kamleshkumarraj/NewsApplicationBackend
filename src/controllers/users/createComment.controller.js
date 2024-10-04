import { asyncHandler } from "../../error/asyncHandler.error.js";
import ErrorHandler from "../../error/ErrorHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const createComment = asyncHandler(async (req , res , next) => {
    const {comment}  = req.body;
   
    
    const commentData = {content : [comment] , creator : {name : req.user.username , image : req.user.avatar.url}}
 
    
    const news = await newsModels.findById(req.params.id);
    if(!news) return next(new ErrorHandler("Invalid id no any news found !",404))
        
    const alreadyCommented = async () => {
        return await news.comment.find((coment) => coment.creator.name === req.user.username)
    }
   
    if(await alreadyCommented()){
        
        news.comment.forEach((coment) => {
            if(coment.creator.name == req.user.username)  {
                
                    coment.content.unshift(comment)
                    news.commentCount += 1;
                }
        })
    }else{
       
        news.comment.unshift(commentData)
        news.commentCount += 1;
    }
    
    

    await news.save({validateBeforeSave : false})
    res.status(200).json({
        success : true,
        message : "Comment added successfully",
        data : news.comment
    })

    

})