import multer from 'multer';
import { AppMiddlwareInterface } from "../Core/Interfaces/AppMiddleware.Interface";


export class MulterMiddleware implements AppMiddlwareInterface {
    getMiddlware() {
        const fileStorageEngine = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, './images');
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + '--' + file.originalname);
            }
        });
        const upload = multer({ storage: fileStorageEngine });
        return upload;
    }

}