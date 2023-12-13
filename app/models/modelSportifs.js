const nano = require('nano')('http://Keran:Betabeta@127.0.0.1:5984');
const dbSportifs = nano.db.use("sportifs");

const listeSportifs = async (nom, tri) => {
    let query = {
        "selector": {},
        "fields": ["nom", "prenom"],
    };

    if (tri === 'alphabetique') {
        query.sort = ["nom", "prenom"];
    }

    if (nom) {
        query.selector.nom = nom;
    }

    try {
        return await dbSportifs.find(query);
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};

const findSportif = async (numlicence) => {
    const query = {
        "selector": { "numlicence": Number(numlicence) },
        "fields": ["nom", "prenom", "datenaiss"],
    };

    try {
        return await dbSportifs.find(query);
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};

const ajoutSportif = async (sportif) => {
    try {
        return await dbSportifs.insert(sportif);
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};

const delSportif = async (numlicence) => {
    const query = {
        "selector": { "numlicence": Number(numlicence) },
        "fields": ["_id", "_rev"],
    };

    try {
        let result = await dbSportifs.find(query);
        if (result.docs.length > 0) {
            const sportif = result.docs[0];
            return await dbSportifs.destroy(sportif._id, sportif._rev);
        } else {
            throw new Error("Sportif not found");
        }
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};

const modifSportif = async (numlicence, sportif) => {
    const query = {
        "selector": { "numlicence": Number(numlicence) },
        "fields": ["_id", "_rev"],
    };

    try {
        let result = await dbSportifs.find(query);
        if (result.docs.length > 0) {
            const sportifToUpdate = result.docs[0];
            const updatedSportif = {
                "_id": sportifToUpdate._id,
                "_rev": sportifToUpdate._rev,
                ...sportif,
            };
            return await dbSportifs.insert(updatedSportif);
        } else {
            throw new Error("Sportif not found");
        }
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};


module.exports = { listeSportifs, findSportif, ajoutSportif, delSportif, modifSportif };


