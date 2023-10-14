// __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// MULTER CONFIGURATION
import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname+"/public/img");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    } 
});

export const uploader = multer({storage});

// MONGODB CONNECTION
import { connect } from 'mongoose';

export async function connectMongoDB() {
  try {
    await connect(
      'mongodb+srv://matimontecalvo:9ViQcpiHOo24Iqpq@codercluster.yg3bbnd.mongodb.net/ecommerce?retryWrites=true&w=majority'
    );
    console.log('Plug to mongo!');
  } catch (e) {
    console.log(e);
    throw 'Cannot connect to the db.';
  }
}