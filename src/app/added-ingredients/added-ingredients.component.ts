import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-added-ingredients',
  templateUrl: './added-ingredients.component.html',
  styleUrls: ['./added-ingredients.component.scss']
})
export class AddedIngredientsComponent implements OnInit {

	@Input() addedIngredients: Ingredient[];
	@Input() units: number[];

	@Output() ingredientRemovedEvent = new EventEmitter<Ingredient>();

	ngOnInit() {
	}

	removeIngredient(addedIngredient: Ingredient) {
		this.ingredientRemovedEvent.emit(addedIngredient)
	}

	moveIngredient(ingredient: Ingredient, position: number) {
		// possubly that this function is not needed
		console.log('this.addedIngredients',this.addedIngredients);
	}

	ingredientNameChanged(changedIngredient: Ingredient, newValue: string) {
		this.addedIngredients.forEach((addedIngredient, index) => {
			if (addedIngredient.name === changedIngredient.name) {
				addedIngredient.name = newValue;
			}
		});
	}

}
