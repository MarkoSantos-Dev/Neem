//step 1 -require mongoose -this where we will create the sschema for the product
const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable','dairy']
    }
    //end of step 1 
})



//step 1.a - compile our mmodel
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
//end of step1.a