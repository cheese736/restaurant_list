// require packages used in the project
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Resto = require('./models/restaurant') 
const restaurant = require('./models/restaurant')
const methodOverride = require('method-override')

mongoose.connect(process.env.MONGODB2_URI, {useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

// routes setting

// 進入餐廳新增頁面
app.get('/restaurants/new', (req,res) => {
  res.render('new')
})

// 新增一筆資料
app.post('/restaurants/new', (req,res) => {
  const {
    name, name_en, category, image, location,
    phone, google_map, rating, description
  } = req.body

  Resto.create({
    name: name,
    name_en: name_en,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    rating: rating,
    description: description
  })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// 進入首頁
app.get('/', (req, res) => {
  Resto.find()
  .lean()
  .then(restaurants => res.render('index', {restaurants}))
  .catch(error => console.log(error))
})

// 進入搜尋結果
app.get('/search', (req,res) => {
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

// 刪除一筆資料
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Resto.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 進入餐廳詳細資料
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Resto.findById(id)
  .lean()
  .then((restaurant) => res.render('show',{restaurant}))
  .catch(error => console.log(error))

})

// 進入餐廳編輯頁面

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Resto.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})

// 修改一筆資料
app.put('/restaurants/:id', (req, res) => {
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



// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})