import { Ingredient } from '../model/ingredient';
import { Direction } from '../model/direction';
import { Category } from '../model/category';

// TODO: decide whether to save the while categories, cuisines, mainIngredients objects instead of only their id 
// (based on how often they change - https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1)

export class Recipe {
	constructor(
		public id: number,	
	    public title: string,
	    public ingredients: {[categoryName: string]: Ingredient[]},
	    public directions: {[categoryName: string]: Direction[]},
	    public categories: number[],
	    public prepTime: number,
	    public cookTime: number,
	    public level: string,
	    public kosherType: string,
	    public cuisines: number[],
	    public mainIngredients: number[]
	) {  }
}
