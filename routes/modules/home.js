const express = require('express')
const router = express.Router()
const Resto = require('../../models/restaurant')

router.get('/', (req, res) => {
  Resto.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router
