import Router from 'express';
import personaControllers from "../controllers/persona.controllers.js";



const  router = Router();

// get all people
router.get("/", personaControllers.getPersonas);
router.post("/", personaControllers.addPersona);
router.delete("/:id",personaControllers.deletePersona);
router.get("/:id", personaControllers.getPersona);
router.get("/buscar/:nombre",personaControllers.getPersonaName);
router.put("/update/:id",personaControllers.updatePersona);



export default router;


