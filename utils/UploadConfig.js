import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public'),
    filename: (req, file, cb) => {
        const lastDotIndex = file.originalname.lastIndexOf('.');
        const extension = file.originalname.substring(lastDotIndex);
        cb(null, Date.now() + extension);
    }
})

const upload = multer({ storage });

export default upload;