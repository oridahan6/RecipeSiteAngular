var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/recipes");
autoIncrement.initialize(connection);

var recipeSchema = mongoose.Schema({
    title: String,
    ingredients: Schema.Types.Mixed,
    directions: Schema.Types.Mixed,
    categories: [{ 
        type: Number, 
        ref: 'Category'
    }],
    images: [String],
    prepTime: Number,
	cookTime: Number,
	level: String,
    kosherType: String,
    cuisines: [{ 
        type: Number, 
        ref: 'Cuisine'
    }],
    mainIngredients: [{ 
        type: Number, 
        ref: 'MainIngredient'
    }],
    directionMethods: [{ 
        type: Number, 
        ref: 'DirectionMethod'
    }],
    created: { 
        type: Date,
        default: Date.now
    },
    updated: { 
        type: Date,
        default: Date.now
    }
}, { collection: "Recipe" });

//Auto-increment
recipeSchema.plugin(autoIncrement.plugin, { model: 'Recipe', startAt: 1 });

module.exports = mongoose.model('Recipe', recipeSchema);

/*
	add dates:
	date: { type: Date, default: Date.now },

	categories: { 
	        type: [mongoose.Schema.Types.ObjectId], 
	        ref: 'Category'
	    },

	thumbnail: Buffer,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Author'
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStamainIngredientsrs: Number,
            created: { 
                type: Date,
                default: Date.now
            }
        }
    ],

*/