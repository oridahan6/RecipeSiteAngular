import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Services
import { DataService } from '../services/data.service';
import { AlertService } from '../shared';

import { SelectUnitsComponent } from '../select-units/select-units.component';

import { Helper } from '../helpers/helper';

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

	singularUnitsNamesRegex = "";
	pluralUnitsNamesRegex = "";

	// added support for looping through an associative object|array
	objectKeys = Object.keys;

	uploadedFiles = [];

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

	units: Unit[];
	categories: Category[];
	cuisines: Cuisine[];
	mainIngredients: Ingredient[] = [];
	directionMethods: DirectionMethod[];

	constructor(private _dataService: DataService, private _alertService: AlertService) {
		this.setCategories();
		this.setUnits();
		this.setCuisines();
		this.setMainIngredients();
		this.setDirectionMethods();
	}

	ngOnInit() {
		this.recipe = new Recipe(
			"",
			{},
			{},
			[],
			0,
			0,
			"",
			"",
			[],
			[],
			[]
		);

		// this.recipe.title = "t";
		// this.recipe.categories = [1,2];
		// this.recipe.cuisines = [2];
		// this.recipe.mainIngredients = [3,4];
		// this.recipe.directionMethods = [1,4];
		// this.recipe.prepTime = 120;
		// this.recipe.cookTime = 80;
		// this.recipe.kosherType = "חלבי";
		// this.recipe.level = "מנוסה";

		// this.prepTimeMinutes = 2;
		// this.prepTimeHours = 3;
		// this.cookTimeMinutes = 2;
		// this.cookTimeHours = 3;
		// this.recipe.ingredients = {
		// 	"כללי": [
		// 		new Ingredient("a", "3", 1),
		// 		new Ingredient("b", "5", 2),
		// 		new Ingredient("c", "6", 3)
		// 	],
		// 	"רוטב": [
		// 		new Ingredient("d", "3", 1),
		// 		new Ingredient("e", "5", 4),
		// 		new Ingredient("f", "6", 2)
		// 	]
		// };
		// this.recipe.directions = {
		// 	"כללי": [
		// 		new Direction("בלה"),
		// 		new Direction("בלה בלה"),
		// 		new Direction("בלה בלה בלה")
		// 	],
		// 	"רוטב": [
		// 		new Direction("בלו"),
		// 		new Direction("בלו בלו"),
		// 		new Direction("בלו בלו בלו")
		// 	]
		// };
	}

	//////////////////////////////////////////////////////////////////////
	//// Ingredients methods						
	//////////////////////////////////////////////////////////////////////

	// TODO - try to auto select ingredients based on common names: potato - potatos etc.
	addIngredient(): void {
		if (!this.ingredientNameInput.nativeElement.value)
			return;

		var addedIngredient = new Ingredient(
			this.ingredientNameInput.nativeElement.value,
			this.ingredientQty.nativeElement.value,
			this.selectUnitsComponent.selectedUnit	
		);

		this.checkAndAddIngredientAlreadyExist(addedIngredient);
		this.autoSelectMainIngredients(addedIngredient);

		this.ingredientNameInput.nativeElement.value = "";
		this.ingredientName = "";
		this.ingredientQty.nativeElement.value = "";
		this.selectUnitsComponent.selectedUnit = undefined;

  	}

  	addPastedIngredients() {
  		var pastedIngredientsText = this.ingredientsTextInput.nativeElement.value;
  		if (!pastedIngredientsText)
  			return;
  		pastedIngredientsText = pastedIngredientsText.split("\n");

  		for (let pastedIngredient of pastedIngredientsText) {
			pastedIngredient = pastedIngredient.trim();
			// matches[1] - quantity, matches[2] - unit, matches[3] - ingredient name
			var matches = pastedIngredient.match(this.getIngredientsRegex(true));
			if (!matches || !matches[2]){
				matches = pastedIngredient.match(this.getIngredientsRegex());
			}
			if (pastedIngredient && !matches[3]) {
				this.showErrorAlert("שגיאה. מצרך: " + pastedIngredient + " לא נוסף, נא בדוק את תצורת המצרך.");
			}
			if (matches) {
				var addedIngredient = new Ingredient(
					matches[3],
					matches[1],
					this.getUnitIdFromName(matches[2])
				);
				this.checkAndAddIngredientAlreadyExist(addedIngredient);
				this.autoSelectMainIngredients(addedIngredient);
			}
		}
		// TODO - show error if one of the ingredients were not matched with the regex
		this.ingredientsTextInput.nativeElement.value = "";
		this.ingredientsText = "";
  	}

  	removeIngredient(removedIngredientObject) {
  		let removedIngredient = removedIngredientObject.removedObject;
  		let categoryName = removedIngredientObject.categoryName;
  		this.recipe.ingredients[categoryName] = this.recipe.ingredients[categoryName].filter(obj => obj !== removedIngredient);
  	}

  	ingredientsCategoryChanged(newCategory) {
  		this.selectedIngredientsCategory = newCategory;
  	}

  	addIngredientCategory(categoryName) {
  		var categoryName = categoryName.trim();
  		if (!categoryName)
  			return;
  		if (this.recipe.ingredients.hasOwnProperty(categoryName)){
  			this.showErrorAlert("קטגוריה \"" + categoryName + "\" כבר קיימת במצרכים.");
  			return;
  		}

  		this.recipe.ingredients[categoryName] = [];
  		this.selectedIngredientsCategory = categoryName;
  		this.newIngredientsCategoryInput.nativeElement.value = "";
  		this.newIngredientsCategory = "";
  	}

	getIngredientsRegex(pluralUnits: boolean = false) {
  		const ingredientQtyRegex = "(\\d\\.\\d{1,2}|\\d{1,2}-\\d{1,2}|(?:\\d\\s)?\\d[\\/\\\\]\\d|\\d+|(?:חצי|רבע))";
		const possibleSpaceChars = "\\s*";
		const ingredientNameRegex = "(\\D+)";
		const wholeRegex = ingredientQtyRegex + "?" + possibleSpaceChars + this.getUnitsRegex(pluralUnits) + "?" + possibleSpaceChars + ingredientNameRegex;

		return new RegExp(wholeRegex);
  	}

  	getUnitsRegex(plural: boolean) {
  		if (plural && this.pluralUnitsNamesRegex)
  			return this.pluralUnitsNamesRegex;
  		if (!plural && this.singularUnitsNamesRegex)
  			return this.singularUnitsNamesRegex;
  		var unitsNames = [];
  		var units = this.units;
  		if (plural) {
			units = units.filter(unit => unit.plural);
  		} else {
  			units = units.filter(unit => !unit.plural);
  		}
  		var ret = units.map(unit => {
  			unitsNames.push(unit.name);
  		});
  		if (plural) {
	  		this.pluralUnitsNamesRegex = "(" + unitsNames.join("|") + ")";
	  		return this.pluralUnitsNamesRegex;
  		} 
  		this.singularUnitsNamesRegex = "(" + unitsNames.join("|") + ")";
  		return this.singularUnitsNamesRegex;
  	}

  	getUnitIdFromName(name: string): number {
  		var unit = this.units.find(unit => unit.name === name);
  		return unit ? unit._id : 0;
  	}

  	checkAndAddIngredientAlreadyExist(ingredient: Ingredient) {
  		if (this.isEmptyIngredients()){
  			this.recipe.ingredients[this.selectedIngredientsCategory] = [];	
  		}
		var isExists = this.recipe.ingredients[this.selectedIngredientsCategory].inArray(ingredient);

		if (isExists === -1) {
			this.recipe.ingredients[this.selectedIngredientsCategory].push(ingredient);
			return;
		} 
		this.showErrorAlert("מצרך '" + ingredient.title + "' קיים בקטגוריה '" + this.selectedIngredientsCategory + "', הוסף מצרך שונה");
  	}

  	autoSelectMainIngredients(ingredient: Ingredient) {
  		var mainIngredient = this.mainIngredients.find(mainIngredient => mainIngredient.title === ingredient.title);
  		if (mainIngredient){
  			if (this.recipe.mainIngredients.inArray(mainIngredient) === -1){
  				this.recipe.mainIngredients.push(mainIngredient._id);
  				this.recipe.mainIngredients = [...this.recipe.mainIngredients];
  			} 
  		}
  	}

	//////////////////////////////////////////////////////////////////////
	//// Direction methods						
	//////////////////////////////////////////////////////////////////////

  	directionRemoved(removedDirectionObject) {
  		let removedDirection = removedDirectionObject.removedObject;
  		let categoryName = removedDirectionObject.categoryName;
  		this.recipe.directions[categoryName] = this.recipe.directions[categoryName].filter(obj => obj !== removedDirection);
  	}

	addDirection(): void {
		if (!this.directionInput.nativeElement.value)
			return;

		var addedDirection = new Direction(this.directionInput.nativeElement.value);
		if (this.isEmptyDirections()){
  			this.recipe.directions[this.selectedDirectionsCategory] = [];	
  		}
		this.recipe.directions[this.selectedDirectionsCategory].push(addedDirection);

		this.directionInput.nativeElement.value = "";
		this.direction = "";
  	}

  	addPastedDirections() {
  		var pastedDirectionsText = this.directionsTextInput.nativeElement.value;
  		if (!pastedDirectionsText)
  			return;
  		pastedDirectionsText = pastedDirectionsText.split("\n");;

  		for (let pastedDirection of pastedDirectionsText) {
  			pastedDirection = pastedDirection.trim();
  		    if (pastedDirection){
  		    	if (!this.recipe.directions[this.selectedDirectionsCategory])
  		    		this.recipe.directions[this.selectedDirectionsCategory] = [];
				this.recipe.directions[this.selectedDirectionsCategory].push( new Direction(pastedDirection) );
  		    }
		}
		this.directionsTextInput.nativeElement.value = "";
		this.directionsText = "";
  	}

  	directionsCategoryChanged(newCategory) {
  		this.selectedDirectionsCategory = newCategory;
  	}

  	addDirectionCategory(categoryName) {
  		var categoryName = categoryName.trim();
  		if (!categoryName)
  			return;
  		if (this.recipe.directions.hasOwnProperty(categoryName)){
  			this.showErrorAlert("קטגוריה \"" + categoryName + "\" כבר קיימת בשלבי ההכנה.");
  			return;
  		}


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
		if (this.checkForFormErrors())
			return;

		var formData: FormData = new FormData();
		for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("images", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }	
		this.uploadImages(formData);
	}

	uploadImages(formData: FormData) {
		this._dataService.uploadImage(formData)
			.subscribe(
				data => {
					this.recipe.images = data;
					this.saveRecipe();
				},
				err => {
					console.error(err)
					// show friendly error
					this.showErrorAlert("There was an error uploading images. Error: " + err);
				},
				() => { /*console.log('done uploading images'); */ }
		    );		
	}

	saveRecipe() {
		this._dataService.saveRecipe(this.recipe)
			.subscribe(
				data => {
					if (data.success){
						this.showSuccessAlert("המתכון נשמר בהצלחה.");
						this.clearForm();
					} else {
						this.showErrorAlert("קרתה שגיאה בעת שמירת המתכון.");
					}
				},
				err => {
					// show friendly error
					this.showErrorAlert("There was an error saving the recipe. Error: " + err);
				},
				() => { /* console.log('done saving recipe'); */ }
		    );
	}

	clearForm() {
		this.recipe.title = "";
		this.recipe.ingredients = {};
		this.recipe.directions = {};
		this.recipe.kosherType = "";
		this.recipe.level = "";
		this.recipe.categories = [];
		this.recipe.cuisines = [];
		this.recipe.mainIngredients = [];
		this.recipe.directionMethods = [];
		
		this.recipe.prepTime = 0;
		this.prepTimeMinutes = undefined;
		this.prepTimeHours = undefined;
		
		this.recipe.cookTime = 0;
		this.cookTimeMinutes = undefined;
		this.cookTimeHours = undefined;

		this.uploadedFiles = [];
	}

  	updateUploadedFiles(event) {
  		let fileList: FileList = event.target.files;
	    if (fileList.length > 0) {
	    	for (var i = 0; i < fileList.length; i++) {
	            this.uploadedFiles.push(fileList[i]);
	        }
	    }
  	}

  	removeFile(file) {
  		this.uploadedFiles = this.uploadedFiles.filter( obj => obj.name !== file.name );
  	}

  	// TODO: consider drawing a box with all the errors next to the submit button
  	checkForFormErrors() : boolean {
  		if (!this.recipe.title) {
			this.showErrorAlert("לא נבחר שם למתכון.");
			return true;
		}
  		if (!this.recipe.kosherType) {
			this.showErrorAlert("לא נבחר סוג המתכון.");
			return true;
		}
  		if (!this.recipe.level) {
			this.showErrorAlert("לא נבחרה רמת המתכון.");
			return true;
		}
  		if (!this.recipe.prepTime && !this.recipe.cookTime) {
			this.showErrorAlert("זמן ההכנה וזמן הבישול חסרים.");
			return true;
		}
  		if (this.isEmptyIngredients()) {
			this.showErrorAlert("לא הוספו מצרכים.");
			return true;
		}
  		if (this.isEmptyDirections()) {
			this.showErrorAlert("לא הוספו שלבי הכנה.");
			return true;
		}
  		if (!this.recipe.categories.length) {
			this.showErrorAlert("לא נבחרו קטגוריות.");
			return true;
		}
  		if (!this.recipe.directionMethods.length) {
			this.showErrorAlert("לא נבחרו דרכי הכנה.");
			return true;
		}
  		if (!this.recipe.mainIngredients.length) {
			this.showErrorAlert("לא נבחרו מצרכים עיקריים.");
			return true;
		}
  		if (!this.uploadedFiles.length) {
			this.showErrorAlert("לא ניתן להעלות מתכון ללא תמונות.");
			return true;
		}
		return false;
  	}

  	isEmptyIngredients() : boolean {
  		return Helper.isAllObjectPropertiesEmpty(this.recipe.ingredients);
  	}

  	isEmptyDirections() : boolean {
		return Helper.isAllObjectPropertiesEmpty(this.recipe.directions);
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
