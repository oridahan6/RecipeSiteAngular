import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import { DataService } from '../services/data.service';

import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

	recipe: Recipe;

	constructor(private _dataService: DataService, private route: ActivatedRoute) {
		this.route.params.subscribe( params => this.setRecipe(params["id"]) );
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
	}

	setRecipe(id) {
		this._dataService.getRecipe(id)
		    .subscribe(
				data => {
					console.log('data',data);
					this.recipe = data;
				},
				err => console.error(err),
				() => { console.log('done loading recipe'); }
		    );
	}

}
