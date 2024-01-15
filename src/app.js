const express = require('express');
const PORT = 8080;

const app = express();
app.use(express.json())

const routerProducts = require("../routes/products.router")
const routerCarts = require("../routes/carts.router")

app.use("/products", routerProducts)
app.use("/cart", routerCarts)

app.listen(PORT, () => {
   console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});