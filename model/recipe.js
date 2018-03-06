var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    title: String,
    ingredients: {
    	categoryName: [
    		{ 
	    		title: String, 
	    		quantity: Number, 
	    		unit: {
	    			type: mongoose.Schema.Types.ObjectId, 
			        ref: 'Unit'
	    		} 
    		}
    	]
    },
    directions: { categoryName: [ { title: String } ] },
    categories: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Category'
    },
    prepTime: Number,
	cookTime: Number,
	level: String,
    kosherType: String,
    cuisines: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Cuisine'
    },
    mainIngredients: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'MainIngredient'
    },
    directionMethods: { 
        type: [mongoose.Schema.Types.ObjectId], 
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