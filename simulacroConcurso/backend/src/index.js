import app from "./app.js";


const main = ()=>{
    app.listen(app.set("port"));
    console.log(`EL SERVIDOR ESTA CORRIENDO EN EL PUERTO ${app.set("port")}`);
    console.log("La ruta del servidor es: http://localhost:7000/");
}


main()