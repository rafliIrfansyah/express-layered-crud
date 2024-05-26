const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
const productController = require('./product/product.controller')

app.use('/products', productController)

app.listen(PORT, () => {
    console.log("Express API running in port " + PORT)
})