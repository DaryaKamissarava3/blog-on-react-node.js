const {Post} = require('../models/models')
const ApiError = require('../error/ApiError');

class PostController {
  async create(req, res, next) {
    try {
      let {title, textIn, tags, createdAt, userId} = req.body
      const post = await Post.create({title, textIn, tags, createdAt, userId});
      return res.json(post)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let {userId, commentId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let posts;
    if (!userId && !commentId) {
      posts = await Post.findAndCountAll({limit, offset})
    }
    if (userId && !commentId) {
      posts = await Post.findAndCountAll({where: {userId}, limit, offset})
    }
    if (!userId && commentId) {
      posts = await Post.findAndCountAll({where: {commentId}, limit, offset})
    }
    if (userId && commentId) {
      posts = await Post.findAndCountAll({where: {userId, commentId}, limit, offset})
    }
    return res.json(posts)
  }

  async getOne(req, res) {
    const {id} = req.params
    const post = await Post.findOne(
      {
        where: {id},
      },
    )
    return res.json(post)

  }
}

module.exports = new PostController()