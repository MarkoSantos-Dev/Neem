//seeding of database for dev purpose and to add data to db without affecting files and express.

const mongoose = require('mongoose')
const Product = require('./models/product');
// mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
mongoose.connect('mongodb+srv://markosantos:Okram2061927@cluster0.lvulstr.mongodb.net/farmStand')
.then(()=>{
    console.log('mongosh connection open!!')
})
.catch(err=>{
    console.log('mongosh connection error')
    console.log(err)
})
// step 1
// const p = new Product({
//     name: 'Grapefruit',
//     price: 100,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

    //run node seeds.js and check mongosh if data is added
// end of step 1

// step 2  insert Many data
const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

// make sure the seedProducts follows the validation inputed in the schema or else all will fails
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

    // end of step 2