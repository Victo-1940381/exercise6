import express from 'express';
import db from '../config/db.js';
import { trouverpokemon } from '../controller/pokemon.controller.js';
const router = express.Router();

router.get('/:id', trouverpokemon);

export default router;