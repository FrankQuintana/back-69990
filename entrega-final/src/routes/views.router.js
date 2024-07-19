import { Router } from "express";
import ProductManager from "../controllers/productManager.js";
//import ProductManager from "../dao/db/product-manager-db.js";
//import CartManager from "../dao/db/cart-manager-db.js";

const router = Router();
const productManager = new ProductManager("./src/models/products.json");



router.get('/realtimeproducts', async (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        console.error("Error al mostrar los productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.get("/productos", async (req, res) => {
    const { page = 1, limit = 10, sort = 'asc' } = req.query;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { price: sort === 'asc' ? 1 : -1 }
    };

    try {
        const products = await productManager.getProducts({}, options);
        res.render("home", { productos: products.docs, ...products });
    } catch (error) {
        console.error("Error al mostrar los productos", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/carts/:cid", async (req, res) => {
    const cartID = req.params.cid;

    try {
        const cart = await cartManager.getCarritoById(cartID);

        if (!cart) {
            console.log("No existe el carrito");
            return res.status(404).json({error: "Carrito no encontrado"});
        }

        const productsInCart = cart.products.map(item => ({
            product: item.product.toObject(),
            quantity: item.quantity
        }));

        res.render("carts", {productos: productsInCart});
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});

export default router;