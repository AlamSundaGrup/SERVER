const express = require('express')
const router = require('./routers')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})