const mongoose = require('mongoose')
let Product = require('../models/product.model')


async function createProduct (req,res){
    try {
        let {name,description,category,price,brand,size} =req.body
        if(!name ||!description || !category || !price || !brand || !size) {
            return res.status(400).json({message:"Please fill all fields",success:false})
        }
        else{
            let newProduct = await Product.create({
                name:name,
                description:description,
                price:price,
                brand:brand,
                category:category,
                size:size
            })
            return res.status(201).json({message:"Product created successfully",success:true, product :newProduct})
        }
    } catch (error) {
        
        
        return res.status(500).json({ message: "Internal server error", success: false })
    }
}
async function allProduct (req,res){
    try {
        let products = await Product.find()
        return res.status(200).json({message:"All products",success:true,products: products})
    } catch (error) {
       return res.status(500).json({ message: "Internal server error", success: false }) 
    }

}
async function deleteProductById (req,res){
    try {
        let id = req.params.id
        let product = await Product.findByIdAndDelete(id)
        return res.status(200).json({message:"Product deleted successfuly",success:true})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false }) 
    }
}

module.exports ={
    createProduct,
    allProduct,
    deleteProductById
}