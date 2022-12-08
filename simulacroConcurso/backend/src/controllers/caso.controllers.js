import getConnection from "../database/database.js";



const getCasos = async (req,res)=>{

    try {
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT id_caso, nombre_caso , nombre
            FROM caso  
            INNER JOIN persona ON caso.id_persona = persona.id
            ORDER BY id_caso  
        `);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getCasoDetail = async (req,res)=>{
    try {
        const { id_caso } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT id_caso, nombre_caso , nombre, id_persona ,foto
        FROM caso  
        INNER JOIN persona ON caso.id_persona = persona.id
        WHERE id_caso =?
        ORDER BY id_caso 
        `,id_caso);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getPdescription = async (req,res)=>{
    try {
        const { id_caso } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT descripcion from pruebas,caso 
        WHERE pruebas.id_caso = caso.id_caso 
        AND caso.id_caso =?
        `,id_caso);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getPruebas = async(req,res)=>{
    try {
        const { id_caso } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT COUNT(id_prueba) as cantidad FROM pruebas, caso
            WHERE pruebas.id_caso = caso.id_caso
            AND caso.id_caso = ?;
        `,id_caso);
        res.json(result);
    } catch (error) {

    }
};

const getPruebasTrue = async (req,res)=>{
    try {
        const {id_caso } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT COUNT(id_prueba) as verdaderas FROM pruebas, caso
            WHERE pruebas.id_caso = caso.id_caso
            AND caso.id_caso = ?
            AND pruebas.veracidad = 1;
        `,id_caso);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getPruebasFalse = async (req,res)=>{
    try {
        const {id_caso } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT COUNT(id_prueba) as falsas FROM pruebas, caso
            WHERE pruebas.id_caso = caso.id_caso
            AND caso.id_caso = ?
            AND pruebas.veracidad = 0;
        `,id_caso);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getCasoId = async (req,res)=>{
    try {
        const { id_caso } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT * FROM  caso 
            WHERE id_caso=?
        `,id_caso);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addCaso = async (req,res) =>{
    try {
        const { id_caso,nombre_caso, id_persona } = req.body;
        const caso = { id_caso,nombre_caso, id_persona };
        const connection = await getConnection();
        const result = await connection.query(`
            INSERT INTO caso SET ?
        `,caso);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
};

const deleteCaso = async (req,res)=>{
    try {
        const { id_caso } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            DELETE FROM caso WHERE id_Caso = ?
        `, id_caso);
        res.json(result); 
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const updateCaso = async (req,res) =>{
    try {
        const { id_caso } = req.params;
        const { nombre_caso, id_persona } = req.body;
        const caso = {
            id_caso,
            nombre_caso,
            id_persona
        } 
        console.log(caso);
        const connection = await getConnection();
        const result = await connection.query(`
            UPDATE caso SET nombre_caso = ?, id_persona = ? WHERE id_caso=?  
        `,[nombre_caso,id_persona,id_caso]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const methodHTTP={
    getCasos,
    getPruebas,
    getPruebasTrue,
    getPruebas,
    getPruebasFalse,
    getCasoId,
    addCaso,
    deleteCaso,
    updateCaso,
    getCasoDetail,
    getPdescription
};



export default methodHTTP;