

// >>> Manager en desuso <<<


// import fs from 'fs/promises';

// class ProductManager {
//     constructor() {
//         this.path = './products.json';
//         this.products = [];
//         this.productIdCounter = 1;
//     }

//     async loadProducts() {
//         try {
//             const data = await fs.readFile(this.path, 'utf-8');
//             if (data) {
//                 this.products = JSON.parse(data);
//                 const lastProduct = this.products[this.products.length - 1];
//                 if (lastProduct) {
//                     this.productIdCounter = lastProduct.id + 1;
//                 }
//             }

//         } catch (err) {
//             this.products = [];
//             console.error('Error al cargar productos:', err);
//         }
//     }

//     async saveProducts() {
//         try {
//             const data = JSON.stringify(this.products, null, 2);
//             await fs.writeFile(this.path, data, 'utf-8');
//         } catch (err) {
//             console.error('Error al guardar los productos:', err);
//         }
//     }

//     addProduct(product) {
//         const { title, description, price, status = true, thumbnails = [], code, stock } = product;

//         if (!title || !description || !price || !status || !code || !stock) {
//             throw new Error("Todos los campos excepto las imágenes son obligatorios");
//         }

//         const codeExists = this.products.some((p) => p.code === code);
//         if (codeExists) {
//             throw new Error("El código del producto ya existe");
//         }

//         product.id = this.productIdCounter++;
//         this.products.push(product);
//         this.saveProducts();
//     }

//     getProducts() {
//         return this.products;
//     }

//     getProductById(id) {
//         const product = this.products.find((p) => p.id === id);
//         if (!product) {
//             throw new Error("Producto no encontrado");
//         }
//         return product;
//     }

//     updateProduct(id, updatedFields) {
//         const index = this.products.findIndex((product) => product.id === id);
//         if (index !== -1) {
//             this.products[index] = { ...this.products[index], ...updatedFields };
//             this.saveProducts();
//             return true;
//         }
//         return false;
//     }

//     deleteProduct(id) {
//         const productId = Number(id);
    
//         const index = this.products.findIndex((product) => product.id === productId);
//         if (index !== -1) {
//             this.products.splice(index, 1);
//             this.saveProducts();
//             return true;
//         }
//         return false;
//     }

//     // Implementé un singleton para utilizar el mismo ProductManager en diferentes archivos

//     static instance;

//     static getInstance() {
//         if (!ProductManager.instance) {
//             ProductManager.instance = new ProductManager();
//         }
//         return ProductManager.instance;
//     }
// }

// export default ProductManager;
