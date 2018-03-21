fs = require('fs');
csv = require('fast-csv');
mongoose = require('mongoose');
Schema = mongoose.Schema;

Recipe = require('../../model/recipe.js');

type = process.argv[2];

acceptableTypes = [
	"unit",
	"category",
	"mainIngredient",
	"directionMethod",
	"cuisine"
];

if (acceptableTypes.indexOf(type) === -1){
	console.log(type + ' is not allowed. Acceptable types: \n' + acceptableTypes.join("\n"));
	process.exit();
}

importObjet = require('../../model/' + type + '.js');
