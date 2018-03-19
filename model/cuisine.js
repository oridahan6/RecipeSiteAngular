var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/recipes");
autoIncrement.initialize(connection);

var cuisineSchema = mongoose.Schema({
    _id: Number,
    name: String,
    created: { 
        type: Date,
        default: Date.now
    },
    updated: { 
        type: Date,
        default: Date.now
    }
}, { collection: "Cuisine" });

//Auto-increment
cuisineSchema.plugin(autoIncrement.plugin, { model: 'Cuisine', startAt: 1 });

module.exports = mongoose.model('Cuisine', cuisineSchema);