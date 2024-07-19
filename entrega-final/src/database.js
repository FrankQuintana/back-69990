import mongoose from "mongoose";

mongoose.connect("")
    .then( () => console.log("Base de datos conectada con exito!"))
    .catch( () => console.log("Hubo un error", error))