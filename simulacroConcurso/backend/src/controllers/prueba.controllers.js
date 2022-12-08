import getConnection from "../database/database.js";



const getEvidence = async (req,res)=>{

    try {
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT id_prueba, descripcion,imagen,veracidad, nombre_caso
            FROM pruebas
            INNER JOIN caso
            ON pruebas.id_caso = caso.id_caso 
        `   );
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getPrueba = async (req,res)=>{
    try {
        const { id_prueba } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT * FROM  pruebas 
            WHERE id_prueba=?
        `,id_prueba);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getPruebaD = async (req,res)=>{
    try {
        const { id_prueba } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT * FROM pruebas,caso 
        WHERE pruebas.id_caso = caso.id_caso 
        AND pruebas.id_prueba = ?;
        `,id_prueba);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addPrueba = async (req,res) =>{
    try {
        const { id_prueba, descripcion,imagen,veracidad,id_caso } = req.body;
        const prueba = {id_prueba, descripcion,imagen,veracidad,id_caso };
        const connection = await getConnection();
        const result = await connection.query(`
            INSERT INTO pruebas SET ?
        `,prueba);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
};

const deletePrueba = async (req,res)=>{
    try {
        const { id_prueba } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            DELETE FROM pruebas WHERE id_prueba = ?
        `, id_prueba);
        res.json(result); 
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updatePrueba = async (req,res) =>{
    try {
        const { id_prueba } = req.params;
        const { descripcion,imagen,veracidad,id_caso  } = req.body;
        const prueba = {
            id_prueba,
            descripcion,
            imagen,
            veracidad,
            id_caso
        } 
        console.log(prueba);
        const connection = await getConnection();
        const result = await connection.query(`
            UPDATE pruebas SET descripcion = ?,imagen = ?, veracidad = ?, id_caso = ? WHERE id_prueba=?  
        `,[descripcion,imagen,veracidad,id_caso,id_prueba]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getPruebaNameCaso = async (req,res)=>{
    try {
        const { nombre_caso } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT id_prueba, descripcion,imagen,veracidad, nombre_caso
            FROM pruebas
            INNER JOIN caso
            ON pruebas.id_caso = caso.id_caso 
            WHERE nombre_caso =?
        `,nombre_caso);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
 
const methodHTTP={
    getEvidence,
    getPrueba,
    addPrueba,
    deletePrueba,
    updatePrueba,
    getPruebaNameCaso,
    getPruebaD
}




export default methodHTTP;