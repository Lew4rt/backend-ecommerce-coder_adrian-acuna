import fs from 'fs/promises';

const cartFilePath = './cart.json';

class CartManager {
    constructor() {
        this.path = './cart.json';
        this.carts = [];
        this.cartIdCounter = 1;
    }

    async loadCartData() {
        try {
            const data = await fs.readFile(cartFilePath, 'utf-8');
            if (data) {
                this.carts = JSON.parse(data);
                const lastCart = this.carts[this.carts.length - 1];
                if (lastCart) {
                    this.cartIdCounter = lastCart.id + 1;
                }
            }
        } catch (error) {
            this.carts = [];
            console.error('Error al cargar carritos:', error);
        }
    }

    async saveCartData() {
        try {
            const data = JSON.stringify(this.carts, null, 2);
            await fs.writeFile(cartFilePath, data, 'utf-8');
        } catch (error) {
            console.error('Error guardando datos del carrito:', error);
        }
    }

    addCart() {
        const cart = {
            id: this.cartIdCounter++,
            products: [],
        }

        this.carts.push(cart);
        this.saveCartData();
    }

    getCartById(id) {
        const cart = this.carts.find((c) => c.id === id)
        if(!cart){
            throw new Error("Carrito no encontrado");
        }
        return cart
    }

    addProductToCart(cartId, productId, quantity) {
        const cart = this.carts.find((c) => c.id === cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
    
        const existingProduct = cart.products.find((p) => p.product === productId);
    
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        this.saveCartData();
    }
}

export default CartManager;
