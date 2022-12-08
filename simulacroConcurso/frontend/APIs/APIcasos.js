const urlC = "http://localhost:7000/api/caso";



// funcion para obtener todos los casos en la tabla de la pagina de casos
export const getCasos = async ()=>{
    try {
        const connection = await fetch(urlC);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// get para caso por id_caso
export const getCaso = async (id_caso)=>{
    try {
        const connection = await fetch(`${urlC}/upda/${id_caso}`);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// get caso para los detalles
export const getCasoDetalle = async (id_caso)=>{
    try {
        const connection = await fetch(`${urlC}/detalle/${id_caso}`);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// get para obtener las pruebas de la descripcion
export const getPdescription = async (id_caso)=>{
    try {
        const connection = await fetch(`${urlC}/pDescription/${id_caso}`);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// funcion para obtener las pruebas
export const gettPruebas = async (id_caso)=>{
    try {
        const connection = await fetch(`${urlC}/${id_caso}`);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// get para obtener pruebas positivas
export const gettPruebasTrue = async (id_caso)=>{
    try {
        const connection = await fetch(`${urlC}/verdad/${id_caso}`);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// get para obtener pruebas ngativas
export const gettPruebasFalse = async (id_caso)=>{
    try {
        const connection = await fetch(`${urlC}/falso/${id_caso}`);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// post para añadir un nuevo caso
export const addCaso = async (caso)=>{
    try {
        await fetch(urlC,{
            method : "POST",
            body : JSON.stringify(caso),
            headers: {
                "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
            },
        });
    } catch (error) {
        console.log(error);
    }
    window.location.href = "index.html";
};


// get para obtener las personass implicadas en cada caso
const urlA = "http://localhost:7000/api/persona/";
export const gettPersonas = async ()=>{
    try {
        const connection = await fetch(urlA);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};


// put para  actualizar cada caso
export const updateCaso = async (caso)=>{
    try {
        await fetch(`${urlC}/update/${caso.id_caso}`, {
            method: "PUT",
            body: JSON.stringify(caso),
            headers: {
              "Content-Type": "application/json",
            },
          });
    } catch (error) {
        console.log(error);
    };
    window.location.href = "index.html";
};


// delete para borrar un caso en espesifico 
export const deleteCasos = async (id_caso)=>{
    try {
        await fetch(`${urlC}/delete/${id_caso}`, { 
                method: "DELETE",
          });
    } catch (error) {
        console.log(error);
    };
    window.location.href = "index.html";
};


