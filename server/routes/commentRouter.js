const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')

router.post('/create', commentController.create )
router.get('/',commentController.getAll )
router.get('/:id', commentController.getOne)

module.exports = router