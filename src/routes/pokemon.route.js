import express from 'express';
import db from '../config/db_pg.js';
import { ajoutpokemon, modif, suppr, trouverpokemon,trouverpokemonlist } from '../controller/pokemon.controller.js';
const router = express.Router();
router.get('/liste', trouverpokemonlist);
router.put('/:id', modif);
router.get('/:id', trouverpokemon);
router.delete('/:id', suppr);
router.post('/', ajoutpokemon);


export default router;