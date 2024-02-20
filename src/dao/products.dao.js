import products from "./models/products.schema.js";

class ProductsDAO {

    static async getAll({ limit = 10, page = 1, sort, query } = {}) {
        try {
            let options = {
                page: +page,
                limit: +limit,
                sort: sort ? { price: sort === 'desc' ? -1 : 1 } : undefined,
                lean: true,
            };

            let filter = {};
            if (query) {
                filter = query;
            }

            const result = await products.paginate(filter, options);

            const response = {
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&limit=${limit}` : null,
                nextLink: result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&limit=${limit}` : null,
            };

            return response;
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
            return await products.findById(id).lean();
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