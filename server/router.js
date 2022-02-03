import express from 'express';
import {
    addSpacecraft, updateSpacecraft, deleteSpacecraft, getSpacecrafts,
    addAstronaut, addAstronautForSpacecraft, updateAstronaut, deleteAstronaut, getAstronaut, filterSpacecraft,
    sortSpacecraft, paginationSpacecraft
} from './controller.js';

const router = express.Router();

router.route('/spacecraft')
    .post((req, res) => addSpacecraft(req, res))
    .get((req, res) => getSpacecrafts(req, res))

router.route('/filterSpacecraft')
    .get((req, res) => filterSpacecraft(req, res));

router.route('/sortSpacecraft')
    .get((req, res) => sortSpacecraft(req, res));

router.route('/pagination')
    .get((req, res) => paginationSpacecraft(req, res));

router.route('/spacecraft/:id')
    .put((req, res) => updateSpacecraft(req, res))
    .delete((req, res) => deleteSpacecraft(req, res));

router.route('/spacecraft/:idSpacecraft/astronaut')
    .get((req, res) => getAstronaut(req, res))


router.route('/spacecraft/astronaut')
    .post((req, res) => addAstronautForSpacecraft(req, res));
router.route('/spacecraft/astronaut/:id')
    .put((req, res) => updateAstronaut(req, res))
    .delete((req, res) => deleteAstronaut(req, res));




export default router;