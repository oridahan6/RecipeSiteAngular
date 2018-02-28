import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SelectUnitsComponent } from '../select-units/select-units.component';

import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

	@ViewChild(SelectUnitsComponent) selectUnitsComponent: SelectUnitsComponent;

	@ViewChild('ingredientName') ingredientName: ElementRef;
	@ViewChild('ingredientQty') ingredientQty: ElementRef;

	addedIngredients: Ingredient[] = [];

	// get from db
	units = [
		{ id: 1, name: "גרם" },
		{ id: 2, name: "כפית" },
		{ id: 3, name: "כף" },
		{ id: 4, name: "קופסא" }
	];
	categories = [
		"חלבי",
		"בשרי",
		"פרווה",
		"ארוחת ערב",
		"ארוחת בוקר",
		"ארוחת צהריים"
	];
	cuisines = [
		"איטלקי",
		"ים תיכוני",
		"מרוקאי",
		"ישראלי"
	];
	mainIngredients = [
		"קוטג'",
		"טונה",
		"סלמון",
		"אורז",
		"בורגול",
		"עגבניה",
		"רסק עגבניות"
	];
	directionMethods = [
		"בישול",
		"אפייה",
		"טיגון",
		"ללא בישול",
		"אידוי",
		"הקפאה",
		"גריל"
	];

	constructor() {}

	ngOnInit() {
	}

	addIngredient(): void {
		var addedIngredient = {
			name: 		this.ingredientName.nativeElement.value,
			quantity:	this.ingredientQty.nativeElement.value,
			unit:		this.selectUnitsComponent.selectedUnit	
		};

		console.log("addedIngredient", addedIngredient);


		this.addedIngredients.push(addedIngredient);
		console.log("add recipe this.addedIngredients", this.addedIngredients);

		this.ingredientName.nativeElement.value = "";
		this.ingredientQty.nativeElement.value = "";
		this.selectUnitsComponent.selectedUnit = "";

  	}

  	ingredientRemoved($event) {
  		let removedIngredient = $event;
  		this.addedIngredients = this.addedIngredients.filter(obj => obj !== removedIngredient);
  	}

}
