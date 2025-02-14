import express from 'express';
import router from './src/routes/pokemon.route.js';

// Créer une application express
const app = express();

// Importer les middlewares
app.use(express.json());
app.use('/api/pokemon', router);









// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
