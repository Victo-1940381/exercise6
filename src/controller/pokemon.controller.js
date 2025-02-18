
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
        res.send(pokemon[0]);
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500);
        res.send({message: "erreur lors de la recuperation du pokémon acev l'id" + req.params.id});
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
            
        }
        else{
            let rep = {"pokemon": pokemon,
                "stat": stat
            };
            res.send(rep);
        }
        
    });
    
};

export{
    trouverpokemon,trouverpokemonlist
}
