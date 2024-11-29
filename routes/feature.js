import express from 'express';
import { addFeature, deleteFeature, getFeatures, getFeautreById, updateFeature } from '../controllers/featureModule/feature.controller.js';
import { io } from '../server.js';
import socketHandler from '../socketHandler/socketHandler.js';

socketHandler(io);

const router=express.Router()

router.post("/addFeature",addFeature)
router.get("/getFeatures",getFeatures)
router.get("/getFeautreById/:featureId",getFeautreById)
router.put("/updateFeature/:featureId",updateFeature)
router.delete("/deleteFeature/:featureId",deleteFeature)


export default router;