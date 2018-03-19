var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/recipes");
autoIncrement.initialize(connection);

var categorySchema = mongoose.Schema({
    _id: Number,
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

//Auto-increment
categorySchema.plugin(autoIncrement.plugin, { model: 'Category', startAt: 1 });

module.exports = mongoose.model('Category', categorySchema);