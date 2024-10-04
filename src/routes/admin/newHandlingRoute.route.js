import { Router } from "express";
import { isLoggedIn } from "../../middlewares/authentication/isLoggedIn.middleware.js";
import { isAuthor } from "../../middlewares/admin/news/isCreatedNews.middleware.js";
import { cerateNews } from "../../controllers/admin/news/createNews.controller.js";
import { upload } from "../../middlewares/uploading/fileUploading.middleware.js";

export const newsHandleByAdminRoute = Router();

newsHandleByAdminRoute.route('/uploads-news').post(isLoggedIn , isAuthor , upload.single('newsImg') , cerateNews)