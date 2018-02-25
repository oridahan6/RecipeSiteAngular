import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

	// get from db
	units = [
		"גרם",
		"כפית",
		"כף",
		"קופסא"
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

	constructor() { }

	ngOnInit() {
	}

}
