import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Services
import { DataService } from '../services/data.service';
import { AlertService } from '../shared';

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

	unitsNamesRegex = "";

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

	constructor(private _dataService: DataService, private _alertService: AlertService) {
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
			"t",
			ingredients,
			directions,
			[],
			100,
			20,
			this.levels[0].presentedName,
			this.kosherTypes[0].presentedName,
			[],
			[],
			[]
		);
	}

	//////////////////////////////////////////////////////////////////////
	//// Ingredients methods						
	//////////////////////////////////////////////////////////////////////

	// TODO: auto select main ingredients after adding
	addIngredient(): void {
		if (!this.ingredientNameInput.nativeElement.value)
			return;

		var addedIngredient = new Ingredient(
			this.ingredientNameInput.nativeElement.value,
			this.ingredientQty.nativeElement.value,
			this.selectUnitsComponent.selectedUnit	
		);
		console.log('addedIngredient',addedIngredient);

		this.checkAndAddIngredientAlreadyExist(addedIngredient);

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
				this.checkAndAddIngredientAlreadyExist(addedIngredient);
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
  		if (this.unitsNamesRegex)
  			return this.unitsNamesRegex;
  		var unitsNames = [];
  		var ret = this.units.map(unit => {
  			unitsNames.push(unit.name);
  		});
  		this.unitsNamesRegex = "(" + unitsNames.join("|") + ")";
  		return this.unitsNamesRegex;
  	}

  	getUnitIdFromName(name: string): string {
  		return this.units.findObjectPropertyByAnotherProperty("name", name, "_id");
  	}

  	checkAndAddIngredientAlreadyExist(ingredient: Ingredient) {
		var isExists = this.recipe.ingredients[this.selectedIngredientsCategory].inArray(ingredient);

		if (isExists === -1) {
			this.recipe.ingredients[this.selectedIngredientsCategory].push(ingredient);
			return;
		} 
		this.showErrorAlert("מצרך '" + ingredient.title + "' קיים בקטגוריה '" + this.selectedIngredientsCategory + "', הוסף מצרך שונה");
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
		// UploadImages
		if (this.uploadedFiles.length) {
			var formData: FormData = new FormData();
			for (var i = 0; i < this.uploadedFiles.length; i++) {
	            formData.append("images", this.uploadedFiles[i], this.uploadedFiles[i].name);
	        }	
			this._dataService.uploadImage(formData)
				.subscribe(
					data => {
						// console.log("this.recipe after uploading", this.recipe);
						// console.log('data',data);
						this.recipe.images = data;
						this._dataService.saveRecipe(this.recipe);
					},
					err => console.error(err),
					() => { /*console.log('done uploading images'); */ }
			    );
		} else {
			// enable upload without images?
			// set recipe images as empty?
			// console.log("this.recipe", this.recipe);
			// this._dataService.saveRecipe(this.recipe.fileData);
		}

	}

	// TODO: what happens if user changes images?
  	updateUploadedFiles(event) {
  		let fileList: FileList = event.target.files;
	    if (fileList.length > 0) {
	    	this.uploadedFiles = fileList;
	    }
  	}

  	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.recipe); }

	//////////////////////////////////////////////////////////////////////
	//// Setters methods						
	//////////////////////////////////////////////////////////////////////
	setCategories() {
		this._dataService.getCategories()
		    .subscribe(
				data => this.categories = data,
				err => console.error(err),
				() => { /*console.log('done loading categories'); */ }
		    );
	}

	setUnits() {
		this._dataService.getUnits()
		    .subscribe(
				data => this.units = data,
				err => console.error(err),
				() => { /*console.log('done loading units'); */ }
		    );
	}

	setCuisines() {
		this._dataService.getCuisines()
		    .subscribe(
				data => this.cuisines = data,
				err => console.error(err),
				() => { /*console.log('done loading cuisines'); */ }
		    );
	}

	setMainIngredients() {
		this._dataService.getMainIngredients()
		    .subscribe(
				data => this.mainIngredients = data,
				err => console.error(err),
				() => { /*console.log('done loading main ingredients'); */ }
		    );
	}

	setDirectionMethods() {
		this._dataService.getDirectionMethods()
		    .subscribe(
				data => {
					this.directionMethods = data;
				},
				err => console.error(err),
				() => { /*console.log('done loading direction methods'); */ }
		    );
	}

	//////////////////////////////////////////////////////////////////////
	//// Alerts methods						
	//////////////////////////////////////////////////////////////////////
	showSuccessAlert(message: string) {
        this._alertService.success(message);
    }

	showErrorAlert(message: string) {
        this._alertService.error(message);
    }

}
