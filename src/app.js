import express from 'express';
import handlebars from 'express-handlebars';
import path from './utils.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import routerProducts from '../api/products.js';
import routerCarts from '../api/carts.js';
import ProductManager from './ProductManager.js';

const PORT = 8080;

const app = express();
app.use(express.json())
const httpServer = app.listen(PORT, () =>
   console.log(`Servidor Express escuchando en el puerto ${PORT}`)
);
const io = new Server(httpServer);

const productManager = ProductManager.getInstance();
productManager.loadProducts();

app.use(express.urlencoded({ extended: true }))

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path + "/views");
app.set("view engine", "handlebars");

// Middleware para servir archivos estáticos
app.use(express.static(path + "/public"));

app.use('/', viewsRouter)

io.on('connection', (socket) => {
   console.log('Usuario conectado');
   // Manejar la adición de productos
   socket.on('addProduct', (product) => {
      try {
         productManager.addProduct(product);
         console.log('Producto agregado con éxito');
         // Emitir evento de actualización a todos los clientes conectados
         io.emit('updateProducts', productManager.getProducts());
      } catch (error) {
         console.error('Error al agregar el producto:', error.message);
      }
   });
   socket.on('deleteProduct', (productId) => {
      try {
         const success = productManager.deleteProduct(productId);
         if (success) {
            console.log('Producto eliminado con éxito');
            // Emitir evento de actualización a todos los clientes conectados
            io.emit('updateProducts', productManager.getProducts());
         } else {
            console.error('Producto no encontrado');
         }
      } catch (error) {
         console.error('Error al eliminar el producto:', error.message);
      }
   });
});

app.use("/products", routerProducts)
app.use("/cart", routerCarts)
