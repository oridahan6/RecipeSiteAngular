import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-added-ingredients',
  templateUrl: './added-ingredients.component.html',
  styleUrls: ['./added-ingredients.component.scss']
})
export class AddedIngredientsComponent implements OnInit {

	objectKeys = Object.keys;

	@Input() addedIngredients: {[categoryName: string]: Ingredient[]};
	@Input() selectedIngredientsCategory: string;
	@Input() units: number[];

	@Output() ingredientRemovedEvent = new EventEmitter<{categoryName: string, removedIngredient: Ingredient}>();

	ngOnInit() {
	}

	removeIngredient(categoryName: string, addedIngredient: Ingredient) {
		this.ingredientRemovedEvent.emit({categoryName: categoryName, removedIngredient: addedIngredient});
	}

	moveIngredient(ingredient: Ingredient, position: number) {
		// possubly that this function is not needed
		console.log('this.addedIngredients',this.addedIngredients);
	}

	ingredientNameChanged(changedIngredient: Ingredient, newValue: string) {
		this.addedIngredients[this.selectedIngredientsCategory].forEach((addedIngredient, index) => {
			if (addedIngredient.name === changedIngredient.name) {
				addedIngredient.name = newValue;
			}
		});
	}

	ingredientQtyChanged(changedIngredient: Ingredient, newValue: string) {
		this.addedIngredients[this.selectedIngredientsCategory].forEach((addedIngredient, index) => {
			if (addedIngredient.name === changedIngredient.name) {
				addedIngredient.quantity = newValue;
			}
		});
	}

}
