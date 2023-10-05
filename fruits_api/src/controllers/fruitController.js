const express = require("express");
const Fruit = require('../models/fruit');

const FruitMethods = {};

FruitMethods.allFruits = async (req, res) => {
    await Fruit.find({})
        .lean()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

FruitMethods.deleteFruit = async (req, res) => {
    await Fruit.findOneAndDelete({id: req.params.id})
        .lean()
        .then(() => res.status(200).json({message: "Eliminado exitosamente"}))
        .catch((error) => res.json({message: error}));
}

module.exports = FruitMethods;