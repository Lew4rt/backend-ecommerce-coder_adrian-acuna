import carts from "./models/carts.schema.js";

class CartsDAO {

    static async add() {
        try {
            const newCart = new carts({
                products: []
            });
            await newCart.save();
        } catch (err) {
            throw new Error('Failed to add cart');
        }
    }

    static async getById(id) {
        try {
            const cart = await carts.findById(id);
            if (!cart) {
                throw new Error("Cart not found");
            }
            return cart;
        } catch (err) {
            throw new Error('Failed to get product by ID');
        }
    }

    static async addProduct(cartId, productId, quantity) {
        try {
            const cart = await carts.findById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }
    
            const existingProductIndex = cart.products.findIndex(p => p.productId.equals(productId));
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            await cart.save();
        }
        catch (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
    }
}

export default CartsDAO;