import  getConnection from "../database/database.js";



const getPersonas = async (req,res)=>{

    try {
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT * FROM  persona
            
        `);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getPersona = async (req,res)=>{
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT * FROM  persona 
            WHERE id=?
        `,id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getPersonaName = async (req,res)=>{
    try {
        const { nombre } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT * FROM  persona 
            WHERE nombre=?
        `,nombre);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addPersona = async (req,res) =>{
    try {
        const { id, cedula, nombre, edad , sexo, foto } = req.body;
        const persona = {id, cedula, nombre, edad , sexo, foto };
        const connection = await getConnection();
        const result = await connection.query(`
            INSERT INTO persona SET ?
        `,persona);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
};


const deletePersona = async (req,res)=>{
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            DELETE FROM persona WHERE id = ?
        `, id);
        res.json(result); 
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const updatePersona = async (req,res) =>{
    try {
        const { id } = req.params;
        const { cedula ,nombre, edad,sexo, foto } = req.body;
        const nPersona = {
            id,
            cedula,
            nombre,
            edad,
            sexo,
            foto
        } 
        console.log(nPersona);
        const connection = await getConnection();
        const result = await connection.query(`
            UPDATE persona SET cedula = ?,nombre = ?, edad = ?,sexo = ?, foto = ? WHERE id=?  
        `,[cedula,nombre,edad,sexo,foto,id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const methodHTTP = {
    getPersonas,
    getPersona,
    addPersona,
    deletePersona,
    getPersonaName,
    updatePersona
}



export default methodHTTP;