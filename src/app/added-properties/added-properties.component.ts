import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Helper } from '../helpers/helper';

import { Ingredient } from '../model/ingredient';

@Component({
  selector: 'app-added-properties',
  templateUrl: './added-properties.component.html',
  styleUrls: ['./added-properties.component.scss']
})

// enum ObjectType {Ingredient = "ingredient", Direction = "direction"}

export class AddedPropertiesComponent implements OnInit {

	objectKeys = Object.keys;

	title: string;
	isIngredientsType: boolean;

	// @Input() objectType: ObjectType;
	@Input() objectType: string;

	@Input() addedObjects: {};
	@Input() selectedObjectsCategory: string;
	@Input() units: number[];

	@Output() objectRemovedEvent = new EventEmitter<{categoryName: string, removedObject: any}>();

	ngOnInit() {
		if (this.objectType == "ingredient"){
			this.title = "מצרכים";
			this.isIngredientsType = true;
		}
		if (this.objectType == "direction")
			this.title = "שלבי הכנה";
	}

	isEmptyAddedObjects() {
		return Helper.isAllObjectPropertiesEmpty(this.addedObjects);
	}

	removeObject(categoryName: string, object: {}) {
		this.objectRemovedEvent.emit({categoryName: categoryName, removedObject: object});
	}

	moveObject(object: {}, position: number) {
		// possubly that this function is not needed
		console.log('this.addedObjects',this.addedObjects);
	}

}
