const mongoose = require('mongoose')
const {Schema} = mongoose

let sellerSchema = new Schema(
    {
        name:{
            type: String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:String,
            required:true,
            unique:true,
        },
        address:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            min:8
        },
        products:[
            {
                type:Schema.Types.ObjectId,
                ref:'Product'
        }
        ]

    }
)

module.exports = mongoose.model('Seller',sellerSchema)