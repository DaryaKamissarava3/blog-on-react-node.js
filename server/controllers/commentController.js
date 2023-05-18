const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError');

class CommentController {
  async create(req, res, next) {
    try {
      let {name, userId, postId} = req.body
      const comment = await Comment.create({name, userId, postId});
      return res.json(comment)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const comments = await Comment.findAll()
    return res.json(comments)
  }

  async getOne(req, res) {
    const {id} = req.params
    const comment = await Comment.findOne(
      {
        where: {id},
      },
    )
    return res.json(comment)

  }

}

module.exports = new CommentController()