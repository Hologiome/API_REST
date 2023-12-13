// utilisation d'un routeur Express
const express = require("express");
const routerSportifs = express.Router();
// utilisation du controller de gestion des sportifs
const controllerSportifs = require("../controllers/controllerSportifs.js");



routerSportifs.get("/sportifs", controllerSportifs.liste);

routerSportifs.get("/sportifs/:numlicence", controllerSportifs.find);

routerSportifs.post("/sportifs", controllerSportifs.ajout);

routerSportifs.put("/sportifs/:numlicence", controllerSportifs.modif);

routerSportifs.delete("/sportifs/:numlicence", controllerSportifs.del);


module.exports = { routerSportifs };