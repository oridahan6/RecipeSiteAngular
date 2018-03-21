var fs = require('fs');
var csv = require('fast-csv');
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
var stream = fs.createReadStream('data-backup/' + type + 's.csv');


mongoose.connect('mongodb://localhost:27017/recipes', function (err) {
   if (err) throw err;
   console.log('Successfully connected');

   performAction();
});

var masterList = [];

function performAction() {

	// importObjet.resetCount(function(err, nextCount) {
	//     console.log("nextCount", nextCount);
	// });

	// read in CSV as stream row by row
	csv.fromStream(stream, {headers:true})
	    .on('data', function(data){
	      addToCollection(data);
	    })
	    .on('end', function(){
	    });

	function addToCollection(data){
		var object = new importObjet(data);

		importObjet.findOne({ name: object.name }).exec(function (err, foundObject) {
			if (err) {
				return console.log("err", err);	
			} 

			if (!foundObject) {
				
				//create model and save to database
				object.save(function (err) {
				    if (err) {
				    	console.log(err);
				    	return;
				    }
					console.log("Saved: " + object.name);
				});
			} else {
				console.log(object.name + " exists. Not saving,");
			}
			
		});

	}

}

