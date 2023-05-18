const ApiError = require('../error/ApiError');
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, fullName, avatarUrl) => {
  return jwt.sign(
    {id, email, fullName, avatarUrl},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const {email, password, fullName, avatarUrl} = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, password: hashPassword, fullName, avatarUrl})
    const token = generateJwt(user.id, user.email, user.fullName, user.avatarUrl)
    return res.json({token})
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal('Авторизация не удалась('))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Авторизация не удалась('))
    }
    const token = generateJwt(user.id, user.email, user.fullName, user.avatarUrl)
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email)
    return res.json({token})
  }

  async getAllUsers(req, res) {
    const users = await User.findAll()
    return res.json(users)
  }

  async getOneUser(req, res) {
    //const token = req.body
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const decodeJwt = jwt.verify(token, process.env.SECRET_KEY)
    console.log(decodeJwt)
   const user = await User.findByPk(decodeJwt.id)

    return res.json(user)
  }
}

module.exports = new UserController()