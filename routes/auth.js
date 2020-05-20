const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const { auth } = require('../middlewares/auth');

router.post("/sociallogin", async (req, res) => {
    var user;
    const Providers = ['Facebook', 'Google']
    if (!Providers.includes(req.body.provider)) {
        return res.status(400).send("Unknown Provider");
    }

    try {
        if (req.body.provider === "Facebook") {
            user = await User.findOne({ facebookId: req.body.id });
            if (user !== null) {
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(payload, process.env.JWTSECRET, {
                    expiresIn: 360000
                }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token
                    })
                })
            }
            else {
                const { name, email, id, picture, provider } = req.body;
                user = await User.findOne({ email: email });
                if (user) {
                    return res.status(409).send("Email alredy Exits")
                }
                user = new User({ name, email, facebookId: id, provider })
                await user.save()
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(payload, process.env.JWTSECRET, {
                    expiresIn: 360000
                }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token
                    })
                })
            }
        }
        else {
            user = await User.findOne({ googleId: req.body.googleId });
            if (user !== null) {
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(payload, process.env.JWTSECRET, {
                    expiresIn: 360000
                }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token
                    })
                })
            }
            else {
                const { name, email, googleId, imageUrl, provider } = req.body;
                user = await User.findOne({ email: email });
                if (user) {
                    return res.status(409).send("Email alredy Exits")
                }
                user = new User({ name, email, googleId, provider, picture: imageUrl })
                await user.save()
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(payload, process.env.JWTSECRET, {
                    expiresIn: 360000
                }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token
                    })
                })
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send("server error")
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select({ password: 0 });
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).send("Server Error");
    }
})

router.post('/', [
    check("email", "please enter valid email").isEmail(),
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
            return res.status(400).send("Invalid Credentials")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid Credentials")
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            return res.status(200).json({
                token
            })
        })
    }
    catch (error) {
        res.status(500).send("Server Error")
    }
})
module.exports = router