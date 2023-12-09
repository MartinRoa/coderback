import fs from "fs";

class Products {
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
                productId = parseInt(this.products[this.products.length - 1]._id) + 1;
            } else {
                productId = 1;
            }

            this.products.push({
                _id: productId.toString(),
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
        const product = this.products.find((e) => e._id === idProd);

        if(product){
            return product;
        } else {
            return false;
        }
    }

    async updateProduct(idProd, updateProduct){
        await this.loadData();
        const product = this.products.find((e) => e._id === idProd);

        if(product){
            const productIndex = this.products.findIndex((prod) => prod._id === product._id);
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
        const product = this.products.find((e) => e._id === idProd);
        console.log(product)

        if(product){
            const updateList = this.products.filter(prod => prod._id !== product._id);
            const productsString = JSON.stringify(updateList);
            await fs.promises.writeFile(this.path, productsString);
            return true;
        } else {
            return false;
        }
    }

    async showProductsList(filter, page, limit, sortOption) {
        try {
            await this.loadData();
        
            let filteredProducts = this.products.filter(product => {
                if (filter.category) {
                    product.category === filter.category;
                    }
                if (filter.status) {
                    product.status = filter.status;
                }
                return true;
            });
        
            if (sortOption.price) {
                filteredProducts = filteredProducts.sort((a, b) => {
                  const sortOrder = sortOption.price === 1 ? 1 : -1;
                  return (a.price - b.price) * sortOrder;
                });
                
              }
        
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
            return paginatedProducts;
            } catch (error) {
            throw new Error('Error reading products data: ' + error.message);
        }
    }
}

export default new Products("src/database/products.json");