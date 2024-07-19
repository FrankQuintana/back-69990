import Router from "express";
import ProductManager from "../controllers/productManager.js";
//import ProductManager from "../dao/db/produc

const router = Router();
const productManager = new ProductManager("./src/models/products.json");

//listar productos
router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const filter = {};

        // Construir el filtro basado en la query
        if (query) {
            const queryObject = JSON.parse(query);
            Object.assign(filter, queryObject);
        }

        // Construir el orden basado en el sort
        const sortOption = sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: sortOption
        };

        const result = await productManager.getProducts(filter, options);

        const response = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.hasPrevPage ? result.prevPage : null,
            nextPage: result.hasNextPage ? result.nextPage : null,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null
        };

        res.json(response);
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: "error",
            error: "Error interno del servidor"
        });
    };
});
// router.get("/", async (req, res)=>{
//     try {
//         const limit = req.query.limit;
//         const products = await productManager.getProducts();
//         if (limit) {
//             res.json(products.slice(0, limit));
//         } else {
//             res.json(products);
//         };
//     } catch (error) {
//         console.log("Error al obtetener productos", error);
//         res.status(500).json({error: "Error del servidor"});
//     };
// });

//traer producto por id
router.get("/:pid", async (req, res)=>{
    const pid = req.params.pid;
    try {
        const product = await productManager.getProductsById(parseInt(pid));
        if (!product) {
            return res.json({error: "Producto no encontrado"});
        };
        res.json(product)
    } catch (error) {
        console.log("Error al obtetener productos", error);
        res.status(500).json({error: "Error del servidor"});
    };
});
//agregar nuevo producto
router.post("/",async (req, res)=>{
    const newProduct = req.body;
    try {
        await productManager.addProduct(newProduct);
        res.status(201).json({messaje: "Producto agregado exitosamente"});
    } catch (error) {
        console.log("Error al agregar productos", error);
        res.status(500).json({error: "Error del servidor"});
    };
});
//actualizar por id
router.put("/:pid",async (req, res)=>{
    const pid = req.params.pid;
    const productUpdate = req.body;
    try {
        await productManager.updateProduct(parseInt(pid), productUpdate);
        res.json({messaje: "Producto actualizado exitosamente"});
    } catch (error) {
        console.log("Error al actualizar productos", error);
        res.status(500).json({error: "Error del servidor"});
    };
});
//eliminar producto
router.delete("/:pid",async (req, res)=>{
    const pid = req.params.pid;
    try {
        await productManager.deleteProduct(parseInt(pid));
        res.send({messaje: "producto eliminado exitosamente"});
    } catch (error) {
        console.log("Error al eliminar productos", error);
        res.status(500).json({error: "Error del servidor"});
    };
});

export default router;