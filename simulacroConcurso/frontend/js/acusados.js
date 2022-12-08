import {
    getAcusados,
    addPersona,
    updatePersona,
    getAcusado,
    buscarName,
    deletePersona
} from "../APIs/APIacusados.js";




document.addEventListener('DOMContentLoaded',()=>{
    getPeople();
    updateAcuado();
})

// obtener la lista de acusados en la tabla 
async function getPeople() {

    try {
        const people = await getAcusados();
        //console.log(people);
        const content = document.querySelector("#content"); 
        let html = '';
        people.forEach( (element) => {
            const {id,cedula, nombre, edad, sexo , foto } = element;
            html += `
            <tr class="tabla">
                <td>${cedula}</td>
                <td>${nombre}</td>
                <td>${edad} años</td>
                <td>${sexo}</td>
                <td id="accion">
                    <buttom href="" class="btn btn-outline-success botonesT editar" idAcusado="${id}" data-acusado=${id} data-toggle="modal" data-target="#exampleModalActualizar">
                        <img src="img/system-update.png" idAcusado="${id}" class="imgT editar" alt="">
                    </buttom>
                    <a href="" class="btn btn-outline-danger botonesT eliminar" data-acusado="${id}" idAcusado="${id}">
                        <img src="img/bin.png" class="imgT eliminar" alt="" data-acusado="${id}" idAcusado="${id}">
                    </a>
                    <a href="" class="btn btn-outline-info botonesT detalle" idAcusado="${id}" data-toggle="modal" data-target="#exampleModalDetalle">
                        <img src="img/loupe.png" class="imgT detalle" data-toggle="modal" idAcusado="${id}" data-target="#exampleModalDetalle" alt="">
                    </a>
                </td>
            </tr>
            `;
            content.innerHTML = html;
        });
    } catch (error) {
        
    }
}

// BUSCAR //
const search = document.querySelector("#search");
search.addEventListener("input", searchPeople);

// BUSCAR POR NOMBRE
async function searchPeople(e) {
    let searching = e.target.value;
    if (searching === "") {
       getPeople();
    } else {
        const acusado = await buscarName(searching); 
        const tabla = document.querySelector("#content");
        let html = '';
        acusado.forEach(element => {
            const { id,cedula, nombre, edad, sexo, foto} = element;
            html += `
                <tr>
                <td>${cedula}</td>
                <td>${nombre}</td>
                <td>${edad} años</td>
                <td>${sexo} </td>
                <td>
                    <buttom href="" class="btn btn-outline-success botonesT editar" idAcusado="${id}" data-acusado=${id} data-toggle="modal" data-target="#exampleModalActualizar">
                        <img src="img/system-update.png" idAcusado="${id}" class="imgT editar" alt="">
                    </buttom>
                    <a href="" class="btn btn-outline-danger botonesT eliminar" data-acusado="${id}" idAcusado="${id}">
                        <img src="img/bin.png" class="imgT eliminar" alt="" data-acusado="${id}" idAcusado="${id}">
                    </a>
                    <a id="Detalles" href="" class="btn btn-outline-info botonesT detalle" idAcusado="${id}" data-toggle="modal" data-target="#exampleModalDetalle">
                        <img src="img/loupe.png" class="imgT detalle" data-toggle="modal" data-target="#exampleModalDetalle" alt="">
                    </a>
                </td>   
                </tr>
            `;           
        });
        tabla.innerHTML = html; 
    }
};



// funcion  : agregar nuevo acusado ==================
const addAcusado = document.querySelector("#formAcusado");
addAcusado.addEventListener('submit', verificNew);
async function verificNew(e) {
    e.preventDefault();
    const cedula = document.querySelector("#cedula").value;
    const nombre = document.querySelector("#nombre").value;
    const edad = document.querySelector("#edad").value;
    const sexo = document.querySelector("#sexo").value;
    const foto = document.querySelector("#foto").value;
    const persona = {
        cedula,
        nombre,
        edad,
        sexo,
        foto
    }
    const confirma = confirm("¿ Desea ingresar este registro ?");
    if (confirma) {
        await addPersona(persona);
    };
};


// EDITAR ACUSADOS
function updateAcuado() {

    const  content = document.querySelector('#content');
    content.addEventListener('click', reloadPeople);

    async function reloadPeople(e) {
        if(e.target.classList.contains("editar")){
            const id = e.target.getAttribute("idAcusado");
            console.log(id);
            const persona = await getAcusado(id);
            console.log(persona);
            mostrarAcusado(persona);

            // registrar el formulario actualizado
            const formulario = document.querySelector("#formAcusadoU");
            formulario.addEventListener('submit', validarUpdateAcusado);  
        }
    };
};

function mostrarAcusado(persona) {
    const inputid = persona[0]["id"];
    const inputcedula = persona[0]["cedula"];
    const inputname = persona[0]["nombre"];
    const inputedad = persona[0]["edad"];
    const inputsexo = persona[0]["sexo"];
    const inputfoto = persona[0]["foto"];
    
    document.querySelector("#idU").value = inputid;
    document.querySelector("#cedulaU").value = inputcedula;
    document.querySelector("#nombreU").value = inputname;
    document.querySelector("#edadU").value = inputedad;
    document.querySelector("#sexoU").value = inputsexo;
    document.querySelector("#fotoU").value = inputfoto;
}
 
async function validarUpdateAcusado(e) {    
    e.preventDefault();

    const acusado = { 
        id : document.querySelector("#idU").value,
        cedula : document.querySelector("#cedulaU").value,
        nombre : document.querySelector("#nombreU").value,
        edad : document.querySelector("#edadU").value,
        sexo : document.querySelector("#sexoU").value,
        foto : document.querySelector("#fotoU").value,
    };
    const confirma = confirm("¿ Desea Actualizar este Registro ?");
    if (confirma) {
        await updatePersona(acusado);
    }
};

// ELIMINAR UNA ACUSADO
const tabla = document.querySelector("#content");
tabla.addEventListener('click', confirmDelete);

async function confirmDelete(e) {
    //console.log(e.target.classList.contains("eliminar"));
    if (e.target.classList.contains("eliminar")) {
        const id = parseInt(e.target.dataset.acusado);
        console.log(id);
        const confirma = confirm("¿Desea eliminar este Registro?");
        if (confirma) {
            await deletePersona(id);
        }     
    }
};


// mostrar detalles de acusado
const tablaD =  document.querySelector("#content");
tablaD.addEventListener('click', lookDetail);

async function lookDetail(e) {
    console.log(e.target.classList.contains("detalle"));
    const idAcusado = { 
        id : e.target.getAttribute("idAcusado")
    }
    //console.log(idAcusado);
    const acusado = await getAcusado(idAcusado.id);
    //console.log(acusado);
    let html = '';
    const modalData = document.querySelector("#modaldetail");
    let genero = '';
    acusado.forEach( element => {
        const { cedula, nombre, edad, sexo, foto} = element; 
        
        if (sexo === "M") {
            genero = "Masculino";
        }else{
            genero = "Femenino";
        }
        html +=`
                <div class="card mb-3" style="max-width: 540px; min-width: 100%; border-radius: 10px;">
                <div class="row no-gutters ">
                <div class="col-md-4">
                    <img src="img/acusados/${foto}" style="width: 150px; border-radius: 10px; " alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">Nombre: ${nombre}</h5>
                    <h5 class="card-title">Cedaula: ${cedula}</h5>
                    <h5 class="card-title">Edad: ${edad} años</h5>
                    <h5 class="card-title">Genero: ${genero}</h5>
                    </div>
                </div>
                </div>
            </div> 
        `;  

        modalData.innerHTML = html;
    });
}