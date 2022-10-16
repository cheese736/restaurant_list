const express = require('express')
const router = express.Router()
const Resto = require('../../models/restaurant')

// 進入餐廳新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆資料
router.post('/new', (req, res) => {
  const {
    name, name_en, category, image, location,
    phone, google_map, rating, description
  } = req.body

  Resto.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 進入搜尋結果
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Resto.find()
    .lean()
    .then((restaurants) => {
      const filteredresult = restaurants.filter(restaurant => {
        return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      })
      res.render('index', { restaurants: filteredresult, keyword })
    })
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Resto.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 進入餐廳詳細資料
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Resto.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 進入餐廳編輯頁面

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Resto.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 修改一筆資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  const {
    name, name_en, category, image, location,
    phone, google_map, rating, description
  } = req.body

  Resto.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

module.exports = router
