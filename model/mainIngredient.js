var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/recipes");
autoIncrement.initialize(connection);

var mainIngredientSchema = mongoose.Schema({
    _id: Number,
    title: String,
    created: { 
        type: Date,
        default: Date.now
    },
    updated: { 
        type: Date,
        default: Date.now
    }
}, { collection: "MainIngredient" });

//Auto-increment
mainIngredientSchema.plugin(autoIncrement.plugin, { model: 'MainIngredient', startAt: 1 });

module.exports = mongoose.model('MainIngredient', mainIngredientSchema);