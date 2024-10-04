import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authenticationRouter } from './routes/authuntication.route.js';
import { newsHandleByAdminRoute } from './routes/admin/newHandlingRoute.route.js';
import { userHandleByAdminRoute } from './routes/admin/userhandler.route.js';
import { userServiceHandlerRoute } from './routes/user/serviceHandling.route.js';

//code for initializing the express server.
export const app = express();

//use middleware for accept json data and url data also.
app.use(express.json({limit : '2000mb'}));
app.use(express.urlencoded({extended : true, limit : '100kb'}));

//use middleware for parsing cookies
app.use(cookieParser())

//use middleware for allow fronted url and request method with cookies
app.use(cors({
    origin: ['http://localhost:5173' , 'https://news-application-fronted.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}))

//now we configure routing for authentication
app.use('/api/v1/auth/',authenticationRouter)

//now we configure routing for handling new by admin.
app.use('/api/v1/news/admin/',newsHandleByAdminRoute)

// now we configure routing for handling user by admin.
app.use('/api/v1/admin/',userHandleByAdminRoute)

// news handle for common use.
app.use('/api/v1/news/' , userServiceHandlerRoute)



//use middleware for handling errors
app.use((err , req , res , next) => {
    err.message = err.message || 'Interval Server Error !'
    err.statusCode = err.statusCode || 500

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
})