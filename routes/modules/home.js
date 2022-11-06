const express = require('express')
const router = express.Router()
const Resto = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Resto.find({userId})
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router
