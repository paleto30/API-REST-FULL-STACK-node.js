
import{
    getEvidence,
    getPruebaCasos,
    getPrueba,
    addPrueba,
    getPruebasNamecaso,
    deletePrueba,
    updatePrueba,
    getPruebaD

} from "../APIs/APIpruebas.js";



document.addEventListener('DOMContentLoaded',()=>{
    
    getPruebas();
    getCasos();
    getCasosU();
    updatePruebas();
});

// OBTENER LOS CASOS EN EL SELECT ADD
async function getCasos() {
    try {
        const casos = await getPruebaCasos();
        const select = document.querySelector("#caso"); // select en html 
        let html = '';
        casos.forEach((element) => {
            const { id_caso, nombre_caso } = element;      
            html +=`
                <option value="${id_caso}">${id_caso}) ${nombre_caso}</option> 
            `;
            select.innerHTML = html;
        });   
    } catch (error) {
        console.log(error);
    }
};

// OBTENER LOS CASOS EN EL SELECT UPDATE
async function getCasosU() {
    try {
        const casos = await getPruebaCasos();
        const select = document.querySelector("#casoU"); // select en html 
        let html = '';
        casos.forEach((element) => {
            const { id_caso, nombre_caso } = element;      
            html +=`
                <option value="${id_caso}">${id_caso}) ${nombre_caso}</option> 
            `;
            select.innerHTML = html;
        });   
    } catch (error) {
        console.log(error);
    }
};

// OBTENER LA LISTA DE PRUEBAS
async function getPruebas() {
    try {
        const evidence = await getEvidence();
        //console.log(evidence);
        const content =  document.querySelector("#content");
        let html = '';
        let veraz = '';
        evidence.forEach( element => {
            const { id_prueba, descripcion, veracidad, nombre_caso} = element;
            if (veracidad === 1) {
                 veraz = 'verdadera';
            }else{
                veraz = 'Falsa';
            }
            html +=`
            <tr class="tabla">
                <td>${id_prueba}</td>
                <td>${descripcion}</td>
                <td>${veraz}</td>
                <td>${nombre_caso}</td>
                <td>
                    <a href="" class="btn btn-outline-success botonesT editar" data-prueba=${id_prueba} idPrueba="${id_prueba}" data-toggle="modal" data-target="#exampleModalPrU">
                        <img src="img/system-update.png" class="imgT editar" data-prueba=${id_prueba} alt="" idPrueba="${id_prueba}" >
                    </a>
                    <a href="" class="btn btn-outline-danger botonesT eliminar" idPrueba="${id_prueba}">
                        <img src="img/bin.png" class="imgT eliminar" alt="" data-prueba=${id_prueba}>
                    </a>
                    <a href="" class="btn btn-outline-info botonesT detalle" data-prueba=${id_prueba} idPrueba="${id_prueba}" data-toggle="modal" data-target="#exampleModalDetalle">
                        <img src="img/loupe.png" class="imgT detalle" alt="" idPrueba="${id_prueba}">
                    </a>
                </td>
            </tr>
            `,
            content.innerHTML = html;
        });
    } catch (error) {
        console.log("el error es",error);        
    }
};


// AGREGAR NUEVA PRUEBA
const addprueba = document.querySelector("#formNew");
addprueba.addEventListener('submit', verificNew);
async function verificNew(e) {
    e.preventDefault();
    const descripcion = document.querySelector("#descripcion").value;
    const imagen = document.querySelector("#img").value;
    const veracidad = document.querySelector("#veracidad").value;
    const id_caso = document.querySelector("#caso").value;
    const prueba = {
        descripcion,
        imagen,
        veracidad,
        id_caso
    }
    const confirma = confirm("¿ Desea ingresar este registro ?");
    if (confirma) {
        await addPrueba(prueba);
    };
};


// BUSCAR //
const search = document.querySelector("#search");
search.addEventListener("input", searchPruebas);
// BUSCAR POR NOMBRE DE CASO
async function searchPruebas(e) {
    let searching = e.target.value;

    if (searching === "") {
        getPruebas();
    } else {
        const prueba = await getPruebasNamecaso(searching); 
        const tabla = document.querySelector("#content");
        let html = '';
        let veraz = '';
        prueba.forEach( element => {
            const {  id_prueba, descripcion, veracidad, nombre_caso} = element;
            if (veracidad === 1) {
                veraz = 'verdadera';
            }else{
                veraz = 'Falsa';
            }
            html += `
            <tr class="tabla">
            <td>${id_prueba}</td>
            <td>${descripcion}</td>
            <td>${veraz}</td>
            <td>${nombre_caso}</td>
            <td>
            <a href="" class="btn btn-outline-success botonesT editar" data-prueba=${id_prueba} idPrueba="${id_prueba}" data-toggle="modal" data-target="#exampleModalPrU">
                <img src="img/system-update.png" class="imgT editar" data-prueba=${id_prueba} alt="" idPrueba="${id_prueba}">
            </a>
            <a href="" class="btn btn-outline-danger botonesT eliminar" idPrueba="${id_prueba}" data-prueba=${id_prueba}>
                <img src="img/bin.png" class="imgT eliminar" alt="" data-prueba=${id_prueba}>
            </a>
            <a href="" class="btn btn-outline-info botonesT detalle" data-prueba=${id_prueba} idPrueba="${id_prueba}" data-toggle="modal" data-target="#exampleModalDetalle">
                <img src="img/loupe.png" class="imgT detalle" alt="">
            </a>
        </td>
            </td>
        </tr>
            `;           
        });
        tabla.innerHTML = html; 
    }
};


// ELIMINAR UNA PRUEBAS
const tabla = document.querySelector("#content");
tabla.addEventListener('click', confirmDelete);

async function confirmDelete(e) {
    //console.log(e.target.classList.contains("eliminar"));
    if (e.target.classList.contains("eliminar")) {
        const id_prueba = parseInt(e.target.dataset.prueba);
        console.log(id_prueba);
        const confirma = confirm("¿Desea eliminar este Registro?");
        if (confirma) {
            await deletePrueba(id_prueba);
        }     
    }
};


// EDITAR PRUEBAS
function updatePruebas() {

    const  content = document.querySelector('#content');
    content.addEventListener('click', reloadPrueba);

    async function reloadPrueba(e) {
        if(e.target.classList.contains("editar")){
            const id_prueba = e.target.getAttribute("idPrueba");
            console.log(id_prueba);
            const prueba = await getPrueba(id_prueba);
            console.log(prueba);
            mostrarAcusado(prueba); 

            // registrar el formulario actualizado
             const formulario = document.querySelector("#exampleModalPrU");
            formulario.addEventListener('submit', validarUpdatePrueba);   
        }
    };
};


function mostrarAcusado(prueba) {
    const inputid = prueba[0]["id_prueba"];
    const inputdes = prueba[0]["descripcion"];
    const inputimg = prueba[0]["imagen"];
    const inputver = prueba[0]["veracidad"];
    const inputcaso = prueba[0]["id_caso"];   
    document.querySelector("#idU").value = inputid;
    document.querySelector("#descripcionU").value = inputdes;
    document.querySelector("#imgU").value = inputimg;
    document.querySelector("#veracidadU").value = inputver;
    document.querySelector("#casoU").value = inputcaso;

}
 
async function validarUpdatePrueba(e) {    
    e.preventDefault();
    const prueba = { 
        id_prueba : document.querySelector("#idU").value,
        descripcion : document.querySelector("#descripcionU").value,
        imagen : document.querySelector("#imgU").value,
        veracidad : document.querySelector("#veracidadU").value,
        id_caso : document.querySelector("#casoU").value,
    };
    const confirma = confirm("¿ Desea Actualizar este Registro ?");
    if (confirma) {
        await updatePrueba(prueba);
    }
};
    

// mostrar detalles de Pruebas
const tablaD =  document.querySelector("#content");
tablaD.addEventListener('click', lookDetail);

async function lookDetail(e) {
    console.log(e.target.classList.contains("detalle"));
    const idPrueba = { 
        id_prueba : e.target.getAttribute("idPrueba")
    }
    console.log(idPrueba);
    
    const prueba = await getPruebaD(idPrueba.id_prueba);
    console.log(prueba);
    let html = '';
    const modalData = document.querySelector("#modaldetail");
    let estado = '';
    let data = '';
    prueba.forEach( element => {
        const { descripcion, imagen, veracidad, nombre_caso} = element; 
        
        if (veracidad === 1 ) {
            estado = "Verdadera";
            data = `<h6 class="text-success"> - ${estado}</h6>`
        }else{
            estado = "Falsa";
            data = `<h6 class="text-danger"> - ${estado}</h6>`
        }
        html +=`
            <div class="card mb-3" style="max-width: 540px; min-width: 100%; border-radius: 10px;">
            <div class="row no-gutters ">
            <div class="col-md-4">
                <img src="img/pruebas/${imagen}" style="width: 250px; border-radius: 10px;" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">Descripcion de prueba:</h5>
                <p> - ${descripcion}</p>
                <h5 class="card-title">CASO:</h5>
                <h6> - ${nombre_caso}</h6>                                 
                <h5 class="card-title">VERACIDAD:</h5>
                ${data}
                </div>
            </div>
            </div>
        </div>  
        `;  
        modalData.innerHTML = html;
    }); 
}