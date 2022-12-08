import Router from "express";
import casoController from "../controllers/caso.controllers.js";



const router = Router();


router.get("/", casoController.getCasos);
router.get("/:id_caso",casoController.getPruebas);
router.get("/verdad/:id_caso",casoController.getPruebasTrue);
router.get("/falso/:id_caso",casoController.getPruebasFalse);
router.get("/upda/:id_caso",casoController.getCasoId);
router.post("/",casoController.addCaso);
router.put("/update/:id_caso",casoController.updateCaso);
router.delete("/delete/:id_caso",casoController.deleteCaso);
router.get("/detalle/:id_caso",casoController.getCasoDetail);
router.get("/pDescription/:id_caso",casoController.getPdescription);




export default router;