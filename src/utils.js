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
    logger.info('Plug to mongo!');
  } catch (e) {
    logger.fatal(e);
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
import { faker } from '@faker-js/faker';

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

// LOGGER CONFIG
import winston from 'winston';
import config from "./config.js";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'bold underline red',
    error: "red",
    warning: "yellow",
    info: "green",
    http: "cyan",
    debug: "blue",
  },
};

winston.addColors(customLevels.colors);

export let logger;

switch (config.environment) {
  case 'DEVELOPMENT':
    const loggerDev = winston.createLogger({
      levels: customLevels.levels,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()),
      
      transports: [
        new winston.transports.Console({
          level: "debug",
          format: winston.format.combine(winston.format.colorize({ all: true })),
        }),
        new winston.transports.File({
          filename: "src/database/errors.log",
          level: "error",
        }),
      ]
    });
    logger = loggerDev;

    break;
  case 'PRODUCTION':
    const loggerProd = winston.createLogger({
      levels: customLevels.levels,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()),
      
      transports: [
        new winston.transports.Console({
          level: "info",
          format: winston.format.combine(winston.format.colorize({ all: true })),
        }),
        new winston.transports.File({
          filename: "src/database/errors.log",
          level: "error",
        }),
      ]
    });
    logger = loggerProd;

    break;
  default:
    break;
}
