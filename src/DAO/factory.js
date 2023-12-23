import config from '../config.js';
import { connectMongoDB, logger } from '../utils.js';

export let Carts;
export let Messages;
export let Products;
export let Users;
export let Tickets;

switch (config.persistence) {
  case 'MONGO':
    logger.info('Persistence with Mongo');
    connectMongoDB();
    const { default: CartsMongo } = await import('./mongo/carts.mongo.js');
    Carts = CartsMongo;
    const { default: MessagesMongo } = await import('./mongo/messages.mongo.js');
    Messages = MessagesMongo;
    const { default: ProductsMongo } = await import('./mongo/products.mongo.js');
    Products = ProductsMongo;
    const { default: UsersMongo } = await import('./mongo/users.mongo.js');
    Users = UsersMongo;
    const { default: TicketsMongo } = await import('./mongo/tickets.mongo.js');
    Tickets = TicketsMongo;

    break;
  case 'FILE SYSTEM':
    logger.info('Persistence with File System');
    const { default: CartsFileSystem } = await import('./fileSystem/carts.fileSystem.js');
    Carts = CartsFileSystem;
    const { default: MsgsFileSystem } = await import('./fileSystem/messages.fileSystem.js');
    Messages = MsgsFileSystem;
    const { default: ProductsFileSystem } = await import('./fileSystem/products.fileSystem.js');
    Products = ProductsFileSystem;
    const { default: UsersFileSystem } = await import('./fileSystem/users.fileSystem.js');
    Users = UsersFileSystem;
    const { default: TicketsFileSystem } = await import('./fileSystem/tickets.fileSystem.js');
    Tickets = TicketsFileSystem;

    break;
  default:
    break;
}