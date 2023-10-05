const express = require("express");
const router = express.Router();

const Fruit = require('../models/fruit');
const FruitController = require('../controllers/fruitController')

router.get('/fruits', FruitController.allFruits);

router.delete('/fruits/delete/:id', FruitController.deleteFruit)

module.exports = router;