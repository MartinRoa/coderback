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

    async addProduct(newProduct){
        await this.loadData();
        const product = this.products.find((e) => e.code === newProduct.code);

        if(product ===  undefined && newProduct.id ===  undefined && (newProduct.title ?? false) && (newProduct.description ?? false) && (newProduct.price ?? false) && (newProduct.code ?? false) && (newProduct.stock ?? false) && (newProduct.category ?? false) ){
            let productId;
            if(this.products.length){
                productId = this.products[this.products.length - 1].id + 1;
            } else {
                productId = 1;
            }

            this.products.push({
                id: productId,
                title: newProduct.title,
                description: newProduct.description,
                code: newProduct.code,
                price: newProduct.price,
                status: true,
                stock: newProduct.stock,
                category: newProduct.category,
                thumbnail: (newProduct.thumbnail !== "") ? newProduct.thumbnail : "Sin imagen" 
            })

            const productsString = JSON.stringify(this.products);
            await fs.promises.writeFile(this.path, productsString);
            return true;

        } else {
            return false;
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
            return false;
        }
    }

    async updateProduct(idProd, updateProduct){
        await this.loadData();
        const product = this.products.find((e) => e.id === idProd);

        if(product){
            const productIndex = this.products.findIndex((prod) => prod.id === product.id);
            this.products.splice(productIndex, 1, {...product, ...updateProduct});
            const productsString = JSON.stringify(this.products);
            await fs.promises.writeFile(this.path, productsString);
            return true;
        } else {
            return false;
        }
    }

    async deleteProduct(idProd){
        await this.loadData();
        const product = this.products.find((e) => e.id === idProd);
        console.log(product)

        if(product){
            const updateList = this.products.filter(prod => prod.id !== product.id);
            const productsString = JSON.stringify(updateList);
            await fs.promises.writeFile(this.path, productsString);
            return true;
        } else {
            return false;
        }
    }
}

export default new ProductManager("products.json");