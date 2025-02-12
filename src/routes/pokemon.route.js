import express from 'express';
import db from '../config/db.js';
const router = express.Router();

router.get('/:id', (req, res) => {
 const id = req.params.id;
 const requete = `SELECT * FROM pokemon where id = ?`;
 const params = [id]
 db.query(requete, params, (erreur,resultat) => {
    
 });
});