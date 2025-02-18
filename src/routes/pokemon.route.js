import express from 'express';
import db from '../config/db.js';
import { trouverpokemon,trouverpokemonlist } from '../controller/pokemon.controller.js';
const router = express.Router();
router.get('/liste', trouverpokemonlist);
router.get('/:id', trouverpokemon);


export default router;