const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/', (req, res) => {
  let todos = fs.readFileSync('../Todos.json', 'utf8')
  todos = JSON.parse(todos)
  res.send(todos)
  return
})

app.post('/add', (req, res) => {
  let todos = fs.readFileSync('../Todos.json', 'utf8')
  todos = JSON.parse(todos)
  let req_body = req.body
  todos.unshift(req_body)
  fs.writeFileSync('../Todos.json', JSON.stringify(todos, null, 2), 'utf8')
  res.send(todos)
  return
})
app.post('/delete', (req, res) => {
  let req_body = req.body
  fs.writeFileSync('../Todos.json', JSON.stringify(req_body, null, 2), 'utf8')
})
app.post('/done', (req, res) => {
  let req_body = req.body
  fs.writeFileSync('../Todos.json', JSON.stringify(req_body, null, 2), 'utf8')
})
app.post('/check', (req, res) => {
  let req_body = req.body
  fs.writeFileSync('../Todos.json', JSON.stringify(req_body, null, 2), 'utf8')
})

app.listen(4000, () => {
  console.log('Started in http://localhost:4000')
})
