let router = require('express').Router();

const peoplesControllerPg = require('../controllers/peoples-controller-pg');

router.post('/', peoplesControllerPg.adicionarPeoplePg);

router.get('/', peoplesControllerPg.listarPeoplesPg);

router.get('/:id', peoplesControllerPg.listarPeoplePorIDPg);

router.put('/:id', peoplesControllerPg.atualizarPeoplePg);

router.delete('/:id', peoplesControllerPg.removerPeoplePg);

module.exports = router; 