import fs from "fs";

class ProductManager {
    constructor(path){
        this.path = path;
        this.products = [];
    }

    async loadData() {
        if(fs.existsSync(this.path)){
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        await this.loadData();
        const product = this.products.find((e) => e.code === code)

        if(product ===  undefined && (title ?? false) && (description ?? false) && (price ?? false) && (thumbnail ?? false) && (code ?? false) && (stock ?? false)){
            let productId;
            if(this.products.length){
                productId = this.products[this.products.length - 1].id + 1;
            } else {
                productId = 1;
            }

            this.products.push({
                id: productId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock 
            })

            const productsString = JSON.stringify(this.products);
            await fs.promises.writeFile(this.path, productsString);

        } else {
            return "The entered product already exists, or the information provided is incomplete.";
        }
    }
    
    async getProducts(){
        await this.loadData();
        return this.products;
    }

    async getProductById(idProd){
        await this.loadData();
        const product = this.products.find((e) => e.id === idProd);

        if(product){
            return product;
        } else {
            return null;
        }
    }

    async updateProduct(idProd, updateProduct){
        await this.loadData();
        const product = this.products.find((e) => e.id === idProd);

        if(product){
            const productIndex = this.products.findIndex((prod) => prod.id === product.id);
            this.products.splice(productIndex, 1, {...product, ...updateProduct});
            const productsString = JSON.stringify(products);
            await fs.promises.writeFile(this.path, productsString);
        } else {
            return "Product not found";
        }
    }

    async deleteProduct(idProd){
        await this.loadData();
        const product = this.products.find((e) => e.id === idProd);

        if(product){
            const updateList = this.products.filter(prod => prod.id !== product.id);
            const productsString = JSON.stringify(updateList);
            await fs.promises.writeFile(this.path, productsString);
        } else {
            return "Product not found";
        }
    }
}

export default ProductManager;