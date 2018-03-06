var mongoose = require('mongoose');

var directionMethodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('DirectionMethod', directionMethodSchema);