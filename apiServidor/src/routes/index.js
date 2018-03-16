const router = require('express').Router();

router.get('/', (req, res, next) => {
  //res.send('Hola DGTIC');
  res.render('index.html');
});

module.exports = router;
