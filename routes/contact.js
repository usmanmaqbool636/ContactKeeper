const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');

const { check, validationResult } = require('express-validator');
const { auth } = require('../middlewares/auth');
router.use(auth);
router.get('/', async (req, res) => {
    try {
        let contact = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        return res.status(200).json(contact);
    }
    catch (err) {
        return res.status(500).send("Server Error");
    }
})


router.post('/', [
    check("name", "name is required").not().isEmpty(),
    check("email", "please enter valid email").isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const { name, email, phone, type } = req.body;
    try {
        const newContact = new Contact({
            email, phone, type, name, user: req.user.id
        })
        const contact = await newContact.save();
        return res.status(200).json(contact);
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send("Server Error");
    }
})


router.put('/', async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({ msg: "contact Updated" });
    }
    catch (err) {
        res.status(500).json({
            msg: "Internal server Error"
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "contact deleted", id: req.params.id });
    }
    catch (err) {
        res.status(500).json({
            msg: "Internal server Error"
        })
    }
})

module.exports = router