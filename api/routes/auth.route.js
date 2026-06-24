const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// User creation post method
router.post("/register", upload.single('image'), async (req, res) => {
    try {
        const imgFile = req.file;
        const {username, email, password, role, first_name, last_name, tel, birthDate, country} = req.body
        console.log(req.body);

        const user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message: "User already exists"})
        }

        const hash = await bcrypt.hash(password, 10)

        const imgName = imgFile ? imgFile.filename : null;

        await User.create({username, email, password:hash, role, first_name, last_name, profile_picture:imgName, tel, birthDate, country})
        res.status(201).json({message: "User created"})
    } catch (err) {
        res.status(500).json({message:err})
    }
})

module.exports = router;