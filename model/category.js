var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    imageName: String,
    recipesCount: Number,
    displayOrder: Number,
    created: { 
        type: Date,
        default: Date.now
    },
    updated: { 
        type: Date,
        default: Date.now
    }
}, { collection: "Category" });

module.exports = mongoose.model('Category', categorySchema);