const express = require('express')
const Router = express.Router()

const listController = require('../controllers/list.controller')

Router.post('/', listController.createList)

Router.get('/', listController.getLists)

Router.delete('/:listId', listController.deleteList)

Router.put('/:listId', listController.updateList)

// Router.get('/', listController.searchLists)

module.exports = Router
