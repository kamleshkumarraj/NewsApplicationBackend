import { asyncHandler } from "../../error/asyncHandler.error.js";
import { newsModels } from "../../models/newsModels.js";

export const getAllcategories = asyncHandler(async (req , res , next) => {
    const newsList = await newsModels.find();
    const categoryList = [];
    newsList.forEach((news) => {
        let flag = true;
        categoryList.forEach((category) => {
            if(category == news.category) {
                flag = false;
                return
            }
        })
        if(flag) categoryList.push(news.category)
    })

    res.status(200).json({
        success : true,
        message : "All categories fetched successfully.",
        data : categoryList
    })
})