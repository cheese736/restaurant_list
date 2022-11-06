if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const restaurants = require('../../restaurant.json').results
const User = require('../user')
const Resto = require('../restaurant') // 載入 restaurant model
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurantsId: [1, 2, 3]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurantsId: [4, 5, 6]
  }
]

console.log(restaurants)
db.once('open', () => {
  Promise.all(SEED_USER.map(user => {
    const { email, password, restaurantsId } = user
    // console.log(user)
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        email,
        password: hash
      }))
      .then(user => {
      // console.log(user)
        const userId = user._id
        const fliteredRestaurant = restaurants.filter(resto => restaurantsId.includes(resto.id))
        fliteredRestaurant.forEach(resto => resto.userId = userId)
        return Resto.create(fliteredRestaurant)
      })
      .catch(err => console.log(err))
  }))
    .then(() => {
      console.log('seeds created successfully')
      process.exit()
    })
})

// 用 for 迴圈失敗
// db.once('open', () => {
//   bcrypt
//     .genSalt(10)
//     .then(salt => {
//       for (const seed_user of SEED_USER) {
//         console.log(seed_user)
//         bcrypt.hash(seed_user.password, salt)
//         .then(hash => {
//           User.create({
//           email: seed_user.email,
//           password: hash
//           })
//         })
//         .then(user => {
//           const userId = user._id
//           const restaurantsOfSeedUser = restaurants.results.filter(restaurant => {
//             seed_user.restaurants.include(restaurant.id)
//           })
//           Promise.all(Array.from(
//             {length: restaurantsOfSeedUser.length},
//             (_, i) => {
//               Resto.create({
//                 name: restaurantsOfSeedUser[i].name,
//                 name_en: restaurantsOfSeedUser[i].name_en,
//                 category: restaurantsOfSeedUser[i].category,
//                 image: restaurantsOfSeedUser[i].image,
//                 location: restaurantsOfSeedUser[i].location,
//                 phone: restaurantsOfSeedUser[i].phone,
//                 google_map: restaurantsOfSeedUser[i].google_map,
//                 rating: restaurantsOfSeedUser[i].rating,
//                 description: restaurantsOfSeedUser[i].description,
//                 userId
//               })
//             }
//           ))
//           })
//       }})
//     .then(() => {
//       console.log('seeds created successfully')
//       process.exit()
//     })
// })
