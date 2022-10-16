const express = require('express')
const router = express.Router()
const Resto = require('../../models/restaurant')

// 進入搜尋結果
router.get('/', (req,res) => {
  const keyword = req.query.keyword
  Resto.find()
  .lean()
  .then((restaurants) => {
    const filteredresult = restaurants.filter(restaurant => {
      return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || 
      restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    })
      res.render('index', {restaurants : filteredresult, keyword: keyword})
  })
})

module.exports = router