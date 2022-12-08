import {
    getCasos,
    gettPruebas,
    gettPruebasFalse,
    gettPruebasTrue,
    gettPersonas,
    addCaso,
    updateCaso,
    getCaso,
    deleteCasos,
    getCasoDetalle,
    getPdescription
   
} from "../APIs/APIcasos.js";


document.addEventListener("DOMContentLoaded", ()=>{
    gettCasos();
    getPeoples();
    updateCasso();
    getPeoplesU();
})

// get para obtener todos los  casos
async function gettCasos() {
    try {
        const casos = await getCasos();
        const content = document.querySelector("#content");
        //console.log(casos);
        let html = '';
        
        casos.forEach(async(element) => {
            const { id_caso, nombre_caso, nombre} = element;
            const prueba = await gettPruebas(id_caso);
            const trues = await gettPruebasTrue(id_caso);
            const falses = await gettPruebasFalse(id_caso);
            //console.log(prueba);
            let pru = '';
        
            prueba.forEach( element => {
                const {cantidad} = element;
                //console.log(cantidad);
                pru = cantidad;
            });
            //console.log(veraci);
            let pruTrue = ''; 
            trues.forEach( element => {
                const {verdaderas} = element;
                //console.log("verdad;",verdaderas);
                pruTrue = verdaderas;
            });
            let pruFalse = ''; 
            falses.forEach( element => {
                const {falsas} = element;
                //console.log("falsas;",falsas);
                pruFalse = falsas;
            });
        
            html += `
            <tr class="tabla">
                <td>${id_caso}</td>
                <td>${nombre_caso}</td>
                <td>${nombre}</td>
                <td>${pru}</td>
                <td style="color: red;font-weight: 700;">${pruFalse}</td>
                <td style="color: green;font-weight: 800;">${pruTrue}</td>
                <td>
                <buttom href="" class="btn btn-outline-success botonesT editar" idCaso="${id_caso}" data-caso="${id_caso}" data-toggle="modal" data-target="#exampleModalA" >
                        <img src="img/system-update.png" class="imgT editar"  data-caso="${id_caso}" idCaso="${id_caso}" alt="">
                </buttom>
                    <a href="" class="btn btn-outline-danger botonesT eliminar" data-caso="${id_caso}"  idCaso="${id_caso}">
                        <img src="img/bin.png" class="imgT eliminar" data-caso="${id_caso}" idCaso="${id_caso}" alt="">
                    </a>
                    <a href="" class="btn btn-outline-info botonesT detalle" data-caso="${id_caso}"  idCaso="${id_caso}" data-toggle="modal" data-target="#exampleModalDetalleC">
                        <img src="img/loupe.png" class="imgT detalle" alt="" data-caso="${id_caso}"  idCaso="${id_caso}">
                    </a>
                </td>
            </tr>
            `;
            content.innerHTML = html;
        }); 
    } catch (error) {
        console.log(error);
    }
};

// get para personas en el registro 
async function getPeoples() {
    const people = await gettPersonas();
    const lista = document.querySelector("#listaPersonas");
    let html = '';
    people.forEach(element => {
        const { id, nombre } = element;
        html += `
        <option value="${id}">${nombre}</option>
        `,
        lista.innerHTML = html;
    });
}

// get para personas en el modal update
async function getPeoplesU() {
    const people = await gettPersonas();
    const lista = document.querySelector("#listaPersonasU");
    let html = '';
    people.forEach(element => {
        const { id, nombre } = element;
        html += `
        <option value="${id}">${nombre}</option>
        `,
        lista.innerHTML = html;
    });
}

// funcion  : agregar nuevo caso ==================
const addCasos = document.querySelector("#formCasos");
addCasos.addEventListener('submit', verificNew);

async function verificNew(e) {
    e.preventDefault();
    const nombre_caso = document.querySelector("#nombre").value;
    const id_persona = document.querySelector("#listaPersonas").value;
    const caso = {
        nombre_caso,
        id_persona
    }
    const confirma = confirm("¿ Desea ingresar este registro ?");
    if (confirma) {
        await addCaso(caso);
    };
};



// EDITAR CASOS
function updateCasso() {

    const  content = document.querySelector('#content');
    content.addEventListener('click', reloadPeople);

    async function reloadPeople(e) {
        if(e.target.classList.contains("editar")){
            const id_caso = e.target.getAttribute("idCaso");
            //console.log(id_caso);
            const caso = await getCaso(id_caso);
            //console.log(caso);
            mostrarCaso(caso);

            // registrar el formulario actualizado
            const formulario = document.querySelector("#formCasosU");
            formulario.addEventListener('submit', validarUpdateCaso);   
        }
    };
};

function mostrarCaso(caso) {
    const inputid = caso[0]["id_caso"];
    const inputname = caso[0]["nombre_caso"];
    const inputper = caso[0]["id_persona"];
    document.querySelector("#idU").value = inputid;
    document.querySelector("#nombreU").value = inputname;
    document.querySelector("#listaPersonasU").value = inputper;
}
  
async function validarUpdateCaso(e) {    
    e.preventDefault();

    const caso = { 
        id_caso : document.querySelector("#idU").value,
        nombre_caso : document.querySelector("#nombreU").value,
        id_persona : document.querySelector("#listaPersonasU").value,
    };
    const confirma = confirm("¿ Desea Actualizar este Registro ?");
    if (confirma) {
        await updateCaso(caso);
    }
}; 

// ELIMINAR CASO    
const tabla = document.querySelector("#content");
tabla.addEventListener('click', confirmDelete);

async function confirmDelete(e) {
    //console.log(e.target.classList.contains("eliminar"));
    if (e.target.classList.contains("eliminar")) {
        const id_caso = parseInt(e.target.dataset.caso);
        console.log(id_caso);
        const confirma = confirm("¿Desea eliminar este Registro?");
        if (confirma) {
            await deleteCasos(id_caso);
        }     
    }
};



// mostrar detalles de  caso
const tablaD =  document.querySelector("#content");
tablaD.addEventListener('click', lookDetail);

async function lookDetail(e) {
    console.log(e.target.classList.contains("detalle"));
    const idCaso = { 
        id : e.target.getAttribute("idCaso")
    }
    //console.log(idCaso);
    const caso = await getCasoDetalle(idCaso.id);
    //console.log(caso);
    const pruebas = await gettPruebas(idCaso.id);
    //console.log(pruebas);
    const pruebasT = await gettPruebasTrue(idCaso.id);
    //console.log(pruebasT);
    const pruebasF = await gettPruebasFalse(idCaso.id);
    //console.log(pruebasF);
    const descrip = await getPdescription(idCaso.id);
    //console.log(descrip);

    let pTotal = '';
    let pTrue = '';
    let pFalse = '';
    let veredicto = '';
    let html = '';
    let descripciones = '';
    const modalb = document.querySelector("#modaldetail");
    caso.forEach(async(element) => {
        const {  nombre_caso , nombre,  foto } = element;

        pruebas.forEach( element => {
            const { cantidad } = element;
            pTotal = cantidad;
        });

        pruebasT.forEach(element => {
            const { verdaderas }= element;
            pTrue = verdaderas;
        });
        
        pruebasF.forEach(element => {
            const { falsas } = element;
            pFalse = falsas;
        });

        descrip.forEach(element => {
            const { descripcion } = element;
            descripciones += `<li>${descripcion}</li>`
        });
        
        if (pTrue === pFalse) {
            veredicto = `<h2 class="text-warning">CASO INCONCLUSO</h2>`
        }else{
            if (pTrue > pFalse) {
                veredicto = `<h2 class="text-danger">ES CULPABLE.</h2>`
            }else{
                veredicto =`<h2 class="text-success">ES INOCENTE</h2>`
            }
        }
        html +=`
        <div class="card mb-3" style="max-width: 540px; min-width: 100%; border-radius: 10px;">
                            <div class="row no-gutters "> 
                              <div class="col-md-12">
                                <div class="card-body">
                                  <h3 class="card-title">Nombre del Caso: <strong>${nombre_caso}</strong></h3> <br>
                                  <div class="row">
                                    <div class="col col-md-4">
                                        <h5 class="card-title ">Nombre del Acusado</h5>
                                        <h6> - ${nombre} </h6>
                                        <img src="img/acusados/${foto}" style="width: 150px; border-radius: 10px;" alt="...">
                                        <p></p>
                                    </div>
                                    <div class="col col-md-6">
                                        <h5>Descripción de las Pruebas:</h5>
                                        <ul>
                                            ${descripciones}
                                        </ul>
                                    </div>  
                                  </div>
                                  <div class="row">
                                    <div class="col col-md-4">
                                        <h5 class="card-title">Total de Pruebas: ${pTotal} </h5>
                                    </div>
                                    <div class="col col-md-4">
                                        <h5 class="card-title text-info">Pruebas Verdaderas: ${pTrue}</h5>
                                    </div>
                                    <div class="col col-md-4">
                                        <h5 class="card-title text-info">Pruebas Falsas: ${pFalse}</h5>
                                    </div>
                                  </div>
                                  <br>
                                  <div class="row">
                                    <div class="col col-md-6">
                                        <h2>VEREDICTO:</h2>
                                    </div>
                                    <div class="col col-md-6">
                                        ${veredicto}
                                    </div>
                                  </div             
                                </div>
                              </div>
                            </div>
                          </div> 
        
        `;
        modalb.innerHTML = html;
    });
}