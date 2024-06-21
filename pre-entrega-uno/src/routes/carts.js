import  Router  from "express"
//import  ProductManager  from "../ProductManager.js"
import  CartManager  from "../cartManager.js"

const router = Router()
//const productManager = new ProductManager
const cartManager = new CartManager;

//crear carro
router.post('/', async (req, res) => {
    try {
        await cartManager.createCart()
        res.send({mensaje: "carrito creado"})
    } catch (error) {
        console.error("Error al crear carrito", error);
        res.status(500).json({ error: "Error del servidor" });
    }
    
})
//lista de productos en determinado carro
router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cartProducts = await cartManager.getCartProducts(cid);
        res.json(cartProducts.products)
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
    /*try {
        let arrPC = []
        const cartProducts = await cartManager.getCartProducts(cid)
    
        await cartProducts.forEach(async (element) => {
            try {
                let product = await productManager.getProductById(element.id)

                product.quantity = element.quantity
                arrPC = [...arrPC, product]

                if(cartProducts.length == arrPC.length) {
                    res.status(200).json(arrPC);
                }
            } catch (error) {
                console.log(error)
            }
        })
    } catch (error) {
        console.log(error)
    }*/
    
})
//agregar productos a otros carros
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params

    try {
        await cartManager.uploadProduct(cid, pid)
        res.send({mensaje: "producto agregado al carrito"})
    } catch (error) {
        console.log(error)
    }
})

export default router;