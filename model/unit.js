var mongoose = require('mongoose');

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

module.exports = mongoose.model('Unit', unitSchema);