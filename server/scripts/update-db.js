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

// reset counter
Recipe.nextCount(function(err, count) {
    console.log("count", count);

});
Recipe.resetCount(function(err, nextCount) {
    
    console.log("nextCount", nextCount);

});

// var data = [ {
//      name: 'גרם',
//      plural: false },
//    {
//      name: 'כפית',
//      plural: false },
//    {
//      name: 'כפיות',
//      plural: true },
//    {
//      name: 'כף',
//      plural: false },
//    {
//      name: 'כפות',
//      plural: true },
//    {
//      name: 'כוס',
//      plural: false },
//    {
//      name: 'כוסות',
//      plural: true },
//    {
//      name: 'קופסא',
//      plural: false },
//    {
//      name: 'קופסאות',
//      plural: true },
//    {
//      name: 'גביע',
//      plural: false },
//    {
//      name: 'גביעי',
//      plural: true },
//    {
//      name: 'גביעים',
//      plural: true },
//    {
//      name: 'חבילה',
//      plural: false },
//    {
//      name: 'חבילות',
//      plural: true },
//    {
//      name: 'חבילת',
//      plural: false },
//    {
//      name: 'מ"ל',
//      plural: false } ];

// for (var i = data.length - 1; i >= 0; i--) {
// 	console.log('data[i]',data[i]);
// 	Unit.create(data[i], function (err, obj) {
// 		console.log("obj", obj);

// 		if (err) {
// 			console.log('err',err);
// 			// process.exit();
// 		}
// 	});
// }
// process.exit();