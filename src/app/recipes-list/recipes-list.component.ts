import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
	// Define a users property to hold our user data
	// add recipe.ts model class? and use a Recipe object?
	recipes: Array<any>;

	ngOnInit() {
	}

	// Create an instance of the DataService through dependency injection
	constructor(private _dataService: DataService) {

		// Access the Data Service's getRecipes() method we defined
		this._dataService.getRecipes()
		    .subscribe(res => this.recipes = res);
	}
}