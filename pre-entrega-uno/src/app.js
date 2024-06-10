import express from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { 
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send('Servidor online');
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, (err)=>{
    if(err) console.log(err)
    console.log(`servidor http://localhost:${PORT} arriba`);
})