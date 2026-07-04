const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const verifyToken = require('../middleware/verifyToken');

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
        const {username, email, password, role, first_name, last_name, tel, birthDate} = req.body
        console.log(req.body);

        const user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message: "User already exists"})
        }

        const hash = await bcrypt.hash(password, 10)

        const imgName = imgFile ? imgFile.filename : null;

        await User.create({username, email, password:hash, role, first_name, last_name, profile_picture:imgName, tel, birthDate})
        res.status(201).json({message: "User created"})
    } catch (err) {
        res.status(500).json({message:err})
    }
})

router.post('/login-cookie', async (req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body
        
        if (!username || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" })
        }

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: "Identifiants invalides" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Identifiants invalides" })
        }

        // Préparation des données publiques de l'utilisateur à inclure dans le token (Payload)
        const userPayload = { id: user._id, username: user.username, role: user.role };
        
        // Génération du JWT (ici configuré pour expirer après 4 heures '4h')
        const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '4h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        return res.status(200).json({
            message: "Connexion réussie",
            user: userPayload
        });
        
    } catch (err) {
        // En cas de plantage du serveur ou de la BDD
        console.log(err)
        return res.status(500).json({ message: err.message || err })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })
    return res.status(200).json({message: "Disconnected"})
})


router.get('/admin', verifyToken, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({message: "Access forbidden"})
    }
})

router.get('/me', verifyToken, (req, res) => {
    return res.status(200).json({ user: req.user });
})

module.exports = router;