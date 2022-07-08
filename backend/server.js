//declaramos propiedades
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


//conectar con la BD
mongoose
//.connect('mongodb://127.0.0.1:27017/empleadosds02')
    .connect('mongodb+srv://anime:anime1234@animeproyecto.tlk4v.mongodb.net/animes?retryWrites=true&w=majority')
    .then((x) => {
        console.log(`Conectado a Mongo! Base de datos "${x.connections[0].name}"`);
    }).catch((err) => {
        console.log("Error al conectarse con Mongo", err.reason);
    });


//configuramos servidor de Express
const animeRuta = require("./routes/anime.route");
const app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/animes')));
app.use("/", express.static(path.join(__dirname, 'dist/animes')));
app.use('/api', animeRuta);

//crear puerto
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Conectada al puerto ' + port);
});

//manejador de error 404 
app.use((req, res, next) => {
    next(createError(404))
})

//manejador de errores
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});