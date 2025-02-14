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
    if(page ==1)
        {
            return new Promise((resolve, reject)=>{
            const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25`;
            const params = [type]
            db.query(requete,params,(erreur, resultat) => {
                if(erreur) {
                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            });
            });
        }
       else if(page ==2)
            {
                return new Promise((resolve, reject)=>{
                const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET 25`;
                const params = [type]
                db.query(requete,params,(erreur, resultat) => {
                    if(erreur) {
                        console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                        reject(erreur);
                    }
                    resolve(resultat);
                });
                });
            }
            else if(page ==3)
                {
                    return new Promise((resolve, reject)=>{
                    const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET 50`;
                    const params = [type]
                    db.query(requete,params,(erreur, resultat) => {
                        if(erreur) {
                            console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                            reject(erreur);
                        }
                        resolve(resultat);
                    });
                    });
                }
                else if(page ==4)
                    {
                        return new Promise((resolve, reject)=>{
                        const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET 75`;
                        const params = [type]
                        db.query(requete,params,(erreur, resultat) => {
                            if(erreur) {
                                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                                reject(erreur);
                            }
                            resolve(resultat);
                        });
                        });
                    }
                    else if(page ==5)
                        {
                            return new Promise((resolve, reject)=>{
                            const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET 100`;
                            const params = [type]
                            db.query(requete,params,(erreur, resultat) => {
                                if(erreur) {
                                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                                    reject(erreur);
                                }
                                resolve(resultat);
                            });
                            });
                        }
                        else if(page ==6)
                            {
                                return new Promise((resolve, reject)=>{
                                const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET 125`;
                                const params = [type]
                                db.query(requete,params,(erreur, resultat) => {
                                    if(erreur) {
                                        console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                                        reject(erreur);
                                    }
                                    resolve(resultat);
                                });
                                });
                            }
                            else if(page ==7)
                                {
                                    return new Promise((resolve, reject)=>{
                                    const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET 150`;
                                    const params = [type]
                                    db.query(requete,params,(erreur, resultat) => {
                                        if(erreur) {
                                            console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                                            reject(erreur);
                                        }
                                        resolve(resultat);
                                    });
                                    });
                                }
                                else if(page ==8)
                                    {
                                        return new Promise((resolve, reject)=>{
                                        const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET 175`;
                                        const params = [type]
                                        db.query(requete,params,(erreur, resultat) => {
                                            if(erreur) {
                                                console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                                                reject(erreur);
                                            }
                                            resolve(resultat);
                                        });
                                        });
                                    }
                                    else if(page ==9)
                                        {
                                            return new Promise((resolve, reject)=>{
                                            const requete = `SELECT * FROM pokemon WHERE type_primaire = ? LIMIT 25 OFFSET 200`;
                                            const params = [type]
                                            db.query(requete,params,(erreur, resultat) => {
                                                if(erreur) {
                                                    console.log(`Erreur sqlstate ${erreur.sqlState} : ${erreur.sqlMessage}`);
                                                    reject(erreur);
                                                }
                                                resolve(resultat);
                                            });
                                            });
                                        }
    


}

export default {
    getpokemonbyid,getlistpokemonpageandtype
}