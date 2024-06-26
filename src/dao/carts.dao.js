import mongoose from "mongoose";
import logger from "../logs/logger.js";
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

    static async getById(id) {
        try {
            const cart = await carts.findById(id).populate('products.productId').lean().exec();
    
            if (!cart) {
                throw new Error("Cart not found");
            }
    
            return cart;
        } catch (err) {
            throw new Error('Failed to get cart by ID');
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
            logger.error('Error adding product to cart:', error);
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
            logger.error('Error deleting product from cart:', error);
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
            logger.error('Error updating cart products:', error);
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
            logger.error('Error updating product quantity in cart:', error);
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
            logger.error('Error deleting all products from cart:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await carts.findByIdAndDelete(id);
            return result !== null;
        } catch (err) {
            throw new Error('Failed to delete cart');
        }
    }
}

export default CartsDAO;