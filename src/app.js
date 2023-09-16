import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
});

// ENDPOINTS

const productManager = new ProductManager("products.json");

app.get("/products", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if(!limit) {
        return res.json(products);
    } else if (limit > products.length) {
        return res.json({
            error: "The entered limit is higher than the number of products."
        })
    } else {
        return res.json(products.slice(0, limit));
    }
});

app.get("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);

    if(product) {
        res.json(product);
    } else {
        res.json({
            error: "Product not exist!"
        });
    }
});

