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
const getlistpokemonpageandtype = (page,type) => {
    return new Promise((resolve, reject)=>{
        if(page ==1){
            const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 `;
            const params =[type]
            db.query(requete,params,(erreur,resultat) =>{
                if(erreur){
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            }); 
        }
        else{
           let val = (page*25)-25;
        const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET ?`;
        const params = [type,val];
        db.query(requete,params,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat);
        });
        }
        
    });

}
const getlistpokemon = (page) => {
    
    return new Promise((resolve, reject)=>{
        if(page ==1){
            const requete = `SELECT * FROM pokemon LIMIT 25 `;
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
}

export default {
    getpokemonbyid,getlistpokemonpageandtype,getlistpokemon
}