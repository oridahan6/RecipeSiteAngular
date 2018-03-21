var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipe = require('../../model/recipe.js');
var Category = require('../../model/category.js');
var Unit = require('../../model/unit.js');
var Cuisine = require('../../model/cuisine.js');
var MainIngredient = require('../../model/mainIngredient.js');
var DirectionMethod = require('../../model/directionMethod.js');

var type = process.argv[2];

var importObjet = require('../../model/' + type + '.js');

mongoose.connect('mongodb://localhost:27017/recipes', function (err) {
   if (err) throw err;
   console.log('Successfully connected');

   performAction();
});

function performAction() {

	importObjet.deleteMany({}, function(err){});

	importObjet.resetCount(function(err, nextCount) {
	    console.log("nextCount", nextCount);
	});

}

