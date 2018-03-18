import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Recipe } from '../model/recipe';
import { Ingredient } from '../model/ingredient';
import { Category } from '../model/category';
import { Unit } from '../model/unit';
import { Cuisine } from '../model/cuisine';
import { DirectionMethod } from '../model/direction-method';

@Injectable()
export class DataService {

	result:any;

	constructor(private _http: Http) { }

	getRecipes() : Observable<Recipe[]> {
		return this._http.get("/api/recipes")
	  		.map(result => result.json())
	  		.map(res => <Recipe[]>res.recipes);
	}

	getRecipe(id) : Observable<Recipe> {
		return this._http.get("/api/recipe/" + id)
	  		.map(result => result.json())
	  		.map(res => <Recipe>res.recipe);
	}

	uploadImage(imagesData) : Observable<string[]> {
		return this._http.post("/api/upload", imagesData)
			.map((res) => res.json())
			.map((res) => {
				var imagesNames = [];
				res.uploadedFiles.forEach(function(file, index){
					imagesNames.push(file.filename);
				});
				return imagesNames;
			});
	}

	saveRecipe(recipe) : Observable<any> {
		let headers = new Headers;
		let body = JSON.stringify(recipe);
		headers.append('Content-Type', 'application/json');
		return this._http.post("/api/recipe", body ,{headers: headers})
			.map(result => result.json());
	}

	getCategories() : Observable<Category[]> {
		return this._http.get("/api/categories")
	  		.map(result => result.json())
	  		.map(res => <Category[]>res.categories);
	}

	getUnits() : Observable<Unit[]> {
		return this._http.get("/api/units")
	  		.map(result => result.json())
	  		.map(res => <Unit[]>res.units);
	}

	getCuisines() : Observable<Cuisine[]> {
		return this._http.get("/api/cuisines")
	  		.map(result => result.json())
	  		.map(res => <Cuisine[]>res.cuisines);
	}

	getMainIngredients() : Observable<Ingredient[]> {
		return this._http.get("/api/main-ingredients")
	  		.map(result => result.json())
	  		.map(res => <Ingredient[]>res.mainIngredients);
	}

	getDirectionMethods() : Observable<DirectionMethod[]> {
		return this._http.get("/api/direction-methods")
	  		.map(result => result.json())
	  		.map(res => <DirectionMethod[]>res.directionMethods);
	}

}