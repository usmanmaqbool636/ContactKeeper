const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

router.post('/', [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail().withMessage("please enter valid email"),
    check("password", "please enter password with 5 or more characters").isLength({
        min: 5
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(user);
        if (user) {
            return res.status(400).json({ msg: "user already exists" });
        }
        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
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
        // return res.status(200).json(user);
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("server error")
    }

})

module.exports = router