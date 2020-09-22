module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller.js');

    const router = require('express').Router();

    //Crear un nuevo tutorial
    router.post('/', tutorials.create);

    //Recuperar todos los tutoriales
    router.get('/', tutorials.findAll);

    //Recuperar todas las tutoriales publicados
    router.get('/published', tutorials.findAllPublished);

    //Recuperar un solo tutorial con una id 
    router.get('/:id', tutorials.findOne);

    //Actualizar un tutorial con id
    router.put('/:id', tutorials.update);

    //Borrar un tutorial con id
    router.delete('/:id', tutorials.delete);

    //Borrando todos los tutoriales
    router.delete('/', tutorials.deleteAll);

    app.use('/api/tutorials', router);
}