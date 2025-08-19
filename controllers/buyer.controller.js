const mongoose = require('mongoose')
const Buyer = require("../models/buyer.model.js")
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function login(req, res) {
    try {
        let {email,password}=req.body
        if(!email||!password){
            return register.status(400).json({message:"Email and password are required"})  
        }
        else{
            let buyer = await Buyer.findOne({email:email})
            if(!buyer){
                return res.status(400).json({message:"Invalid email"})
            }
            else{
                let isValidPassword = await bycrypt.compare(password, buyer.password)
                if(!isValidPassword){
                    return res.status(400).json({message:"Invalid Password"})
                }
                else{
                    delete buyer._doc.password
                    let payload = {
                        name:buyer.name,
                        email:buyer.email,
                        phone:buyer.phone,
                        id:buyer._id,
                        type:"buyer"
                    }
                    let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'})

                    return res.status(200).json({message:"Login successfull", token:token, success:true})
                }
            }
        }
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",success:false})
    }
}
async function register(req, res) {
    try {
        let { name, email, password, cpassword, phone } = req.body
    if (!name || !email || !password || !cpassword || !phone) {
        return res.status(400).json({ message: "Please fill all fields", success: false })
    }
    else if (password !== cpassword) {
        return res.status(400).json({ message: "Password and confirm password are not same" })
    }
    else {
        let buyer = await Buyer.find({ $or: [{ email: email }, { phone: phone }] })
        if (buyer.length > 0) {
            return res.status(400).json({ message: "Email or phone already exist", success: false })
        }
        else{
            let hasshedPassword = await bycrypt.hash(password,10)
            if (phone.length!==10){
                return res.status(400).json({message:"Invalid phone number", success:false})
            }
            let newBuyer = await Buyer.create({
                name:name,
                email:email,
                password:hasshedPassword,
                phone:phone
            })
            delete newBuyer._doc.password
            return res.status(201).json({message:"Buyer Registered successfully" , success:true, newBuyer})
        }
    }
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",success:false})
    }
}


module.exports = {
    login,
    register
}