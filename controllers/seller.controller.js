const mongoose = require('mongoose')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Seller = require('../models/seller.model')

async function login(req, res) {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email or password is required" })
        }
        else {
            let seller = await Seller.findOne({ email: email })
            if (!seller) {
                return res.status(400).json({ message: "Invalid Email", success: false })
            }
            else {
                let isValidPassword = await bycrypt.compare(password, seller.password)
                if (!isValidPassword) {
                    return res.status(400).json({ message: "Invalid Password",success:false })
                }
                else {
                    delete seller._doc.password
                    let payload = {
                        name: seller.name,
                        email: seller.email,
                        phone: seller.phone,
                        id: seller._id,
                        type:"seller"
                    }
                    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

                    return res.status(200).json({ message: "Login successfull", token: token, success: true })
                }
            }
        }
    }
        catch (error) {
            return res.status(500).json({ message: "Internal server error", success: false })

        }
    }
        async function register(req, res) {
            try {
                let { name, email, phone, password, cpassword, address } = req.body
                if (!name || !email || !phone || !password || !cpassword || !address) {
                    return res.status(400).json({ message: "Please fill all fields", success: false })
                }
                else if (password !== cpassword) {
                    return res.status(400).json({ message: "Password and confirm password are not same" })
                }
                else {
                    let seller = await Seller.find({ $or: [{ email: email }, { phone: phone }] })
                    if (seller.length > 0) {
                        return res.status(400).json({ message: "Email or phone already exist", success: false })
                    }
                    else {
                        let hasshedPassword = await bycrypt.hash(password, 10)
                        if (phone.length !== 10) {
                            return res.status(400).json({ message: "Invalid phone number", success: false })
                        }
                        let newSeller = await Seller.create({
                            name: name,
                            phone: phone,
                            email: email,
                            password: hasshedPassword,
                            address: address
                        })
                        delete newSeller._doc.password
                        return res.status(201).json({ message: "Registered Successfully", success: true })
                    }
                }
            } catch (error) {


                return res.status(500).json({ message: "Internal server error", success: false })
            }
        }


        module.exports = {
            login,
            register
        }