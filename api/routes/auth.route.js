const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User creation post method
router.post("/register", async (req, res) => {
    try {
        const {username, email, password, role, first_name, last_name, profile_picture, tel, birthDate, country} = req.body
        console.log(req.body);

        const user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message: "User already exists"})
        }

        const hash = await bcrypt.hash(password, 10)

        await User.create({username, email, password:hash, role, first_name, last_name, profile_picture, tel, birthDate, country})
        res.status(201).json({message: "User created"})
    } catch (err) {
        res.status(500).json({message:err})
    }
})

module.exports = router;