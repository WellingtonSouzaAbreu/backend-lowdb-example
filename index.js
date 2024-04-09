
/* 
    INSTRUÇÕES

    Dá um "npm install" na pasta para instalar as dependências
    "npm run start" para iniciar o servidor

    Biblioteca para utilizar um arquivo como banco de dados
     - lowdb 
     - lodash-id
*/

/* 
    ECMA Script

    Adicionei a primeira linha ao "package.json" para utilizar o "import e export" contendo:
    "type": "module"
*/

/* 
    REQUEST - configure o objeto no postman em "body" / "raw" / "JSON" :
    {
        "nome": "mesa usada",
        "preco": 2500
    }    

    Rotas disponíveis:
    [POST] /produto - para cadastrar um novo produto
    [PUT] /produto/id - para editar um produto
    [GET] /produto - para buscar todos os produtos
    [GET] /produto/:id - para buscar um produto específico pelo ID
    [DELETE] /produto/:id - para deletar um produto

*/

import express from 'express'
const app = express()

import databaseMethods from './database/index.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/produto', (req, res) => {
    const { nome, preco} = req.body
    
    const productSaved = databaseMethods.saveNewProduct(nome, preco)
    
    res.status(200).send(productSaved)
})

app.put('/produto/:id', (req, res) => {
    const { nome, preco} = req.body
    const productIdToUpdate = req.params.id
    
    const productUpdated = databaseMethods.updateProduct(productIdToUpdate, nome, preco)
    
    res.status(200).send(productUpdated)
})

app.get('/produto', (req, res) => {    
    const allProducts = databaseMethods.getProducts()
    
    if(allProducts && allProducts.length){
        return res.status(200).send(allProducts)
    }
    
    res.status(200).send('Não há nenhum produto cadastrado!')
})

app.get('/produto/:id', (req, res) => {    
    const productIdToSearch = req.params.id
    const productData = databaseMethods.getProductById(productIdToSearch)

    if(productData){
        return res.status(200).send(productData)
    }
    
    res.status(200).send('Não foi encontrado nenhum produto com esse ID!')
})

app.delete('/produto/:id', (req, res) => {
    const productIdToUpdate = req.params.id
    databaseMethods.deleteProduct(productIdToUpdate)

    res.status(200).send("Produto deletado com sucesso!")
})

app.get('/', (req, res) => {
    res.status(200).send({message: 'Rota inicial! Ela não faz nada haha!'})
})

const porta = 3003

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}.`)
})