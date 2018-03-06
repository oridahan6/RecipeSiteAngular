import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Ingredient } from '../model/ingredient';
import { Category } from '../model/category';
import { Unit } from '../model/unit';
import { Cuisine } from '../model/cuisine';

@Injectable()
export class DataService {

	result:any;

	constructor(private _http: Http) { }

	// add Observable<Recipe[]>
	getRecipes() {
		return this._http.get("/api/recipes")
	  		.map(result => this.result = result.json().data);
	}

	getCategories() : Observable<Category[]> {
		return this._http.get("/api/categories")
	  		.map(result => result.json())
	  		.map(res => <Category[]>res.categories);;
	}

	getUnits() : Observable<Unit[]> {
		return this._http.get("/api/units")
	  		.map(result => result.json())
	  		.map(res => <Unit[]>res.units);;
	}

	getCuisines() : Observable<Cuisine[]> {
		return this._http.get("/api/cuisines")
	  		.map(result => result.json())
	  		.map(res => <Cuisine[]>res.cuisines);;
	}

	getMainIngredients() : Observable<Ingredient[]> {
		return this._http.get("/api/main-ingredients")
	  		.map(result => result.json())
	  		.map(res => <Ingredient[]>res.mainIngredients);;
	}

}