import express from "express";
import cors from "cors";
import routesPersona from "./routes/persona.routes.js";
import routesPrueba from "./routes/prueba.routes.js";
import routerCaso from "./routes/caso.router.js";

const app = express();

app.set("port", 7000);
app.use(cors());
app.use(express.json()); 



app.use("/api/persona",routesPersona);
app.use("/api/prueba",routesPrueba);
app.use("/api/caso", routerCaso);


//app.use("/api/caso",routesPrueba);



/* app.get("/", (req,res)=>{
    res.send("Esto es la app.")
})
 */


export default app;