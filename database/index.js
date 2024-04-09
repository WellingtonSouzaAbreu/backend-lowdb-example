import database from './config.js'

function saveNewProduct(name, price){
    // Gera um id aleatório. Dá pra melhorar isso
    const randomId = `${Math.floor(Math.random() * 1000)}`
    const newProduct = { id: randomId, name, price }

    database.data.products.push(newProduct)
    database.write()
    
    return newProduct
}


function updateProduct(id, name, price){
    const updatedData = { id, name, price }
    const storedProducts = database.data.products

    const updatedProducts = storedProducts.map(product => {
        if(product.id == id){
            return updatedData
        }
        return product
    })

    database.data.products = updatedProducts
    database.write()
    
    return updatedData
}


function getProductById(productId){
    // Utilizando template string para garantir que os tenham o mesmo tipo para fazer a comparação
    const productData =  database.data.products.find(product => `${product.id}` == `${productId}`)
    return productData
}

function getProducts(){
    const products =  database.data.products
    return products
}

function deleteProduct(productId){
    const storedProducts = database.data.products
    const updatedProducts = storedProducts.filter(product => product.id !== productId)

    database.data.products = updatedProducts
    database.write()
}

const databaseMethods = {
    saveNewProduct,
    updateProduct,
    getProductById,
    getProducts,
    deleteProduct
}


export default databaseMethods