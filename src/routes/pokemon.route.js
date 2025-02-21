import express from 'express';
import db from '../config/db.js';
import { ajoutpokemon, modif, trouverpokemon,trouverpokemonlist } from '../controller/pokemon.controller.js';
const router = express.Router();
router.get('/liste', trouverpokemonlist);
router.put('/:id', modif);
router.get('/:id', trouverpokemon);

router.post('/', ajoutpokemon);


export default router;