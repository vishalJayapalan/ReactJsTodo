const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  taskName: { type: String, required: true },
  checked: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  notes: { type: String }
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task
