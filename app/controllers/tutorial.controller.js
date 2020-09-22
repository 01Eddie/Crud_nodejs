const db = require('../models');
const Tutorial = db.tutorials;

//Crear y guardar un nuevo tutorial
exports.create = (req, res) => {
//Creando un nuevo objeto

    //validar solicitud
    if (!req.body.title) {
        res.status(400).send({ message: "El contenido no puede estar vacio!"})
        return;
    }

    //Crear un tutorial
    const tutorial = new tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    //Guardar tutorial en la base de datos
    tutorial
    .save(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Se produjo un error al crear el tutorial"
        });
    });
};

//Recupere todos los tutoriales desde la base de datos
exports.findAll = (req, res) => {
//Recuperar objetos (con condición);
 
    const title = req.query.title;
    var condition = title ? { title: { $regex:  new RegExp(title), $options: "i"}} : {};

    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "se produjo un error al recuperar los tutoriales." 
            });
        });
};

// Encuentra un solo tutorial con una identificación
exports.findOne = (req, res) => {
//Recuperar un solo objeto
    const id= req.params.id;

    Tutorial.findById(id)
    .then(data => {
        if (!data) 
            res.status(404).send({ message: "No se encontro el tutorial con el id " + id });
        else res.send(data);
    })
    .catch (err => {
        res
        .status(500)
        .send({ message: "Error al recuperar el tutorial con id " + id });
    });
}; 

//Actualizar un tutorial con la id en la solicitud
exports.update = (req, res) => {
    //Actualizar un objeto
    if (!req.body) {
        return res.status(400).send({
            message: "Los datos para actualizar no pueden estar vacios!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `No se puede actualizar el tutorial con id= ${id}. Quizas no se encontró el tutorial;`
            });
        } else res.send({ message: "El tutorial ha sido actualizado satisfactoriamente." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar el tutorial con id = " + id
        });
    });
};

//Borrar un tutorial con la especificacion de la id en la solicitud
exports.delete = (req, res) => {
    //Borrando un objeto
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `No se puede eliminar el tutorial con id = ${id}. ¡Quizás no se encontró el Tutorial!`
            });
        } else {
            res.send({
                message : "El tutorial se elimino correctamente o satisfactoriamente!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message : "No se pudo eliminar el tutorial con el id= " + id
        });
    });
};

//Borrar todos los tutoriales desde la base de dato
exports.deleteAll = (req, res) =>{
//Borrar todos los objetos
Tutorial.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Los tutoriales fueron borrados satisfactoriamente!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Se produjo un error al eliminar todos los tutoriales."
        });
    });
};


//Encuentra todas las publicaciones de los tutoriales
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Se produjo un error al recuperar los tutoriales."
        });
    });
};


