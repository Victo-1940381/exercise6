import { parse } from "dotenv";
import pokemonModel from "../modèle/pokemon.model.js";

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
    await pokemonModel.getlistpokemonpageandtype()
    .then((pokemon)=>{
        for(let i =0;i<pokemon.lenght;i++){
            res.send(pokemon[i]);
        }
    })
};

export{
    trouverpokemon,trouverpokemonlist
}
