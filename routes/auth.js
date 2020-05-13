const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

router.get('/', (req, res) => {
    res.send("get loged in user");
})

router.post('/', [
    check("email").custom(value=>{
        if(!value){
            return Promise.reject("email is required");
        }
        if(check(value).isEmail())
        {
            return Promise.reject("please enter Valid Email");
        }
    }),
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