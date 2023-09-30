import { Server } from "socket.io";
import productManager from "../services/ProductManager.js";

let io;

export function initializeSocket(server) {
    io = new Server(server);

    io.on("connection", (socket) => {
        console.log("New client connected: " + socket.id);

        socket.on("createProduct", async (data) => {
            const addProduct = await productManager.addProduct(data);

            if(addProduct) {
                const products = await productManager.getProducts();
                const product = products.find((prod) => prod.code === data.code);
                io.emit("updateList", product);
            } else {
                console.log("The entered product already exists, or the information provided is incomplete.");
            }
        })

        socket.on("deleteProduct", async (data) => {
            const productToDelete = await productManager.getProductById(parseInt(data)); 
            await productManager.deleteProduct(parseInt(data));

            io.emit('newList', productToDelete.id);
        });
    });
}

export function getIO() {
    return io;
}