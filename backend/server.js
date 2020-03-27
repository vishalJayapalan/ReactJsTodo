const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const listRoutes = require('./routes/list.routes')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// app.use((req, res, next) => {
//   res.send('<h1>Test Page</h1>')
// })

app.use('/list', listRoutes)

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established succesfully')
})

// const routes = require('./routes/index.routes')

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
