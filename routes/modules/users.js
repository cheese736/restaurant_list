const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bycrypt = require('bcryptjs')

// GET登入頁
router.get('/login', (req,res) => {
  res.render('login')
})

// 提交登入資訊
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//  GET 註冊頁
router.get('/register', (req,res) => {
  res.render('register')
})

// 提交註冊資訊
router.post('/register', (req,res) => {
  const {
    name, email, password, confirmPassword
  } = req.body
  const errors = []

  if ( [email,password,confirmPassword].includes('')) {
    errors.push({message: '所有欄位都是必填。'})
  }

  if (password !== confirmPassword) {
    errors.push({message: '密碼與確認密碼不相符'})
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
    
  }

  User.findOne({email})
  .then(user => {
    if (user) {
      errors.push({message: '此email已註冊'})
      // 檢查email是否已註冊，若是，回到填寫頁面，保持輸入資訊
      console.log('Operation failed: email has been used.')
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
      // 若否，寫入資料庫
    } else {
      return bycrypt.genSalt(10)
      .then(salt => bycrypt.hash(password,salt))
      .then(hash => {
      User.create({
        name,
        email,
        password: hash
        })
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router