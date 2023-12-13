
const { listeSportifs, findSportif, ajoutSportif, delSportif, modifSportif } = require("../models/modelSportifs.js");


const nano = require('nano')('http://Keran:Betabeta@127.0.0.1:5984');

const dbSportifs = nano.db.use("sportifs");



const liste = async (req, res) => {
    const { nom, tri } = req.query;

    try {
        let sportifs = await listeSportifs(nom, tri);
        res.json(sportifs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const find = async (req, res) => {
    const numlicence = req.params.numlicence;

    try {
        let sportif = await findSportif(numlicence);
        res.json(sportif);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const ajout = async (req, res) => {
    try {
        const sportif = req.body;
        const response = await ajoutSportif(sportif);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const del = async (req, res) => {
    const numlicence = req.params.numlicence;
    try {
        const response = await delSportif(numlicence);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const modif = async (req, res) => {
    const numlicence = req.params.numlicence;
    const sportif = req.body;

    try {
        const response = await modifSportif(numlicence, sportif);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { liste, del, find, ajout, modif }