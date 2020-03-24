const router = require('express').Router()
// const mongoose = require('mongoose')

// const router = express.Router()

// const express = require('express')
const mongoose = require('mongoose')

const List = mongoose.model('List')

// const List = require('../models/lists.model')

router.get('/', (req, res) => {
  List.find()
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: ' + err))
})

// router.post('/', (req, res) => {
//   const list = new List()
//   console.log(list)
//   list.id = req.body.id
//   list.listname = req.body.listname
//   list.tasks = []
//   //   list.tasks.push(...req.body.tasks)
//   list
//     .save()
//     .then(() => res.json('list added!'))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

// router.put('/:id', (req, res) => {
//   const { listName } = req.body
//   List.findById(req.params.id)
//     .then(list => {
//       list.listName = listName
//       list
//         .save()
//         .then(() => res.json('list updated!'))
//         .catch(err => res.status(400).json('Error: ' + err))
//     })
//     .catch(err => res.status(400).json('Error: ' + err))
// })

// router.delete('/:id', (req, res) => {
//   List.findByIdAndDelete(req.params.id)
//     .then(() => res.json('List Deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

module.exports = router
