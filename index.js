// -- utilisation du serveur web Express
const express = require("express");
var bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())




// -- utilisation du router pour la gestion de sportifs
const { routerSportifs } = require("./app/routes/routerSportifs.js");
app.use(routerSportifs);


// lancement du serveur web qui écoute sur le port 8080
app.listen(8080, () => {
    console.log("Server started");
});