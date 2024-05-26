const express = require('express')
const prisma = require('../db')
const { getAllProducts, getProductById, createNewProduct, deleteProductById, updateProductById } = require('./product.service')

const router = express.Router()

router.get('/', async (req, res) => {
    const products =  await getAllProducts()

    res.send(products)
})

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id

        const product = await getProductById(parseInt(productId))

        res.send(product)   
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const newProductData = req.body 

        const product = await createNewProduct(newProductData)
    
        res.status(201).send({
            data: product,
            message: "A new product was successfully created."
        })
    } catch (error) {
        res.send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id
    
        await deleteProductById(parseInt(productId))
    
        res.send("Product was successfully deleted")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const productData = req.body
    
        if(!(productData.name && productData.price && productData.description && productData.image)){
            return res.status(400).send("Some fields are missing!")
        }
    
        const product = await updateProductById(parseInt(productId), productData)
    
        res.send({
            data: product,
            message: "Product data was successfully updated"
        }) 
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const productData = req.body
    
        const product = await updateProductById(parseInt(productId), productData)
        res.send({
            data: product,
            message: "Product data was successfully updated"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router