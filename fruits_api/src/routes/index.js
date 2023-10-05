const express = require("express");
const router = express.Router();

router.get('/',async (req, res) => {
    res.redirect('/fruits');
});

router.get('/crud',async (req, res) => {
    res.redirect('/fruits');
});

module.exports = router;