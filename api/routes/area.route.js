import express from 'express';
import { createArea, updateArea, getArea, getAllAreas } from '../controllers/area.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',  createArea);
router.post('/update/:id', updateArea);
router.get('/get/:id', getArea);
router.get('/get', getAllAreas);

export default router;
