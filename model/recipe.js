var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = mongoose.Schema({
    title: String,
    ingredients: Schema.Types.Mixed,
    directions: Schema.Types.Mixed,
    categories: { 
        type: [Schema.Types.ObjectId], 
        ref: 'Category'
    },
    prepTime: Number,
	cookTime: Number,
	level: String,
    kosherType: String,
    cuisines: { 
        type: [Schema.Types.ObjectId], 
        ref: 'Cuisine'
    },
    mainIngredients: { 
        type: [Schema.Types.ObjectId], 
        ref: 'MainIngredient'
    },
    directionMethods: { 
        type: [Schema.Types.ObjectId], 
        ref: 'DirectionMethod'
    },
    created: { 
        type: Date,
        default: Date.now
    },
    updated: { 
        type: Date,
        default: Date.now
    }
}, { collection: "Recipe" });

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