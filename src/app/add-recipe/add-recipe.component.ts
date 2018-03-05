import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SelectUnitsComponent } from '../select-units/select-units.component';

import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Direction } from '../models/direction';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

	@ViewChild(SelectUnitsComponent) selectUnitsComponent: SelectUnitsComponent;

	//////////////////
	// ingredients
	//////////////////
	@ViewChild('ingredientNameInput') ingredientNameInput: ElementRef;
	@ViewChild('ingredientQty') ingredientQty: ElementRef;
	@ViewChild('ingredientsTextInput') ingredientsTextInput: ElementRef;
	@ViewChild('newIngredientsCategoryInput') newIngredientsCategoryInput: ElementRef;

	ingredientName: string;
	ingredientsText: string;
	newIngredientsCategory: string;
	selectedIngredientsCategory: string = "כללי";

	//////////////////
	// directions
	//////////////////
	@ViewChild('directionInput') directionInput: ElementRef;
	@ViewChild('directionsTextInput') directionsTextInput: ElementRef;
	@ViewChild('newDirectionsCategoryInput') newDirectionsCategoryInput: ElementRef;

	direction: string;
	directionsText: string;
	newDirectionsCategory: string;
	selectedDirectionsCategory: string = "כללי";

	//////////////////
	// General
	//////////////////

	recipe: Recipe;

	// added support for looping through an associative object|array
	objectKeys = Object.keys;

	uploadedFiles: FileList;

	kosherTypes = [
		{ name: "dairy", presentedName: "חלבי" },
		{ name: "parve", presentedName: "פרווה" },
		{ name: "meat", presentedName: "בשרי" }
	];
	levels = [
		{ name: "beginner", presentedName: "מתחיל" },
		{ name: "intermediate", presentedName: "מנוסה" },
		{ name: "expert", presentedName: "מומחה" }
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
		let ingredients = {
			"כללי": [
				new Ingredient("a", "3", 1),
				new Ingredient("b", "5", 2),
				new Ingredient("c", "6", 3)
			],
			"רוטב": [
				new Ingredient("d", "3", 2),
				new Ingredient("e", "5", 4),
				new Ingredient("f", "6", 5)
			]
		};
		let directions = {
			"כללי": [
				new Direction("בלה"),
				new Direction("בלה בלה"),
				new Direction("בלה בלה בלה")
			],
			"רוטב": [
				new Direction("בלו"),
				new Direction("בלו בלו"),
				new Direction("בלו בלו בלו")
			]
		};

		this.recipe = new Recipe(
			0,
			"",
			ingredients,
			directions,
			0,
			0,
			this.levels[0].presentedName,
			this.kosherTypes[0].presentedName
		);
	}

	//////////////////////////////////////////////////////////////////////
	//// Ingredients methods						
	//////////////////////////////////////////////////////////////////////

	// TODO: check for duplicates before adding ingredient to array
	addIngredient(): void {
		if (!this.ingredientNameInput.nativeElement.value)
			return;

		var addedIngredient = new Ingredient(
			this.ingredientNameInput.nativeElement.value,
			this.ingredientQty.nativeElement.value,
			+this.selectUnitsComponent.selectedUnit	
		);
		console.log('addedIngredient',addedIngredient);
		this.recipe.ingredients[this.selectedIngredientsCategory].push(addedIngredient);

		console.log('after add ingredient this.recipe.ingredients',this.recipe.ingredients);

		this.ingredientNameInput.nativeElement.value = "";
		this.ingredientName = "";
		this.ingredientQty.nativeElement.value = "";
		this.selectUnitsComponent.selectedUnit = 0;

  	}

  	addPastedIngredients() {
  		var pastedIngredientsText = this.ingredientsTextInput.nativeElement.value;
  		if (!pastedIngredientsText)
  			return;
  		pastedIngredientsText = pastedIngredientsText.split("\n");;

  		for (let pastedIngredient of pastedIngredientsText) {

			// matches[1] - quantity, matches[2] - unit, matches[3] - ingredient name
			var matches = pastedIngredient.match(this.getIngredientsRegex());
			if (matches) {
				var addedIngredient = new Ingredient(
					matches[3],
					matches[1],
					this.getUnitIdFromName(matches[2])

				);
				this.recipe.ingredients[this.selectedIngredientsCategory].push(addedIngredient);
			}
		}
		// TODO - show error if one of the ingredients were not matched with the regex
		this.ingredientsTextInput.nativeElement.value = "";
		this.ingredientsText = "";
  	}

	// TODO: chnage func name to removeIngredient
  	ingredientRemoved(removedIngredientObject) {
  		let removedIngredient = removedIngredientObject.removedObject;
  		let categoryName = removedIngredientObject.categoryName;
  		this.recipe.ingredients[categoryName] = this.recipe.ingredients[categoryName].filter(obj => obj !== removedIngredient);
  	}

  	ingredientsCategoryChanged(newCategory) {
  		this.selectedIngredientsCategory = newCategory;
  	}

  	addIngredientCategory(categoryName) {
  		if (!categoryName)
  			return;

  		this.recipe.ingredients[categoryName] = [];
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

	//////////////////////////////////////////////////////////////////////
	//// Direction methods						
	//////////////////////////////////////////////////////////////////////

  	directionRemoved(removedDirectionObject) {
  		let removedDirection = removedDirectionObject.removedObject;
  		let categoryName = removedDirectionObject.categoryName;
  		this.recipe.directions[categoryName] = this.recipe.directions[categoryName].filter(obj => obj !== removedDirection);
  	}

	// TODO: check for duplicates before adding ingredient to array
	addDirection(): void {
		if (!this.directionInput.nativeElement.value)
			return;

		var addedDirection = new Direction(this.directionInput.nativeElement.value);
		this.recipe.directions[this.selectedDirectionsCategory].push(addedDirection);

		console.log('after add ingredient this.recipe.directions',this.recipe.directions);

		this.directionInput.nativeElement.value = "";
		this.direction = "";
  	}

  	addPastedDirections() {
  		var pastedDirectionsText = this.directionsTextInput.nativeElement.value;
  		if (!pastedDirectionsText)
  			return;
  		pastedDirectionsText = pastedDirectionsText.split("\n");;

  		for (let pastedDirection of pastedDirectionsText) {
			this.recipe.directions[this.selectedDirectionsCategory].push(pastedDirection);
		}
		this.directionsTextInput.nativeElement.value = "";
		this.directionsText = "";
  	}

  	directionsCategoryChanged(newCategory) {
  		this.selectedDirectionsCategory = newCategory;
  	}

  	addDirectionCategory(categoryName) {
  		if (!categoryName)
  			return;

  		this.recipe.directions[categoryName] = [];
  		this.selectedDirectionsCategory = categoryName;
  		this.newDirectionsCategoryInput.nativeElement.value = "";
  		this.newDirectionsCategory = "";
  	}

	//////////////////////////////////////////////////////////////////////
	//// General methods						
	//////////////////////////////////////////////////////////////////////

	submitForm(val) {
		console.log("this.recipe", this.recipe);

	}


  	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.recipe); }
}
