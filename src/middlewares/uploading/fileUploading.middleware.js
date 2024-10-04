import multer from 'multer';
import ErrorHandler from '../../error/ErrorHandler.error.js';

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , './src/uploads')
    },
    filename : (req , file , cb) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        cb(null , filename)
    }

})

const filterFile = (req,file,cb) => {
    if(file.mimeType == 'image/jpg' || file.mimeType == 'image/jpeg' || file.mimeType == 'image/png' || file.mimeType == 'image/gif'){
        cb(null , true)
    }else{
        cb(new ErrorHandler("only jpg,png,gif,jpeg files are allowed" , 402))
    }
}

export const upload = multer({storage : storage })

