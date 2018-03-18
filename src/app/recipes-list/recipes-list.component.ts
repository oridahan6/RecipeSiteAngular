import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../services/data.service';

import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

	@Input() title: string = "מתכונים";
	recipes: Array<Recipe>;

	ngOnInit() {
	}

	constructor(private _dataService: DataService) {
		this._dataService.getRecipes()
		    .subscribe(
				data => {
					console.log('data',data);
					this.recipes = data;
				},
				err => console.error(err),
				() => { console.log('done loading recipes'); }
		    );
	}
}