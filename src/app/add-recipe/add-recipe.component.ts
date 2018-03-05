import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SelectUnitsComponent } from '../select-units/select-units.component';

import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

	// added support for looping through an associative object|array
	objectKeys = Object.keys;

	@ViewChild(SelectUnitsComponent) selectUnitsComponent: SelectUnitsComponent;

	@ViewChild('ingredientNameInput') ingredientNameInput: ElementRef;
	@ViewChild('ingredientQty') ingredientQty: ElementRef;
	@ViewChild('ingredientsTextInput') ingredientsTextInput: ElementRef;
	@ViewChild('newIngredientsCategoryInput') newIngredientsCategoryInput: ElementRef;

	ingredientName: string;
	ingredientsText: string;
	newIngredientsCategory: string;

	// test data
	addedIngredients: {[categoryName: string]: Ingredient[]} = {
		"כללי": [
			{name: "a", quantity: "3", unit: 1},
			{name: "b", quantity: "5", unit: 2},
			{name: "c", quantity: "6", unit: 3}
		],
		"רוטב": [
			{name: "d", quantity: "3", unit: 2},
			{name: "e", quantity: "5", unit: 4},
			{name: "f", quantity: "6", unit: 5}
		]
	};

	selectedIngredientsCategory: string = "כללי";

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
		if (!this.ingredientNameInput.nativeElement.value)
			return;

		var addedIngredient = {
			name: 		this.ingredientNameInput.nativeElement.value,
			quantity:	this.ingredientQty.nativeElement.value,
			unit:		+this.selectUnitsComponent.selectedUnit	
		};
		this.addedIngredients[this.selectedIngredientsCategory].push(addedIngredient);

		console.log('after add ingredient this.addedIngredients',this.addedIngredients);

		this.ingredientNameInput.nativeElement.value = "";
		this.ingredientName = "";
		this.ingredientQty.nativeElement.value = "";
		this.selectUnitsComponent.selectedUnit = 0;

  	}

  	addPastedIngredients() {
  		var pastedTIngredientsText = this.ingredientsTextInput.nativeElement.value;
  		if (!pastedTIngredientsText)
  			return;
  		pastedTIngredientsText = pastedTIngredientsText.split("\n");;

  		for (let pastedTIngredient of pastedTIngredientsText) {

			// matches[1] - quantity, matches[2] - unit, matches[3] - ingredient name
			var matches = pastedTIngredient.match(this.getIngredientsRegex());

			var addedIngredient: Ingredient = {
				name: 		matches[3],
				quantity: 	matches[1],
				unit:		this.getUnitIdFromName(matches[2])

			}
			this.addedIngredients[this.selectedIngredientsCategory].push(addedIngredient);
		}
		this.ingredientsTextInput.nativeElement.value = "";
		this.ingredientsText = "";
  	}

	// TODO: chnage func name to removeIngredient
  	ingredientRemoved(removedIngredientObject) {
  		let removedIngredient = removedIngredientObject.removedObject;
  		let categoryName = removedIngredientObject.categoryName;
  		this.addedIngredients[categoryName] = this.addedIngredients[categoryName].filter(obj => obj !== removedIngredient);
  	}

  	ingredientsCategoryChanged(newCategory) {
  		this.selectedIngredientsCategory = newCategory;
  	}

  	addIngredientCategory(categoryName) {
  		if (!categoryName)
  			return;

  		this.addedIngredients[categoryName] = [];
  		this.selectedIngredientsCategory = categoryName;
  		this.newIngredientsCategoryInput.nativeElement.value = "";
  		this.newIngredientsCategory = "";
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
  		var foundUnit = this.units.filter(function(e) {
			return e.name == name;
		});
		return foundUnit.length ? foundUnit[0].id : 0;
  	}

}
