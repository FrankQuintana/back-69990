import Router from "express";
import CartManager from "../controllers/cartManager.js";

const router = Router();
const cartManager = new CartManager("./src/models/carts.json");

//crear carrito nuevo
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        console.log("Error al crear carrito", error);
        res.status(500).json({error: "Error del servidor"});
    };
});
//lista productos carros
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartProducts(cid);
        res.json(cart.products);
    } catch (error) {
        console.log("Error al obteber carrito", error);
        res.status(500).json({error: "Error del servidor"});
    };
});
//agregar productos carro
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = req.params.quantity || 1;

    try {
        const updateCar = await cartManager.uploadProduct(cid, pid, quantity);
        res.json(updateCar.products);
    } catch (error) {
        console.log("Error al agregar productos al carrito", error);
        res.status(500).json({error: "Error del servidor"});
    };
});

export default router;