import Router from "express";
import pruebaController from "../controllers/prueba.controllers.js";


const router = Router();



router.get("/",pruebaController.getEvidence);
router.get("/buscar/:nombre_caso",pruebaController.getPruebaNameCaso);
router.get("/buscarD/:id_prueba", pruebaController.getPruebaD);
router.get("/:id_prueba",pruebaController.getPrueba);
router.post("/agregar/",pruebaController.addPrueba);
router.delete("/borrar/:id_prueba",pruebaController.deletePrueba);
router.put("/editar/:id_prueba",pruebaController.updatePrueba);



export default router;