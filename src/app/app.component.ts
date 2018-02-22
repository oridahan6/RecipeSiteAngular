import { Component } from '@angular/core';

import { DataService } from './services/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	// Define a users property to hold our user data
	recipes: Array<any>;

	// Create an instance of the DataService through dependency injection
	constructor(private _dataService: DataService) {

	// Access the Data Service's getRecipes() method we defined
	this._dataService.getRecipes()
	    .subscribe(res => this.recipes = res);
	}
}
