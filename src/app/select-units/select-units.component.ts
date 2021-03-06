import { Component, OnInit, Input } from '@angular/core';

import { Ingredient } from '../model/ingredient';

@Component({
  selector: 'app-select-units',
  templateUrl: './select-units.component.html',
  styleUrls: ['./select-units.component.scss']
})
export class SelectUnitsComponent implements OnInit {

	@Input() addedIngredient: Ingredient;
	@Input() units: string[];
	@Input() selectedUnit: number;

	constructor() { }

	ngOnInit() {
	}

	unitSelectChanged(newValue: number) {
		if (this.addedIngredient){
			this.selectedUnit = newValue;
			this.addedIngredient.unit = newValue;	
		}
	}
}
