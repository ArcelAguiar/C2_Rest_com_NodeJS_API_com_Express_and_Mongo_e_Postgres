let router = require('express').Router();

const peoplesController = require('../controllers/peoples-controller');

router.post('/', peoplesController.adicionarPeople);      //=> Insere people

router.get('/', peoplesController.listarPeoples);         //=> Lista os peoples

router.get('/:id', peoplesController.listarPeoplePorID);  //=> Lista peoples por ID

router.put('/:id', peoplesController.atualizarPeople);    //=> Altera e atualiza dados 

router.delete('/:id', peoplesController.removerPeople);   //=> Deleta dados 

module.exports = router;
