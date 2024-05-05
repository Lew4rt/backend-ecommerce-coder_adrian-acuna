import express from 'express';
import ProductsDAO from '../dao/products.dao.js';
import CartsDAO from '../dao/carts.dao.js';
import UsersDAO from '../dao/users.dao.js';
import jwt from 'jsonwebtoken';

const viewsRouter = express.Router();

// Middleware para chequear autenticación utilizando jwt token
const isAuthenticated = (req, res, next) => {
    const token = req.signedCookies.jwt;

    if (!token) {
        return res.redirect("/sessions/login");
    }

    jwt.verify(token, 'secret_jwt', async (err, decoded) => {
        if (err) {
            return res.redirect("/sessions/login");
        }

        const user = await UsersDAO.getByID(decoded.id);

        if (!user) {
            return res.redirect("/sessions/login");
        }

        req.user = user;
        next();
    });
};

// --- Alerta para segunda preentrega ---
// Con el nuevo formato en el que recibimos los productos, '/' queda deprecado, en su lugar se redirije al usuario a /products, que es el endpoint que pide la consigna
viewsRouter.get('/', async (req, res) => {
    try {
        res.redirect('/products');
        // const productsData = await ProductsDAO.getAll();
        // // Renderiza la vista home.handlebars y pasa la información de productos
        // res.render('home', { products: productsData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

viewsRouter.get('/realtimeproducts', isAuthenticated, async (req, res) => {
    try {
        const productsData = await ProductsDAO.getAll();
        res.render('realTimeProducts', { products: productsData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

viewsRouter.get('/chat', isAuthenticated, async (req, res) => {
    try {
        res.render('chat', {})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// --- Segunda entrega ---

// Acá decidí implementar un middleware que convierte lo que recibo en query a objeto Json, para que pueda funcionar con el filter del método paginate.
// Para su uso, por ejemplo, podríamos buscar por params http://localhost:8080/products?query=stock=8, y traerá el/los productos con 8 de stock.
// Sinceramente no me gusta como está implementado esto, pero siguiendo la consigna no se me ocurrió una mejor manera.
const parseQueryMiddleware = (req, res, next) => {
    const { query } = req.query;

    if (query) {
        try {
            const parsedQuery = query.split('&').reduce((acc, pair) => {
                const [key, value] = pair.split('=');
                acc[key] = value;
                return acc;
            }, {});

            req.parsedQuery = parsedQuery;
        } catch (error) {
            return res.status(400).json({ error: 'Invalid query parameter format' });
        }
    }

    next();
};



viewsRouter.get('/products', isAuthenticated, parseQueryMiddleware, async (req, res) => {
    try {
        const user = req.user;
        let isAdmin = false;
        if (user.role === "admin") {
            isAdmin = true
        }
        const { limit, page, sort } = req.query;
        const query = req.parsedQuery;
        const productsData = await ProductsDAO.getAll({
            limit,
            page,
            sort,
            query: query,
        });

        res.render('products', { data: productsData, user: user, isAdmin: isAdmin })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

viewsRouter.get('/products/:productId', isAuthenticated, async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await ProductsDAO.getById(productId);

        res.render('productDetail', { product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


viewsRouter.get('/carts/:cid', isAuthenticated, async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await CartsDAO.getById(cartId);

        res.render('cart', { cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

viewsRouter.get('/sessions/register', async (req, res) => {
    try {
        res.render('register')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

viewsRouter.get('/sessions/login', async (req, res) => {
    const token = req.signedCookies.jwt;

    if (token) {
        return res.redirect("/products");
    } else {
        res.render('login');
    }
})

viewsRouter.get('/sessions/requestResetPw', async (req, res) => {
    return res.render('requestResetPw')
})

viewsRouter.get('/sessions/resetPw/:token/:iv', async (req, res) => {
    const token = req.params.token;
    const iv = req.params.iv;
    return res.render('resetPw', { token, iv })
})

export default viewsRouter;