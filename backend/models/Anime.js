const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Anime = new Schema({
    nombre: {
        type: String
    },
    genero: {
        type: String
    },
    temporada: {
        type: String
    },
    autor: {
        type: String
    },
    sinopsis: {
        type: String
    },
    imagen: {
        type: String
    }
}, {
    collection: 'anime'
})

module.exports = mongoose.model('Animes', Anime)