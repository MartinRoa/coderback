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
      process.env.MONGODB_URL
    );
    console.log('Plug to mongo!');
  } catch (e) {
    console.log(e);
    throw 'Cannot connect to the db.';
  }
}

// BCRYPT
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

// CODE GENERATOR
export function codeGenerator(array) {
  let newCode;
  if(array.length){
      newCode = parseInt(array[array.length - 1].code) + 1;
  } else {
      newCode = 1;
  }
  return newCode;
}

// MOCKING PRODUCT GENERATOR
import { faker } from "@faker-js/faker";

faker.local = "es";

const newMockingProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.alphanumeric(8),
    price: faker.commerce.price(),
    status: faker.datatype.boolean(),
    stock: faker.number.int(100),
    category: faker.commerce.department(),
    thumbnail: faker.image.url(),
  };
};

export const generateMockingProducts = (qty) => {
  const products = [];
    
  for (let i = 0; i < qty; i++) {
    products.push(newMockingProduct());
  }

  return products;
};