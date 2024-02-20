import carts from "./models/carts.schema.js";

class CartsDAO {

    static async add() {
        try {
            const newCart = new carts({
                products: []
            });
            await newCart.save();

            const newCartId = newCart._id.toString();
            return newCartId;
        } catch (err) {
            throw new Error('Failed to add cart');
        }
    }

    // getById se ve modificado en la segunda entrega con el uso de populate.
    static async getById(id) {
        try {
            const cart = await carts.findById(id).populate('products.productId').lean().exec();
    
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

    static async deleteProduct(cartId, productId) {
        try {
            const cart = await carts.findById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }
            const existingProductIndex = cart.products.findIndex(p => p.productId.equals(productId));

            if (existingProductIndex !== -1) {
                cart.products.splice(existingProductIndex, 1);
                await cart.save();
            } else {
                throw new Error("Product not found in cart");
            }
        } catch (error) {
            console.error('Error deleting product from cart:', error);
            throw error;
        }

    }

    static async updateProducts(cartId, products) {
        try {
            const cart = await carts.findById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }
            cart.products = products;
            await cart.save();
        } catch (error) {
            console.error('Error updating cart products:', error);
            throw error;
        }
    }

    static async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await carts.findById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }

            const existingProductIndex = cart.products.findIndex(p => p.productId.equals(productId));
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity = quantity;
                await cart.save();
            } else {
                throw new Error("Product not found in cart");
            }
        } catch (error) {
            console.error('Error updating product quantity in cart:', error);
            throw error;
        }
    }

    static async deleteAllProducts(cartId) {
        try {
            const cart = await carts.findById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }
            cart.products = [];
            await cart.save();
        } catch (error) {
            console.error('Error deleting all products from cart:', error);
            throw error;
        }
    }
}

export default CartsDAO;