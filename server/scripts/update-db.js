// Go to root folder -> run -> node server/scripts/update-db.js

const ObjectID = require('mongodb').ObjectID;

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
