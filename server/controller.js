import { Astronaut, Spacecraft } from "./model.js";

async function getSpacecrafts(req, res) {
    try {
        const spacecrafts = await Spacecraft.findAll();
        if (spacecrafts.length > 0) {
            res.status(200).json(spacecrafts);
        }
        else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function addSpacecraft(req, res) {
    try {
        const newSpacecraft = await Spacecraft.create(req.body);
        return res.status(200).json(newSpacecraft);
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function updateSpacecraft(req, res) {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.id);
        if (spacecraft) {
            Object.entries(req.body).forEach(([attribute, value]) => spacecraft[attribute] = value);
            const updateSpacecraft = await spacecraft.save(req.body);
            return res.status(200).json(updateSpacecraft);
        } else {
            return res.status(404).json({ error: `nu a fost gasit id = ${req.params.id}` });
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

async function deleteSpacecraft(req, res) {
    try {
        if (req.params.id) {
            const spacecraft = await Spacecraft.findByPk(req.params.id);
            if (spacecraft) {
                await spacecraft.destroy();
                res.status(204).send();
            } else {
                res.status(404).send();
            }
        } else {
            res.status(400).send();
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getAstronaut(req, res) {
    try {

        const astronaut = await Astronaut.findAll({
            where: {
                idSpacecraft: req.params.idSpacecraft
            }
        })
        if (astronaut) {
            res.json(astronaut);
        } else {
            res.status(404).send("Not found");
        }

    } catch (error) {
        res.status(500).send(error);
    }

}

async function addAstronaut(req, res) {
    try {
        if (req.body.nume) {
            await Astronaut.create(req.body);
            res.status(201).send("Created");
        } else {
            res.status(400).send("Bad request");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function addAstronautForSpacecraft(req, res) {
    try {
        if (req.body.nume) {
            const spacecraft = await Spacecraft.findByPk(req.body.idSpacecraft);
            if (spacecraft) {
                await Astronaut.create(req.body);
                res.status(201).send("Created");
            }
        } else {
            res.status(400).send("Bad request");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function updateAstronaut(req, res) {
    try {
        if (req.body.idSpacecraft && req.params.id) {
            const spacecraft = await Spacecraft.findByPk(req.body.idSpacecraft);

            const astronaut = await Astronaut.findByPk(req.params.id);

            if (astronaut && spacecraft) {
                Object.entries(req.body).forEach(([attribute, value]) => astronaut[attribute] = value);
                const updateAstronaut = await astronaut.save();
                return res.status(200).json(updateAstronaut);
            } else {
                return res.status(404).json({ error: `nu a fost gasit id = ${req.body.id}` });
            }
        }

    } catch (err) {
        return res.status(500).json(err);
    }
}

async function deleteAstronaut(req, res) {
    try {
        const astronaut = await Astronaut.findByPk(req.params.id);
        if (astronaut) {
            await astronaut.destroy();
            res.status(204).send();
        } else {
            res.status(400).send();
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function filterSpacecraft(req, res) {
    try {
        //http://localhost:8080/api/spacecraft?masa=400
        // http://localhost:8080/api/spacecraft/?masa=400&maximSpeed=1500
        const spacecraft = await Spacecraft.findAll({
            where: {
                masa: req.query.masa,
                maximSpeed: req.query.maximSpeed
            }
        });
        res.status(200).json(spacecraft);

    } catch (error) {
        res.status(500).json(error);
    }
}

//http://localhost:8080/api/sortSpacecraft?order=DESC
async function sortSpacecraft(req, res) {
    try {
        const spacecraft = await Spacecraft.findAll({
            order: [
                ['masa', req.query.order]
            ],
        });
        res.status(200).json(spacecraft);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function paginationSpacecraft(req, res) {
    try {
        const paginationSpacecraft =
            await Spacecraft.findAndCountAll({ where: { maximSpeed: req.query.maximSpeed }, offset: 0, limit: 2 });

        res.status(200).json(paginationSpacecraft);
    } catch (error) {
        res.status(500).json(error);
    }
}


export {
    addSpacecraft, updateSpacecraft, deleteSpacecraft, getSpacecrafts,
    addAstronaut, addAstronautForSpacecraft, updateAstronaut, deleteAstronaut, getAstronaut, filterSpacecraft, sortSpacecraft,
    paginationSpacecraft
};