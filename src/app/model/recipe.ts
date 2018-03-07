import { Ingredient } from '../model/ingredient';
import { Direction } from '../model/direction';
import { Category } from '../model/category';

// TODO: decide whether to save the while categories, cuisines, mainIngredients objects instead of only their id 
// (based on how often they change - https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1)
// TODO: add dates - created, updated etc.
export class Recipe {
	constructor(
	    public title: string,
	    public ingredients: {[categoryName: string]: Ingredient[]},
	    public directions: {[categoryName: string]: Direction[]},
	    public categories: string[],
	    public prepTime: number,
	    public cookTime: number,
	    public level: string,
	    public kosherType: string,
	    public cuisines: string[],
	    public mainIngredients: string[],
	    public directionMethods: string[],
		public id?: string,	
		public images?: string[]
	) {  }
}
