import db from '../config/db.js';
import url from 'url';
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
const getlistpokemonpageandtype = (urlparams) => {
    return new Promise((resolve, reject)=>{
      //const urlparams = url.parse(req.url, true).query; 
    
      if(urlparams["page"]){
        if(urlparams["type"]){

        }
        else{

        }
      }
      else{
        if(urlparams["type"]){

        }
        else{
            const requete = `SELECT * FROM pokemon limit 25`;
            db.query(requete,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            });
        }
      }
    });

}
/*
const getlistpokemon = (page) => {
    
    return new Promise((resolve, reject)=>{
        if(page ==1){
            const requete = `SELECT * FROM pokemon LIMIT 25 `; // test sans limite
            db.query(requete,(erreur,resultat) =>{
                if(erreur){
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            }); 
        }
        else{
           let val = (page*25)-25;
        const requete = `SELECT * FROM pokemon LIMIT 25 OFFSET ?`;
        const params = [val];
        db.query(requete,params,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat);
        });
        }
        
    });
}*/

export default {
    getpokemonbyid,getlistpokemonpageandtype
}