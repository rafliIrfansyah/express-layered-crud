//Service layer ditujukan untuk handle business logic

const { findProducts, findProductById, insertProduct, deleteProduct, updateProduct } = require("./product.repository")


const getAllProducts = async () => {
    const products = await findProducts()
    
    return products
}

const getProductById = async (id) => {
    const product = await findProductById(id)

    if(!product){
        throw new Error("Product doesn't exist")
    }

    return product
}

const createNewProduct = async (newProductData) => {
    const product = await insertProduct(newProductData)

    return product
}

const deleteProductById = async (id) => {
    await getProductById(id)
    await deleteProduct(id)
}

const updateProductById = async (id, productData) => {
    const product = await updateProduct(id, productData)

    return product
}

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    deleteProductById,
    updateProductById
}