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
	@ViewChild('ingredientsText') ingredientsText: ElementRef;

	addedIngredients: Ingredient[] = [
		{name: "a", quantity: 3, unit: 1},
		{name: "b", quantity: 5, unit: 2},
		{name: "c", quantity: 6, unit: 3}
	];

	// get from db
	units = [
		{ id: 1, name: "גרם" },
		{ id: 2, name: "כפית" },
		{ id: 3, name: "כפיות" },
		{ id: 4, name: "כף" },
		{ id: 5, name: "כפות" },
		{ id: 6, name: "קופסא" }
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

	// TODO: check for duplicates before adding ingredient to array
	addIngredient(): void {
		var addedIngredient = {
			name: 		this.ingredientName.nativeElement.value,
			quantity:	this.ingredientQty.nativeElement.value,
			unit:		+this.selectUnitsComponent.selectedUnit	
		};

		console.log("addedIngredient", addedIngredient);


		this.addedIngredients.push(addedIngredient);
		console.log("add recipe this.addedIngredients", this.addedIngredients);

		this.ingredientName.nativeElement.value = "";
		this.ingredientQty.nativeElement.value = "";
		this.selectUnitsComponent.selectedUnit = "";

  	}

  	addPastedIngredients() {
  		var pastedTIngredientsText = this.ingredientsText.nativeElement.value.split("\n");;

  		for (let pastedTIngredient of pastedTIngredientsText) {

			// matches[1] - quantity, matches[2] - unit, matches[3] - ingredient name
			var matches = pastedTIngredient.match(this.getIngredientsRegex());

			var addedIngredient: Ingredient = {
				name: 		matches[3],
				quantity: 	matches[1],
				unit:		this.getUnitIdFromName(matches[2])

			}
			this.addedIngredients.push(addedIngredient);
		}
		this.ingredientsText.nativeElement.value = "";
  	}

	// TODO: try to use ingredient: Ingredient instead of $event
	// TODO: chnage func name to removeIngredient
  	ingredientRemoved($event) {
  		let removedIngredient = $event;
  		this.addedIngredients = this.addedIngredients.filter(obj => obj !== removedIngredient);
  	}

	getIngredientsRegex() {
  		const ingredientQtyRegex = "(\\d\\.\\d{2}|\\d\\/\\d|\\d+|(?:חצי|רבע))";
		const possibleSpaceChars = "\\s?";
		const ingredientNameRegex = "(\\D+)";
		const wholeRegex = ingredientQtyRegex + possibleSpaceChars + this.getUnitsRegex() + possibleSpaceChars + ingredientNameRegex;

		return new RegExp(wholeRegex);
  	}

  	getUnitsRegex() {
  		// TODO: convert from this.units
		return "(גרם|כפית|כף|כפות|כפיות|קופסא)?";
  	}

  	getUnitIdFromName(name: string): number {
  		var filterObj = this.units.filter(function(e) {
			return e.name == name;
		});
		return filterObj.length ? filterObj[0].id : 0;
  	}

}
