var mongoose = require('mongoose');

var mainIngredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('MainIngredient', mainIngredientSchema);