const mongoose = require('mongoose')
const TaskSchema = require('./tasks.model')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  id: { type: Number, required: true },
  listName: { type: String, required: true }
  // tasks: []
  // tasks: [TaskSchema]
})

const List = mongoose.model('List', ListSchema)
module.exports = List
