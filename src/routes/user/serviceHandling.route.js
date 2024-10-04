import { Router } from "express";
import { getAllNews } from "../../controllers/users/getAllNews.controller.js";
import { getAllcategories } from "../../controllers/users/getAllCategories.controller.js";
import { getRecentNews } from "../../controllers/users/getRecentNews.controller.js";
import { getPopularNews } from "../../controllers/users/getPopularNews.controller.js";
import { isLoggedIn } from "../../middlewares/authentication/isLoggedIn.middleware.js";
import { createComment } from "../../controllers/users/createComment.controller.js";
import { createLike } from "../../controllers/users/createLike.controller.js";
import { getAllLikedNews } from "../../controllers/users/getAllLikedNews.controller.js";
import { dislikeNews } from "../../controllers/users/dislikeNews.controller.js";
import { getAllComments } from "../../controllers/users/getAllComments.js";
import { createViews, getAllViews } from "../../controllers/users/createViews.controller.js";

export const userServiceHandlerRoute = Router();

userServiceHandlerRoute.route('/get-all').get(getAllNews)
userServiceHandlerRoute.route('/get-categories').get(getAllcategories)
userServiceHandlerRoute.route('/recent-news').get(getRecentNews)
userServiceHandlerRoute.route('/popular-news').get(getPopularNews)
userServiceHandlerRoute.route('/create-comment/:id').post(isLoggedIn , createComment)
userServiceHandlerRoute.route('/get-liked-news/:id').get(getAllLikedNews)
userServiceHandlerRoute.route('/liked-news/:id').put(isLoggedIn , createLike)
userServiceHandlerRoute.route('/dislike-news/:id').delete(isLoggedIn , dislikeNews)
userServiceHandlerRoute.route('/get-comments/:id').get(getAllComments)
userServiceHandlerRoute.route('/views-news/:id').get(isLoggedIn , createViews)
userServiceHandlerRoute.route('/get-all-viewers/:id').get(getAllViews)