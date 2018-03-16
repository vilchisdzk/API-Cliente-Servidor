const cors = require('cors');
const path= require('path');
const express = require('express'); //ya incluye el bodyParser
const app = express();

//const indexRoutes = require('./routes/index');
const taskRoutes = require('./routes/task');



//Si hay un puerto disponible en el servidor,
// utilizalo en caso contrario utiliza el 3000
const port = process.env.PORT || 3000;

///////////////////////////////////////////////////////////////////////////////////////////////////
// CONFIGURACIONES
// Asignar el puerto al servidor
app.set('port', port);

// Para poder renderizar vistas html
app.engine('html', require('ejs').renderFile);

//Configurar el motor de plantillas
app.set('view engine', 'ejs');


//app.set('views', path.join(__dirname, 'views')); //Especificar donde se encuentran las vistas

///////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARES
app.use(cors()); // mediador con angular
app.use(express.json()); // ´para poder recibir json
app.use(express.urlencoded({extended: false})) // para poder recibir datos desde la url (post etc)

// RUTAS
// app.use(indexRoutes);
app.use('/api',taskRoutes);

app.use(express.static(path.join(__dirname, 'dist')));
// Activarse al levantar el servidor
app.listen(app.get('port'), () => {
  console.log('Servidor levantado en el puerto ', app.get('port'));
})
