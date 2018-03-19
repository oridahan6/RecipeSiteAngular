var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/recipes");
autoIncrement.initialize(connection);

var directionMethodSchema = mongoose.Schema({
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
}, { collection: "DirectionMethod" });

//Auto-increment
directionMethodSchema.plugin(autoIncrement.plugin, { model: 'DirectionMethod', startAt: 1 });

module.exports = mongoose.model('DirectionMethod', directionMethodSchema);