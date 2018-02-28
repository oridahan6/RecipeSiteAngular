import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-added-ingredients',
  templateUrl: './added-ingredients.component.html',
  styleUrls: ['./added-ingredients.component.scss']
})
export class AddedIngredientsComponent implements OnInit {

	@Input() addedIngredients: Ingredient[];
	@Input() units: string[];

	@Output() ingredientRemovedEvent = new EventEmitter<Ingredient>();

	ngOnInit() {
	}

	removeIngredient(addedIngredient: Ingredient) {
		this.ingredientRemovedEvent.emit(addedIngredient)
	}

}
