import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DataService } from '../services/data.service';

import { SelectUnitsComponent } from '../select-units/select-units.component';

import { Recipe } from '../model/recipe';
import { Ingredient } from '../model/ingredient';
import { Direction } from '../model/direction';
import { Category } from '../model/category';
import { Unit } from '../model/unit';
import { Cuisine } from '../model/cuisine';
import { DirectionMethod } from '../model/direction-method';

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
	// Time
	//////////////////
	prepTimeHours: number;
	prepTimeMinutes: number;
	cookTimeHours: number;
	cookTimeMinutes: number;

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
	units: Unit[];
	categories: Category[];
	cuisines: Cuisine[];
	mainIngredients: Ingredient[];
	directionMethods: DirectionMethod[];

	constructor(private _dataService: DataService) {
		this.setCategories();
		this.setUnits();
		this.setCuisines();
		this.setMainIngredients();
		this.setDirectionMethods();
	}

	ngOnInit() {
		let ingredients = {
			"כללי": [
				new Ingredient("a", "3", "5a9e883884d81edd7cb98249"),
				new Ingredient("b", "5", "5a9e884a84d81edd7cb9825a"),
				new Ingredient("c", "6", "5a9e88c284d81edd7cb982b6")
			],
			"רוטב": [
				new Ingredient("d", "3", "5a9e884a84d81edd7cb9825a"),
				new Ingredient("e", "5", "5a9e883884d81edd7cb98249"),
				new Ingredient("f", "6", "5a9e88c284d81edd7cb982b6")
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
			[0],
			0,
			0,
			this.levels[0].presentedName,
			this.kosherTypes[0].presentedName,
			[0],
			[0],
			[0]
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
			this.selectUnitsComponent.selectedUnit	
		);
		console.log('addedIngredient',addedIngredient);
		this.recipe.ingredients[this.selectedIngredientsCategory].push(addedIngredient);

		console.log('after add ingredient this.recipe.ingredients',this.recipe.ingredients);

		this.ingredientNameInput.nativeElement.value = "";
		this.ingredientName = "";
		this.ingredientQty.nativeElement.value = "";
		this.selectUnitsComponent.selectedUnit = "";

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

  	getUnitIdFromName(name: string): string {
  		var foundUnit = this.units.filter(function(e) {
			return e.name == name;
		});
		return foundUnit.length ? foundUnit[0]._id : "";
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
	//// Prep/Cook Time methods						
	//////////////////////////////////////////////////////////////////////

	prepTimeHoursChanged(hours) {
		this.recipe.prepTime = (hours * 60) + (this.prepTimeMinutes ? this.prepTimeMinutes : 0);
	}

	prepTimeMinutesChanged(minutes) {
		this.recipe.prepTime = +minutes + (this.prepTimeHours ? this.prepTimeHours * 60 : 0);
	}

	cookTimeHoursChanged(hours) {
		this.recipe.cookTime = (hours * 60) + (this.cookTimeMinutes ? this.cookTimeMinutes : 0);
	}

	cookTimeMinutesChanged(minutes) {
		this.recipe.cookTime = +minutes + (this.cookTimeHours ? this.cookTimeHours * 60 : 0);
	}

	//////////////////////////////////////////////////////////////////////
	//// General methods						
	//////////////////////////////////////////////////////////////////////

	submitForm(val) {
		console.log("this.recipe", this.recipe);

	}


  	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.recipe); }

	//////////////////////////////////////////////////////////////////////
	//// Setters methods						
	//////////////////////////////////////////////////////////////////////
	setCategories() {
		this._dataService.getCategories()
		    .subscribe(
				data => {
					this.categories = data;
					console.log("this.categories", this.categories);

				},
				err => console.error(err),
				() => { /*console.log('done loading categories'); */ }
		    );
	}

	setUnits() {
		this._dataService.getUnits()
		    .subscribe(
				data => {
					this.units = data;
					console.log("this.units", this.units);

				},
				err => console.error(err),
				() => { /*console.log('done loading units'); */ }
		    );
	}

	setCuisines() {
		this._dataService.getCuisines()
		    .subscribe(
				data => {
					this.cuisines = data;
					console.log("this.cuisines", this.cuisines);

				},
				err => console.error(err),
				() => { /*console.log('done loading cuisines'); */ }
		    );
	}

	setMainIngredients() {
		this._dataService.getMainIngredients()
		    .subscribe(
				data => {
					this.mainIngredients = data;
					console.log("this.mainIngredients", this.mainIngredients);

				},
				err => console.error(err),
				() => { /*console.log('done loading main ingredients'); */ }
		    );
	}

	setDirectionMethods() {
		this._dataService.getDirectionMethods()
		    .subscribe(
				data => {
					this.directionMethods = data;
					console.log("this.directionMethods", this.directionMethods);

				},
				err => console.error(err),
				() => { /*console.log('done loading direction methods'); */ }
		    );
	}

}
