const express = require('express')
const app = express();
const path = require('path') 
const mongoose = require('mongoose')
//step 8 
const methodOverride = require('method-override')

//step 1 do all ejs and express codes
//step 2 copy paste mongoose notes after
//step 3 create model folder  and product js
//step 4 - connect product.js
const Product = require('./models/product');
//end of step 4
//step 5 create a first data under seeds.js



//===== step 2
mongoose.connect('mongodb+srv://markosantos:Okram2061927@cluster0.lvulstr.mongodb.net/farmStand') //using Atlas cloud
// mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
    console.log('mongosh connection open!!')
})
.catch(err=>{
    console.log('mongosh connection error')
    console.log(err)
})
//=== end of step 2


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true})) //add in step 7 
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']

app.get('/', (req,res)=>{
    res.render('products/home')
})

//step 6 - after adding files setting up route following Rest
app.get('/products', async (req, res)=> {
    const { category } = req.query;
    // console.log(req.query)
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }

})
// step 7- product new and post route route
app.get('/products/new', (req, res) => {
    res.render('products/new', {categories})
})

app.post('/products', async (req, res) => {
    // console.log(req.body)
// res.send('making your product!!!')// to check if data can be parsed 
const newProduct = new Product(req.body)
await newProduct.save() // since we know that this will take time 
// console.log(newProduct)// checking product
// res.send(`adding a product`)//checking if product will add after this check db 
res.redirect(`/products/${newProduct._id}`)
})





//step 6.a product id route show per id
app.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id) //we can use product moongose crud 
    // console.log(fProduct) //after checking if the route is working and getting the product per id do the rendering
    // res.send('Details page')
    res.render('products/show', {product})
})

//step 8 update products
app.get('/products/:id/edit', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', {product, categories})
})


app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
    // console.log(req.body);
    // res.send('PUTT')// to check if connection is working

})

app.delete('/products/:id', async (req, res) => {
    // res.send('Delete endpoint working')
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')

})




app.listen(3000, ()=> {
    console.log('app is listening on port 3000')

})