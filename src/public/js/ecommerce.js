import { logger } from "../../utils";

const addToCart = (button) => {
    const cartId = button.getAttribute('data-cart');
    const productId = button.getAttribute('data-id');

    fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((data) => {
        logger.info(`Producto con el id: ${productId} se agregó al cart con id: ${cartId}`);
    })
    .catch((err) => {
        logger.error(err);
    });
};

const deleteToCart = (button) => {
    const cartId = button.getAttribute('data-cart');
    const productId = button.getAttribute('data-id');

    fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((data) => {
        logger.info(`Producto con el id: ${productId} se eliminó del cart con id: ${cartId}`);
        window.location.reload();
    })
    .catch((err) => {
        logger.error(err);
    });
};

const emptyCart = (cartId) => {
    fetch(`/api/carts/${cartId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((data) => {
        logger.info(`Se vació el cart con id: ${cartId}`);
        window.location.reload();
    })
    .catch((err) => {
        logger.error(err);
    });
};