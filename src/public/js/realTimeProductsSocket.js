import logger from "../../logs/logger";

const socket = io();

// Manejar el formulario para agregar productos
document.getElementById('addProductForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productTitle = document.getElementById('productTitle').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCode = document.getElementById('productCode').value;
    const productStock = document.getElementById('productStock').value;

    // Emitir un evento para agregar un producto
    socket.emit('addProduct', { title: productTitle, description: productDescription, price: productPrice, code: productCode, stock: productStock });

    // Limpiar el campo después de agregar un producto
    document.getElementById('productTitle').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCode').value = '';
    document.getElementById('productStock').value = '';
});

const deleteButtonsListeners = () => {
    const deleteButtons = document.querySelectorAll('.deleteProductButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productid;
            socket.emit('deleteProduct', productId);
        });
    });
}

deleteButtonsListeners();

// Escuchar eventos para actualizar la lista de productos
socket.on('updateProducts', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product) => {
        logger.info(product)
        const listItem = document.createElement('li');
        listItem.innerHTML = `${product.title} - ${product.price} <button class="deleteProductButton" data-productid="${product._id}">Delete product</button>`;
        productList.appendChild(listItem);
    });

    deleteButtonsListeners();
});