const express = require('express');
const crypto = require('crypto');
const mime = require('mime');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
var fs = require('fs');

var multer = require('multer');
// var DIR = './uploads/';
var DIR = './src/assets/images/';
var storage = multer.diskStorage({
  destination: DIR,
  filename: function (req, file, cb) {
      	var fileName = file.originalname;
      	var counter = 0;
      	var isFilenameAvailable = false;
		var regex = /(.+)(\.\w+)$/;
		var matches = regex.exec(fileName);

		do {
		    fileName = matches[1] + (counter ? "-" + counter : "") + matches[2];
			if (!fs.existsSync("src/assets/images/" + fileName)) {
				isFilenameAvailable = true;
				break;
			}
			counter++;
		}
		while (!isFilenameAvailable);

      // console.log("req", req);
    crypto.pseudoRandomBytes(16, function (err, raw) {
      	// cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      	cb(null, fileName);
    });
  }
});
var upload = multer({ storage: storage });

var dbHelper = require('../db/helper');

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
	Recipe.
		find({}).
		populate('categories', "name").
		populate('cuisines', "name").
		populate('mainIngredients', "title").
		populate('directionMethods', "name").
		exec(function (err, recipes) {
		if (err) {
			res.json({success:false, message: `Failed to load all recipes. Error: ${err}`});
		}

		res.write(JSON.stringify({success: true, recipes: recipes},null,2));
		res.end();
	});
});

// Get Recipe with id
router.get('/recipe/:id', (req, res) => {
    var id = req.params.id;
	Recipe.
		findOne({_id: id}).
		populate('categories', "name").
		populate('cuisines', "name").
		populate('mainIngredients', "title").
		populate('directionMethods', "name").
		exec(function (err, recipe) {
		if (err) {
			res.json({success:false, message: `Failed to load recipe with id: ${id}. Error: ${err}`});
		}
		res.write(JSON.stringify({success: true, recipe: recipe},null,2));
		res.end();
	});
});

// Upload Images
router.post("/upload", upload.array("images", 12), function(req, res) {
	res.write(JSON.stringify({success: true, uploadedFiles: req.files},null,2));
    res.end();
});

// Save Recipe
router.post('/recipe', function(req, res, next) {
	Recipe.create(req.body, function (err, recipe) {
		if (err) {
			res.json({success:false, message: `Failed to save recipe. Error: ${err}`});
		}
		res.write(JSON.stringify({success: true, recipe: recipe},null,2));
        res.end();
	});
});

// Get Categories
router.get('/categories', (req, res) => {
	dbHelper.createResponseFromDocs("categories", Category, "name", res);
});

// Get Units
router.get('/units', (req, res) => {
	dbHelper.createResponseFromDocs("units", Unit, "name", res);
});

// Get Cuisines
router.get('/cuisines', (req, res) => {
	dbHelper.createResponseFromDocs("cuisines", Cuisine, "name", res);
});

// Get Main Ingredients
router.get('/main-ingredients', (req, res) => {
	dbHelper.createResponseFromDocs("mainIngredients", MainIngredient, "title", res);
});

// Get Direction Methods
router.get('/direction-methods', (req, res) => {
	dbHelper.createResponseFromDocs("directionMethods", DirectionMethod, "name", res);
});

module.exports = router;