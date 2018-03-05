import { Ingredient } from '../models/ingredient';
import { Direction } from '../models/direction';

export class Recipe {
	constructor(
		public id: number,	
	    public title: string,
	    public ingredients: {[categoryName: string]: Ingredient[]},
	    public directions: {[categoryName: string]: Direction[]},
	    public prepTime: number,
	    public cookTime: number,
	    public level: string,
	    public kosherType: string
	) {  }
}
