import db from '../config/db.js';
const getpokemonbyid = (id) => {
    return new Promise((resolve, reject)=>{
        const requete = `SELECT * FROM pokemon WHERE id= ?`;
        const params = [id]
        db.query(requete,params, (erreur,resultat) => {
            if(erreur) {
                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat);
        });
    });
};

export default {
    getpokemonbyid
}