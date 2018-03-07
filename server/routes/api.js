const express = require('express');
const crypto = require('crypto');
const mime = require('mime');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

var multer = require('multer');
var DIR = './uploads/';
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      	cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      	// cb(null, file.originalname);
    });
  }
});
var upload = multer({ storage: storage });

var mongoose = require('mongoose');
var Recipe = require('../../model/recipe.js');
var Category = require('../../model/category.js');
var Unit = require('../../model/unit.js');
var Cuisine = require('../../model/cuisine.js');
var MainIngredient = require('../../model/mainIngredient.js');
var DirectionMethod = require('../../model/directionMethod.js');

mongoose.connect('mongodb://localhost:27017/recipes', function (err) {
   if (err) throw err;
   console.log('Successfully connected');
});

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get Recipes
router.get('/recipes', (req, res) => {
	Recipe.find(function (err, recipes) {
		if (err) return next(err);
		res.json(recipes);
  	});
});

// Upload Images
router.post("/upload", upload.array("images", 12), function(req, res) {
	res.write(JSON.stringify({success: true, uploadedFiles: req.files},null,2));
    res.end();
});

// Save Recipe
router.post('/recipe', function(req, res, next) {
	Recipe.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

// Get Categories
router.get('/categories', (req, res) => {
	Category.find(function (err, categories) {
		if (err) {
			res.json({success:false, message: `Failed to load all categories. Error: ${err}`});
		}
		res.write(JSON.stringify({success: true, categories: categories},null,2));
        res.end();
  	});
});

// Get Units
router.get('/units', (req, res) => {
	Unit.find(function (err, units) {
		if (err) {
			res.json({success:false, message: `Failed to load all units. Error: ${err}`});
		}
		res.write(JSON.stringify({success: true, units: units},null,2));
        res.end();
  	});
});

// Get Cuisines
router.get('/cuisines', (req, res) => {
	Cuisine.find(function (err, cuisines) {
		if (err) {
			res.json({success:false, message: `Failed to load all cuisines. Error: ${err}`});
		}
		res.write(JSON.stringify({success: true, cuisines: cuisines},null,2));
        res.end();
  	});
});

// Get Main Ingredients
router.get('/main-ingredients', (req, res) => {
	MainIngredient.find(function (err, mainIngredients) {
		if (err) {
			res.json({success:false, message: `Failed to load all main ingredients. Error: ${err}`});
		}
		res.write(JSON.stringify({success: true, mainIngredients: mainIngredients},null,2));
        res.end();
  	});
});

// Get Direction Methods
router.get('/direction-methods', (req, res) => {
	DirectionMethod.find(function (err, directionMethods) {
		if (err) {
			res.json({success:false, message: `Failed to load all direction methods. Error: ${err}`});
		}
		res.write(JSON.stringify({success: true, directionMethods: directionMethods},null,2));
        res.end();
  	});
});

module.exports = router;