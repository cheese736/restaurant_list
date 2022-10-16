// require packages used in the project
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Resto = require('./models/restaurant') 
const routes = require('./routes')
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

// 進入首頁
app.use(routes)


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})