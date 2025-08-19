const mongoose = require('mongoose')
const {Schema} = mongoose
let productSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        category:{
            enum:['Men','Women','Kids','Others'],
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
        size:{
            type:String,
            required:true
        }

    }
)

module.exports = mongoose.model("Product",productSchema)