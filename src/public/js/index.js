const socket = io();

// CREATE NEW PRODUCT
const formProducts = document.getElementById("formProducts");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const inputThumbnail = document.getElementById("thumbnail");
const productsList = document.getElementById("productsList");

formProducts.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDescription.value,
        code: inputCode.value,
        price: inputPrice.value,
        stock: inputStock.value,
        category: inputCategory.value,
        thumbnail: inputThumbnail.value
    }

    socket.emit("createProduct", newProduct);

    inputTitle.value = "";
    inputDescription.value = "";
    inputCode.value = "";
    inputPrice.value = "";
    inputStock.value = "";
    inputCategory.value = "";
    inputThumbnail.value = "";
})

socket.on("updateList", (newProduct) => {
    productsList.innerHTML += `
        <ul id="${newProduct.id}" class="product__list">
            <li class="list__item">Id: ${newProduct.id}</li>
            <li class="list__item">Producto: ${newProduct.title}</li>
            <li class="list__item">Descripción: ${newProduct.description}</li>
            <li class="list__item">Código: ${newProduct.code}</li>
            <li class="list__item">Precio: ${newProduct.price}</li>
            <li class="list__item">Stock: ${newProduct.stock}</li>
            <li class="list__item">Categoría: ${newProduct.category}</li>
            <li class="list__item">Imagen: ${newProduct.thumbnail}</li>
            <button class="deleteBtn" data-product-id=${newProduct.id}>Eliminar</button>
        </ul>`
})

// DELETE PRODUCT
const deleteButtons = document.getElementsByClassName('deleteBtn');
Array.from(deleteButtons).forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        socket.emit('deleteProduct', productId);
    });
});

socket.on("newList", (idProd) => {
    const productContainer = document.getElementById(idProd);
    productContainer.remove();
})

