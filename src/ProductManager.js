const fs = require('fs')

class ProductManager {
    constructor() {
        this.path = './products.json';
        this.products = [];
        this.productIdCounter = 1;
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            if (data) {
                this.products = JSON.parse(data);
                // Encontrar el último ID para continuar con la autoincrementación
                const lastProduct = this.products[this.products.length - 1];
                if (lastProduct) {
                    this.productIdCounter = lastProduct.id + 1;
                }
            }

        } catch (err) {
            // Si hay un error al leer el archivo, se asume que aún no hay productos
            this.products = [];
            console.error('Error al cargar productos:', err);
        }
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data, 'utf-8');
        } catch (err) {
            console.error('Error al guardar los productos:', err);
        }
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }

        const codeExists = this.products.some((p) => p.code === code);
        if (codeExists) {
            throw new Error("El código del producto ya existe");
        }

        product.id = this.productIdCounter++;
        this.products.push(product);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }
}

module.exports = ProductManager;
