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

	@Output() addedIngredientsChangedEvent = new EventEmitter<Ingredient[]>();

	ngOnInit() {
	}

	removeIngredient(addedIngredient: Ingredient) {
		this.addedIngredients = this.addedIngredients.filter(obj => obj !== addedIngredient);
		this.addedIngredientsChangedEvent.emit(this.addedIngredients)
	}

}
