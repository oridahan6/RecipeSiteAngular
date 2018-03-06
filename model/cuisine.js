var mongoose = require('mongoose');

var cuisineSchema = mongoose.Schema({
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
}, { collection: "Cuisine" });

module.exports = mongoose.model('Cuisine', cuisineSchema);