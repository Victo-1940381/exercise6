
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
            if(urlparams["page"] == 1){
                const requete = `SELECT * FROM pokemon WHERE type_primaire = ? limit 25`;
                const params = [urlparams["type"]];
            db.query(requete,params,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            });
            }
            else{
                let offset = (urlparams["page"] * 25)-25;
                let textoffset = offset.toString();
                let requetedebut = `SELECT * FROM pokemon WHERE type_primaire = ? limit 25 OFFSET `;
                let requete = requetedebut.slice(0) + textoffset;
                const params = [urlparams["type"]];
            db.query(requete,params,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            });
            }
        }
        else{
            if (urlparams["page"] == 1){
                const requete = `SELECT * FROM pokemon limit 25`;
            db.query(requete,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            });
            }
            else{
                let offset = (urlparams["page"] * 25)-25;
                let textoffset = offset.toString();
                let requetedebut = `SELECT * FROM pokemon limit 25 OFFSET `;
                let requete = requetedebut.slice(0) + textoffset;
              
            db.query(requete,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            });
            }
        }
      }
      else{
        if(urlparams["type"]){
            const requete = `SELECT * FROM pokemon WHERE type_primaire = ? limit 25`;
            const params = [urlparams["type"]];
            db.query(requete,params,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);

                    reject(erreur);
                }
                resolve(resultat);
            });
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
const getnombrepokemonlist = (urlparams) => {
    return new Promise((resolve, reject)=>{
        //const urlparams = url.parse(req.url, true).query; 
      
        if(urlparams["page"]){
          if(urlparams["type"]){
              if(urlparams["page"] == 1){
                  const requete = `SELECT * FROM pokemon WHERE type_primaire = ? `;
                  const params = [urlparams["type"]];
              db.query(requete,params,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                      reject(erreur);
                  }
                  resolve(resultat);
              });
              }
              else{
                  let offset = (urlparams["page"] * 25)-25;
                  let textoffset = offset.toString();
                  let requetedebut = `SELECT * FROM pokemon WHERE type_primaire = ? `;
                 // let requete = requetedebut.slice(0) + textoffset;
                  const params = [urlparams["type"]];
              db.query(requetedebut,params,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                      reject(erreur);
                  }
                  resolve(resultat);
              });
              }
          }
          else{
              if (urlparams["page"] == 1){
                  const requete = `SELECT * FROM pokemon`;
              db.query(requete,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                      reject(erreur);
                  }
                  resolve(resultat);
              });
              }
              else{
                  let offset = (urlparams["page"] * 25)-25;
                  let textoffset = offset.toString();
                  let requetedebut = `SELECT * FROM pokemon `;
                 // let requete = requetedebut.slice(0) + textoffset;
                
              db.query(requetedebut,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                      reject(erreur);
                  }
                  resolve(resultat);
              });
              }
          }
        }
        else{
          if(urlparams["type"]){
              const requete = `SELECT * FROM pokemon WHERE type_primaire = ? `;
              const params = [urlparams["type"]];
              db.query(requete,params,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
  
                      reject(erreur);
                  }
                  resolve(resultat);
              });
          }
          else{
              const requete = `SELECT * FROM pokemon`;
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
const ajouterpokemon = (nom,typepri,typesec,pv,attaque,defence) =>  {
    return new Promise((resolve, reject) =>{
        const requete = `INSERT INTO pokemon (nom,type_primaire,type_secondaire,pv,attaque,defense) VALUES (?,?,?,?,?,?) `;
        const params = [nom,typepri,typesec,pv,attaque,defence];
        db.query(requete,params,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat);
        });
    });
}
const modifpokemon= (id,nom,typepri,typesec,pv,attaque,defence) => {
    return new Promise((resolve, reject) =>{
        const requete = `UPDATE pokemon SET  nom = ?, type_primaire = ? , type_secondaire = ? , pv = ?, attaque = ?, defense = ? WHERE id = ?`;
        const params = [nom,typepri,typesec,pv,attaque,defence,id];
        db.query(requete,params,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat);
        });
    });
}
    export default {
    getpokemonbyid,getlistpokemonpageandtype,getnombrepokemonlist,ajouterpokemon,modifpokemon
}