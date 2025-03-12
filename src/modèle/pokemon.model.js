
import { console } from 'inspector';
import db from '../config/db_pg.js';
import url from 'url';
import { resolve } from 'path';
const getpokemonbyid = (id) => {
    return new Promise((resolve, reject)=>{
        const requete = `SELECT * FROM pokemon WHERE id= $1`;
        const params = [id]
        db.query(requete,params, (erreur,resultat) => {
            if(erreur) {
                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
};
const getlistpokemonpageandtype = (urlparams) => {
    return new Promise((resolve, reject)=>{
      //const urlparams = url.parse(req.url, true).query; 
    
      if(urlparams["page"]){
        if(urlparams["type"]){
            if(urlparams["page"] == 1){
                const requete = `SELECT * FROM pokemon WHERE type_primaire = $1 limit 25`;
                const params = [urlparams["type"]];
            db.query(requete,params,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat.rows);
            });
            }
            else{
                let offset = (urlparams["page"] * 25)-25;
                let textoffset = offset.toString();
                let requetedebut = `SELECT * FROM pokemon WHERE type_primaire = $1 limit 25 OFFSET `;
                let requete = requetedebut.slice(0) + textoffset;
                const params = [urlparams["type"]];
            db.query(requete,params,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat.rows);
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
                resolve(resultat.rows);
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
                resolve(resultat.rows);
            });
            }
        }
      }
      else{
        if(urlparams["type"]){
            const requete = `SELECT * FROM pokemon WHERE type_primaire = $1 limit 25`;
            const params = [urlparams["type"]];
            db.query(requete,params,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);

                    reject(erreur);
                }
                resolve(resultat.rows);
            });
        }
        else{
            const requete = `SELECT * FROM pokemon limit 25`;
            db.query(requete,(erreur,resultat)=>{
                if(erreur){
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat.rows);
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
                  const requete = `SELECT * FROM pokemon WHERE type_primaire = $1 `;
                  const params = [urlparams["type"]];
              db.query(requete,params,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                      reject(erreur);
                  }
                  resolve(resultat.rows);
              });
              }
              else{
                  let offset = (urlparams["page"] * 25)-25;
                  let textoffset = offset.toString();
                  let requetedebut = `SELECT * FROM pokemon WHERE type_primaire = $1 `;
                 // let requete = requetedebut.slice(0) + textoffset;
                  const params = [urlparams["type"]];
              db.query(requetedebut,params,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                      reject(erreur);
                  }
                  resolve(resultat.rows);
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
                  resolve(resultat.rows);
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
                  resolve(resultat.rows);
              });
              }
          }
        }
        else{
          if(urlparams["type"]){
              const requete = `SELECT * FROM pokemon WHERE type_primaire = $1 `;
              const params = [urlparams["type"]];
              db.query(requete,params,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
  
                      reject(erreur);
                  }
                  resolve(resultat.rows);
              });
          }
          else{
              const requete = `SELECT * FROM pokemon`;
              db.query(requete,(erreur,resultat)=>{
                  if(erreur){
                      console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                      reject(erreur);
                  }
                  resolve(resultat.rows);
              });
          }
        }
      });
}
const ajouterpokemon = (nom,typepri,typesec,pv,attaque,defence) =>  {
    return new Promise((resolve, reject) =>{
        const requete = `INSERT INTO pokemon (nom,type_primaire,type_secondaire,pv,attaque,defense) VALUES ($1,$2,$3,$4,$5,$6) `;
        const params2 = [nom,typepri,typesec,pv,attaque,defence];
        db.query(requete,params2,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
}
const modifpokemon= (id,nom,typepri,typesec,pv,attaque,defence) => {
    return new Promise((resolve, reject) =>{
        const requete = `UPDATE pokemon SET  nom = $1, type_primaire = $2 , type_secondaire = $3 , pv = $4, attaque = $5, defense = $6 WHERE id = $7`;
        const params = [nom,typepri,typesec,pv,attaque,defence,id];
        db.query(requete,params,(erreur,resultat)=>{
            if(erreur){
                //console.log("test1234");
                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
}
const supprimer = (id) =>{
    return new Promise((resolve, reject)=>{
        const requete = `DELETE FROM pokemon WHERE id = $1`;
        const params = [id];
        db.query(requete,params,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
}
    export default {
    getpokemonbyid,getlistpokemonpageandtype,getnombrepokemonlist,ajouterpokemon,modifpokemon,supprimer
}