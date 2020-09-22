const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsoption = {
    origin: 'http://localhost:4001'
};

app.use(cors(corsoption));

//analizar solicitudes de tipo de contenido - application / json
// parse requests of content-type - application/json
app.use(bodyParser.json());

//analizar solicitudes de tipo de contenido - application / x-www-form-urlencoded
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

const db = require('./app/models');
db.mongoose
   .connect(db.url, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   .then(() => {
       console.log('Conectado a la base de datos');
   })
   .catch(err => {
       console.log('No se puede conectar a la base de dato', err);
       process.exit();
   })



//Ruta simple
app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.json({ message: "Bienvenido a la aplicacion. " });
  })
  
 
require('./app/routes/tutorial.routes')(app);
//establecer puerto, escuchar solicitudes
// set port, listen for requests
const port = process.env.port || 4000;
app.listen(port, () => {
   console.log(`Conectado en --> http://localhost:${port}`);
 });

