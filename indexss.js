// -- utilisation du module Express
const express = require("express");

var bodyParser = require('body-parser')
// -- création d'une application
const app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const nano = require('nano')('http://Keran:Betabeta@127.0.0.1:5984');

const dbSportifs = nano.db.use("sportifs");


// route / qui affiche Hello World
app.get("/", (req, res) => {
    res.send("API des sportifs");
});


app.get("/sportifs", async (req, res) => {
    const { nom, tri } = req.query;

    let indexSportif = {
        "index": { "fields": ["nom", "prenom", "datenaiss", "numlicence"] },
        "name": "nom-index",
        "type": "json "
    };
    
    const query = {
        "selector": {},
        "fields": ["nom", "prenom"],
    };
    const query2 = {
        "selector": {},
        "fields": ["nom", "prenom"],
        "sort": ["nom", "prenom"],
    };

    if (nom) {
        
        query.selector.nom = nom;
    }

    try {


        
        if (tri === 'alphabetique') {
            const responseI = await dbSportifs.insert(indexSportif);
            let sportifs = await dbSportifs.find(query2);
            console.log(sportifs);
            res.json(sportifs);
        }
        else {
            let sportifs = await dbSportifs.find(query);
            console.log(sportifs);
            res.json(sportifs);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/sportifs/:numlicence", async (req, res) => {
    // let indexSportif = {
    //     "index": { "fields": ["nom", "prenom", "datenaiss","numlicence"] },
    //     "name": "nom-index",
    //     "type": "json "
    // };
    const numero = Number(req.params.numlicence);
    const query = {
        "selector": { "numlicence": numero },
        "fields": ["nom", "prenom", "datenaiss"],
    }
    try {
        // const responseI = await dbSportifs.insert(indexSportif);
        let sportifs = await dbSportifs.find(query);
        res.json(sportifs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/sportifs", async (req, res) => {
    try {
        const sportif = req.body;
        console.log(req.body);
        const responseI = await dbSportifs.insert(sportif);
        res.json(responseI);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/sportifs/:numlicence", async (req, res) => {
    try {
        const numero = Number(req.params.numlicence);
        const query = {
            "selector": { "numlicence": numero },
            "fields": ["_id", "_rev"],
        }
        let sportifs = await dbSportifs.find(query);
        console.log(sportifs.docs[0]._id);
        const responseD = await dbSportifs.destroy(
            sportifs.docs[0]._id,
            sportifs.docs[0]._rev,
        );
        res.json(responseD);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/sportifs/:numlicence", async (req, res) => {
    try {
        const numero = Number(req.params.numlicence);
        const query = {
            "selector": { "numlicence": numero },
            "fields": ["_id", "_rev"],
        }
        let sportifs = await dbSportifs.find(query);
        const sportif = req.body;

        const change = {
            "_id": sportifs.docs[0]._id,
            "_rev": sportifs.docs[0]._rev,
              "numlicence": numero, "nom": req.body.nom, "prenom": req.body.prenom, "datenaiss": req.body.datenaiss, "sport": {
                "codes": req.body.sport.code,
                "libelle": req.body.sport.libelle
            }
        };
        console.log(change);
        const responseD = await dbSportifs.insert(change);
        res.json(responseD);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





// lancement du serveur web qui écoute sur le port 8080
app.listen(8080, () => {
    console.log("Server started");
});
