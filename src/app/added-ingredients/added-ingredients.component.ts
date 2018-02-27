import { Component, OnInit, Input } from '@angular/core';

import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-added-ingredients',
  templateUrl: './added-ingredients.component.html',
  styleUrls: ['./added-ingredients.component.css']
})
export class AddedIngredientsComponent implements OnInit {

	@Input() addedIngredients: Ingredient[];
	@Input() units: string[];

	ngOnInit() {
	}

}
