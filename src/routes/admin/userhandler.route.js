import { Router } from "express";
import { getAllUsers } from "../../controllers/admin/user/getAllUser.controller.js";

export const userHandleByAdminRoute = Router();

userHandleByAdminRoute.route('/all-users').get(getAllUsers)