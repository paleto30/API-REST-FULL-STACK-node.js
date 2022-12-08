

const urlA = "http://localhost:7000/api/persona/";


export const getAcusados = async ()=>{
    try {
        const connection = await fetch(urlA);
        const result = connection.json();

        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getAcusado = async (id)=>{
    try {
        const connection = await fetch(`${urlA}/${id}`);
        const result = connection.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};


export const addPersona = async (acusado)=>{
    try {
        await fetch(urlA,{
            method : "POST",
            body : JSON.stringify(acusado),
            headers: {
                "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
            },
        });
    } catch (error) {
        console.log(error);
    }
    window.location.href = "acusados.html";
};


export const updatePersona = async (acusado)=>{
    try {
        await fetch(`${urlA}/update/${acusado.id}`, {
            method: "PUT",
            body: JSON.stringify(acusado),
            headers: {
              "Content-Type": "application/json",
            },
          });
    } catch (error) {
        console.log(error);
    };
    window.location.href = "acusados.html";
};


export const buscarName = async (nombre) => {
    try {
      const resultado = await fetch(`${urlA}/buscar/${nombre}`);
      const name = await resultado.json();
      console.log(`entro aqui a buscar ID: ${nombre}`);
      return name;
    } catch (error) {
      console.log(error);
    }
  };



export const deletePersona = async (id)=>{
    try {
        await fetch(`${urlA}/${id}`, { 
                method: "DELETE",
          });
    } catch (error) {
        console.log(error);
    };
    window.location.href = "acusados.html";
};


