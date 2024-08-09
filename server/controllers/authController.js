const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { promisify } = require('util')

const signToken = (id, username, email, role) => {
  return jwt.sign({ id, username, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = (user, status, res) => {
  const { _id, username, email, role } = user
  const token = signToken(_id, username, email, role)

  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: false,
    secure: false,
  }

  //   Send token to brower
  res.cookie('jwt', token, cookieOptions)

  // Clear fill password before response to client
  user.password = undefined

  res.status(status).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

// ---------------- SIGN UP ------------------
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm, role } = req.body
    const newUser = await User.create({
      username,
      email,
      password,
      passwordConfirm,
      role,
    })
    createSendToken(newUser, 201, res)
  } catch (error) {
    if (error.status === 11000) {
      console.log('Lỗi: Tên đăng nhập hoặc email đã tồn tại.')
    }
    res.status(400).json({
      message: error,
    })
  }
}

// ---------------- LOGIN ------------------
exports.login = async (req, res, next) => {
  // Check email, check password
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({
      message: 'Please provide email or password',
    })
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      message: 'Incorrect email or password',
    })
  }
  console.log(user)

  //   If everything ok then send cookie to client
  createSendToken(user, 200, res)
}

// ---------------- PROTECT ------------------
exports.protect = async (req, res, next) => {
  // Getting token
  const token = req.cookies.jwt

  if (!token) {
    res.status(401).json({
      message: 'You are not logged in! Please log in to get access',
    })
  }

  // Verification token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  //   Check if user still exist
  const currentUser = await User.findById(decode.id)
  console.log(currentUser)
  if (!currentUser) {
    res.status(401).json({
      message: 'The user belong to this token does no longer exist',
    })
  }

  //   Check if user change password after the token was issued

  //   Grant Access to protected route
  req.user = currentUser
  next()
}

// ---------------- RESTRICT TO ------------------
exports.restrictTo = (...role) => {
  return (req, res, next) => {
    console.log(role)
    console.log(req.role)
    if (!role.includes(req.user.role)) {
      res.status(403).json({
        message: 'You do not have permission to perform this action',
      })
    } else {
      next()
    }
  }
}
