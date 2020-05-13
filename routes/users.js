const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send("register a user");
})
module.exports = router