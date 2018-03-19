var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/recipes");
autoIncrement.initialize(connection);

var unitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    plural: Boolean,
    created: { 
        type: Date,
        default: Date.now
    },
    updated: { 
        type: Date,
        default: Date.now
    }
}, { collection: "Unit" });

//Auto-increment
unitSchema.plugin(autoIncrement.plugin, { model: 'Unit', startAt: 1 });

module.exports = mongoose.model('Unit', unitSchema);