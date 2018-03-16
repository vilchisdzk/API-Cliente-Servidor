const router = require('express').Router();
const mongojs = require('mongojs');

// var db = mongojs('root:root@localhost/tienda', ['articulos'])
var db = mongojs('root:root@127.0.0.1/mean-db', ['tasks']);
// var db = mongojs('belin:123456@127.0.0.1/tienda', ['articulos']);

router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, task) => {
        if (err) return next(err); //Si ocurre un error
        res.json(task); // Si no retorna las tareas
    });
});

// router.get('/tasks/:id', (req, res, next) => {
//     db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
//         if (err) return next(err); //Si ocurre un error
//         res.json(task); // Si no retorna las tareas
//     });
// });

router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: parseInt(req.params.id)}, (err, task) => {
        if (err) return next(err); //Si ocurre un error
        res.json(task); // Si no retorna las tareas
    });
});

router.post('/tasks', (req, res, next) => {
    const task = req.body;
    if(!task.title || !(task.isDone + '')) {
        res.status(400).json({
          error: 'Error de Datos'
        })
    }
    else{
      db.tasks.save(task, (err, task) => {
          if (err) return next(err);
          res.json(task);
      });
    }
});

router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if (err) return next(err); //Si ocurre un error
        res.json(result); // Si no retorna las tareas
    });
});

router.put('/tasks/:id', (req, res, next) => {
    const task = req.body;
    const updateTask = {};

    if(task.isDone) {
        updateTask.isDone = task.isDone;
    }
    if(task.title) {
        updateTask.title= task.title;
    }
    if(!updateTask) {
        res.status(400).json({
          error: 'Error de Datos'
        })
    }else{
      db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, (err, result) => {
          if (err) return next(err); //Si ocurre un error
          res.json(result); // Si no retorna las tareas
      });
    }


});

module.exports = router;
