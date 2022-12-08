

const urlP = "http://localhost:7000/api/prueba";

export const getEvidence = async ()=>{
    try {
        const connection = await fetch(urlP);
        const result = connection.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};


export const getPrueba = async (id_prueba)=>{
    try {
        const connection = await fetch(`${urlP}/${id_prueba}`);
        const result = connection.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getPruebaD = async (id_prueba)=>{
    try {
        const connection = await fetch(`${urlP}/buscarD/${id_prueba}`);
        const result = connection.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const addPrueba = async (prueba)=>{
    try {
        await fetch(`${urlP}/agregar/`,{
            method : "POST",
            body : JSON.stringify(prueba),
            headers: {
                "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
            },
        });
    } catch (error) {
        console.log(error);
    }
    window.location.href = "pruebas.html";
};


const urlC = "http://localhost:7000/api/caso";
// funcion para obtener todos los casos en la tabla de la pagina de casos
export const getPruebaCasos = async ()=>{
    try {
        const connection = await fetch(urlC);
        const result = connection.json();
        return result;
        //console.log(result);
    } catch (error) {
        console.log(error);
    }
};


export const getPruebasNamecaso = async (nombre_caso) => {
    try {
      const resultado = await fetch(`${urlP}/buscar/${nombre_caso}`);
      const prueba = await resultado.json();
      console.log(`entro aqui a buscar ID: ${nombre_caso}`);
      return prueba;
    } catch (error) {
      console.log(error);
    }
};

export const deletePrueba = async (id_prueba)=>{
    try {
        await fetch(`${urlP}/borrar/${id_prueba}`, { 
                method: "DELETE",
          });
    } catch (error) {
        console.log(error);
    };
    window.location.href = "pruebas.html";
};


export const updatePrueba = async (prueba)=>{
    try {
        await fetch(`${urlP}/editar/${prueba.id_prueba}`, {
            method: "PUT",
            body: JSON.stringify(prueba),
            headers: {
              "Content-Type": "application/json",
            },
          });
    } catch (error) {
        console.log(error);
    };
    window.location.href = "pruebas.html";
};
