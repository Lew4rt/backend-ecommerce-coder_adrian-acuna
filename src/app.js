import express from 'express';
import handlebars from 'express-handlebars';
import path from './utils.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import routerProducts from './api/products.js';
import routerCarts from './api/carts.js';
// import ProductManager from './dao/ProductManager.js';
import mongoose from 'mongoose';
import ProductsDAO from './dao/products.dao.js';
import MessagesDao from './dao/messages.dao.js';
import dotenv from 'dotenv';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import routerSessions from './api/sessions.js';
import initializePassport from './config/passport.config.js'
import passport from 'passport';

// Uso una librería para importar datos de un archivo .env y así evitar problemas de seguridad al ser público el repositorio
// Las variables de entorno las adjunto con la entrega
dotenv.config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;
const PORT = 8080;

const app = express();
app.use(express.json())

// Inicialización de servidor
const httpServer = app.listen(PORT, () =>
   console.log(`Servidor Express escuchando en el puerto ${PORT}`)
);

// Inicialización de websockets
const io = new Server(httpServer);

// Conexión a MongoDB usando mongoose
mongoose.connect(connectionString)

// Instancio ProductManager (Esta clase utiliza filesystem, no utiliza mongo, así que no tiene caso mantenerlo, lo dejo comentado porque la entrega pide que no lo borremos)
// const productManager = ProductManager.getInstance();
// productManager.loadProducts();

app.use(express.urlencoded({ extended: true }))

// Configuración de cookie, session y passport
initializePassport();
app.use(cookieParser());
app.use(session({
   store: MongoStore.create({
      mongoUrl: connectionString,
      ttl: 3600,
   }),
   secret: 'secretCode',
   resave: true,
   saveUninitialized: true
}));
app.use(passport.initialize())

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path + "/views");
app.set("view engine", "handlebars");

// Middleware para servir archivos estáticos
app.use(express.static(path + "/public"));

// Funciones de websockets en tiempo real (Adaptadas a mongo para la primera entrega integradora)
let messages = [];
io.on('connection', (socket) => {
   console.log('Usuario conectado');
   // Manejar la adición de productos
   socket.on('addProduct', async (product) => {
      try {
         await ProductsDAO.add(product);
         console.log('Producto agregado con éxito');
         // Emitir evento de actualización a todos los clientes conectados
         io.emit('updateProducts', await ProductsDAO.getAll());
      } catch (error) {
         console.error('Error al agregar el producto:', error.message);
      }
   });
   socket.on('deleteProduct', async (productId) => {
      try {
         const success = await ProductsDAO.delete(productId);
         if (success) {
            console.log('Producto eliminado con éxito');
            // Emitir evento de actualización a todos los clientes conectados
            const updatedProducts = await ProductsDAO.getAll()
            io.emit('updateProducts', updatedProducts);
         } else {
            console.error('Producto no encontrado');
         }
      } catch (error) {
         console.error('Error al eliminar el producto:', error.message);
      }
   });
   socket.on('message', data => {
      messages.push(data)
      // Función que guarda el mensaje en mongoDB
      MessagesDao.saveMessageToDatabase(data.user, data.message);
      io.emit('messageLogs', messages)
   })
   socket.on('login', data => {
      socket.emit('messageLogs', messages)
      console.log(data)
      socket.broadcast.emit('register', data)
   })

});

// Conexión a los respectivos routers
app.use('/', viewsRouter)
// En la segunda preentrega nos piden que en el router de views exista un /products, lo cual pisa al actual routerProducts.
// Para solucionar esto, cambio la ruta de acceso de products a productsApi, pero me gustaría tener una devolución al respecto de como debería hacerlo.
app.use("/productsApi", routerProducts)
app.use("/cart", routerCarts)
app.use("/sessions", routerSessions)