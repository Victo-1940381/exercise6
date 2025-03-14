
import { error } from "console";
import pokemonModel from "../modèle/pokemon.model.js";
import	url from 'url';
const trouverpokemon = async (req,res) => {
    if(!req.params.id || parseInt(req.params.id)<= 0){
        res.status(400);
        res.send({erreur: `l'id doit etre superieur a zero`});
        return;
    }
    await pokemonModel.getpokemonbyid(req.params.id)
    .then((pokemon) => {
        if (!pokemon[0]){
            res.status(404);
            res.send({erreur: `pokemon introuvable avec l'id ${req.params.id}`});
            return;
        }
        res.status(200);
        res.send(pokemon[0]);
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500);
        res.send({message: "erreur lors de la recuperation du pokémon avec l'id " + req.params.id});
    });
};
const trouverpokemonlist = async(req,res) => {
     const urlparams = url.parse(req.url, true).query;
     let stat;
    await pokemonModel.getnombrepokemonlist(urlparams)
    .then((nbpokemon)=>{
        if(urlparams["type"]){
        stat = {
            "type" : urlparams["type"],
            "nombrepokemontotal":nbpokemon.length,
            "page" : urlparams["page"],
            "totalpage" : Math.trunc( nbpokemon.length / 25)};
           // res.send(stat);
        }
        else{
            stat = {
                "type" : " ",
                "nombrepokemontotal":nbpokemon.length,
                "page" : urlparams["page"],
                "totalpage" : Math.trunc( nbpokemon.length / 25)};
        }
        });

    await pokemonModel.getlistpokemonpageandtype(urlparams)
    .then((pokemon)=>{
        if(!pokemon[0]){
            stat = {
                "type" : " ",
                "nombrepokemontotal":0,
                "page" : 1,
                "totalpage" :1};
                let rep = {"pokemon": pokemon,
                    "stat": stat
                };
                res.send(rep);   
        }
        else{
            let rep = {"pokemon": pokemon,
                "stat": stat
            };
            res.send(rep);
        }
        
    });
    
};
const ajoutpokemon = async(req,res) => {
    let erreur = false;
    let champs_manquant = [];
   if(!req.body.nom || !req.body.type_primaire || !req.body.type_secondaire || !req.body.pv || !req.body.attaque || !req.body.defense){
    erreur = true;
   }

   if(erreur){
        if(!req.body.nom){
            champs_manquant.push("nom");
        }
        if(!req.body.type_primaire){
            champs_manquant.push("type_primaire");
        }
        if(!req.body.type_secondaire){
            champs_manquant.push("type_secondaire");
        }
        if(!req.body.pv){
            champs_manquant.push("pv");
        }
        if(!req.body.attaque){
            champs_manquant.push("attaque");
        }
        if(!req.body.defense){
            champs_manquant.push("defense");
        }   
        let erreur = {"erreur":"le format des donnée est invalide",
            "champs_manquant":champs_manquant
        } 
        res.status(400);
        res.send(erreur);
        return;
   }
   else{
    await pokemonModel.ajouterpokemon(req.body.nom,req.body.type_primaire,req.body.type_secondaire,req.body.pv,req.body.attaque,req.body.defense)
    .then((pokemon)=>{
        let pokemoninfo = {"id":pokemon.insertId,
                        "nom":req.body.nom,
                        "type_primaire":req.body.type_primaire,
                        "type_secondaire":req.body.type_secondaire,
                        "pv":req.body.pv,
                        "attaque":req.body.attaque,
                        "defense":req.body.defense
        };
        let rep = {"message":`le pokemon [${req.body.nom}] a été ajouter avec succes`,
                    "pokemon":pokemoninfo};
                res.send(rep);    
    })
    .catch((erreur)=>{
        res.status(500);
        res.send({"erreur":`echec lors de la creation du pokemon [${req.body.nom}]`});
    });
   }
};
const modif = async(req,res) => {
    let erreurmoins = false;
    let trouver = false;
    let champs_manquant = [];
   if(!req.body.nom || !req.body.type_primaire || !req.body.type_secondaire || !req.body.pv || !req.body.attaque || !req.body.defense){
    erreur = true;
   }
  /* if(!req.params["id"] || parseInt(req.params["id"])<= 0){
    res.status(400);
    res.send({erreur: `l'id doit etre superieur a zero`});
    return;
}*/

   if(erreurmoins){
        if(!req.body.nom){
            champs_manquant.push("nom");
        }
        if(!req.body.type_primaire){
            champs_manquant.push("type_primaire");
        }
        if(!req.body.type_secondaire){
            champs_manquant.push("type_secondaire");
        }
        if(!req.body.pv){
            champs_manquant.push("pv");
        }
        if(!req.body.attaque){
            champs_manquant.push("attaque");
        }
        if(!req.body.defense){
            champs_manquant.push("defense");
        }   
        let erreur = {"erreur":"le format des donnée est invalide",
            "champs_manquant":champs_manquant
        } 
        res.status(400);
        res.send(erreur);
        return;
   }
   else{
    
    await pokemonModel.getpokemonbyid(parseInt(req.params['id']))
    .then((poke)=>{
        if(!poke[0]){
           trouver = false; 
        }
        else{
            trouver = true;

        }
    })
    .catch((error)=>{
        
    });
    await pokemonModel.modifpokemon(parseInt(req.params['id']),req.body.nom,req.body.type_primaire,req.body.type_secondaire,req.body.pv,req.body.attaque,req.body.defense)
    .then((pokemon)=>{
        if(!trouver){
            res.status(404);
            res.send({"erreur":`le pokemon id [${req.params["id"]}] n'existe pas dans la base de données`});
            return;
        }
        let pokemoninfo = {"id":req.params["id"],
                        "nom":req.body.nom,
                        "type_primaire":req.body.type_primaire,
                        "type_secondaire":req.body.type_secondaire,
                        "pv":req.body.pv,
                        "attaque":req.body.attaque,
                        "defense":req.body.defense
        };
        let rep = {"message":`le pokemon [${req.params["id"]}] a été modifier avec succes`,
                    "pokemon":pokemoninfo};
                res.status(200);
                res.send(rep);    
    })
    .catch((erreur)=>{
        res.status(500);
        res.send({"erreur":`echec lors de la modification du pokemon [${req.params["id"]}]`});
    });
   }
}
const suppr = async(req,res) =>{
    let trouver = false;
    let pokemoninfo
    await pokemonModel.getpokemonbyid(parseInt(req.params['id']))
    .then((poke)=>{
        if(!poke[0]){
           trouver = false; 
        }
        else{
            trouver = true;
            pokemoninfo = poke[0];
        }
    })
    .catch((error)=>{

    });
    await pokemonModel.supprimer(parseInt(req.params['id']))
    .then((pokmeon)=>{
        if(!trouver){
            res.send({"erreur":`le pokemon id [${req.params["id"]}] n'existe pas dans la base de données`});
            return;
        }
        let rep = {"message":`le pokemon [${req.params["id"]}] a été supprimer avec succes`,
                    "pokemon":pokemoninfo};
                res.send(rep);
    })
    .catch((erreur)=>{
        res.status(500);
        res.send({"erreur":`echec lors de la suppression du pokemon [${pokemoninfo.nom}]`});
    });
}
export{
    trouverpokemon,trouverpokemonlist,ajoutpokemon,modif,suppr
}
