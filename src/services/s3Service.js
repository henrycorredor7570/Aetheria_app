import AWS from "aws-sdk";
/**
 * Crea la conexión a AWS S3 con las credenciales
 */
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export default s3;