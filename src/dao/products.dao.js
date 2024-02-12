import products from "./models/products.schema.js";

class ProductsDAO {

    static async getAll() {
        try {
            return await products.find().lean();
        } catch (err) {
            throw new Error('Failed to get products');
        }
    }

    static async add(product) {
        try {
            const newProduct = new products(product);
            await newProduct.save();
        } catch (err) {
            throw new Error('Failed to add product');
        }
    }

    static async getById(id) {
        try {
            return await products.findById(id);
        } catch (err) {
            throw new Error('Failed to get product by ID');
        }
    }

    static async update(id, updatedFields) {
        try {
            const result = await products.findByIdAndUpdate(id, updatedFields, { new: true });
            return result !== null;
        } catch (err) {
            throw new Error('Failed to update product');
        }
    }

    static async delete(id) {
        try {
            const result = await products.findByIdAndDelete(id);
            return result !== null;
        } catch (err) {
            throw new Error('Failed to delete product');
        }
    }
}

export default ProductsDAO;