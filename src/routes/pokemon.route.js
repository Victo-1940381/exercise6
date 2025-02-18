import express from 'express';
import db from '../config/db.js';
import { trouverpokemon,trouverpokemonlist } from '../controller/pokemon.controller.js';
const router = express.Router();

//router.get('/:id', trouverpokemon);
router.get('/liste', trouverpokemonlist);

export default router;