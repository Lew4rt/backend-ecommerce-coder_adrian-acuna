import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import routerProducts from './api/products.js';
import routerCarts from './api/carts.js';
import mongoose from 'mongoose';
import ProductsDAO from './dao/products.dao.js';
import MessagesDao from './dao/messages.dao.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import routerSessions from './api/sessions.js';
import initializePassport from './config/passport.config.js'
import passport from 'passport';
import logger from './logs/logger.js'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'

// Las variables de entorno las adjunto con la entrega
dotenv.config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;
const dbName = process.env.DATABASE_NAME;
const PORT = 8080;

const app = express();
app.use(express.json())

// Inicialización de servidor
const httpServer = app.listen(PORT, () =>
   logger.info(`Servidor Express escuchando en el puerto ${PORT}`)
);

// Inicialización de websockets
const io = new Server(httpServer);

// Conexión a MongoDB usando mongoose
mongoose.connect(connectionString, {dbName: dbName})

app.use(express.urlencoded({ extended: true }))

// Configuración de cookie y passport
initializePassport();
app.use(cookieParser("secret_cookie"));
app.use(passport.initialize())

// Configuración de path y Handlebars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Middleware para servir archivos estáticos
app.use(express.static(path + "/public"));

// Funciones de websockets en tiempo real (Adaptadas a mongo para la primera entrega integradora)
let messages = [];
io.on('connection', (socket) => {
   logger.info('Usuario conectado');
   // Manejar la adición de productos
   socket.on('addProduct', async (product) => {
      try {
         await ProductsDAO.add(product);
         logger.info('Producto agregado con éxito');
         // Emitir evento de actualización a todos los clientes conectados
         io.emit('updateProducts', await ProductsDAO.getAll());
      } catch (error) {
         logger.error('Error al agregar el producto:', error.message);
      }
   });
   socket.on('deleteProduct', async (productId) => {
      try {
         const success = await ProductsDAO.delete(productId);
         if (success) {
            logger.info('Producto eliminado con éxito');
            // Emitir evento de actualización a todos los clientes conectados
            const updatedProducts = await ProductsDAO.getAll()
            io.emit('updateProducts', updatedProducts);
         } else {
            logger.error('Producto no encontrado');
         }
      } catch (error) {
         logger.error('Error al eliminar el producto:', error.message);
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
      logger.info(data)
      socket.broadcast.emit('register', data)
   })

});

// Endpoint tester de logger
app.get('/loggerTest', (req, res) => {
   logger.debug('Debug message');
   logger.http('HTTP message');
   logger.info('Info message');
   logger.warning('Warning message');
   logger.error('Error message');
   logger.fatal('Fatal message');
 
   res.send('Logs generados, revisa la consola o el archivo errors.log si estás en producción');
 });

// Docs config
const swaggerOptions = {
   definition: {
      openapi: '3.0.3',
      info: {
         title: "LyJ - Backend",
         description: "|- This is an E-commerce Accessory Store Server made by Adrián Acuña for the CoderHouse Institute. <br> LyJ stands for Lewi & Junior <br> Repository: - [LyJ repository](https://github.com/Lew4rt/backend-ecommerce-coder_adrian-acuna)",
         version: "1.0.0",
         contact: {
            email: "adryxs@hotmail.com.ar"
         },
         servers: [
            {
               url: "http://localhost"
            }
         ]
      }
   },
   apis: ['./src/docs/**/*.yaml'],
}

const specs = swaggerJSDoc(swaggerOptions)

// Conexión a los respectivos routers
app.use('/', viewsRouter)
app.use("/productsApi", routerProducts)
app.use("/cart", routerCarts)
app.use("/sessions", routerSessions)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

export default app;