const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const { auth } = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById("5ebc2c1045a4b60d58836f54").select({ password: 0 });
        return res.status(200).json(user);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
    }

    res.send("get loged in user");
})

router.post('/', [
    check("email","please enter valid email").isEmail(),
    // check('email').isEmail().withMessage("please enter valid email"),
    check("password", "password is required")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            return res.status(200).json({
                token
            })
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})
module.exports = router