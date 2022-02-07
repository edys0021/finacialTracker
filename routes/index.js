const router = require('express').Router()
const UserController = require('../controllers/controllerUser')
const DataController = require('../controllers/controllerData')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/users', UserController.listUser)
router.get('/users/:id', UserController.listbyId)
router.use(authentication)
router.post('/expenditure', DataController.createExpenditure)


module.exports = router

