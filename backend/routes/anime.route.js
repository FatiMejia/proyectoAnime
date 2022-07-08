const express = require('express')
const app = express()
const animeRuta = express.Router()
const { findByIdAndUpdate } = require('../models/Anime')

let Anime = require('../models/Anime')

//agregar un nuevo anime
animeRuta.route('/create').post((req, res, next) => {
    Anime.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//obtenemos todos los animes 
animeRuta.route('/anime').get((req, res, next) => {
    Anime.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//obtenemos un solo anime por su id
animeRuta.route('/anime/:id').get((req, res, next) => {
    Anime.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//actualizar un anime 
animeRuta.route('/update/:id').put((req, res, next) => {
    Anime.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log('Se actualizo el documento exitosamente')
        }
    })
})

// eliminar anime 
animeRuta.route('/delete/:id').delete((req, res, next) => {
    Anime.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = animeRuta;