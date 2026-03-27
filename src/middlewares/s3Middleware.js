import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../services/s3Service.js";

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",
        key: function (req,file,cb) {
            cb(null, `destinations/${Date.now()}-${file.originalname}`);
        },
    }),
});

export default upload;