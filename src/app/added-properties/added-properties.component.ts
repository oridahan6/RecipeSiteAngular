import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../models/ingredient';

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

	removeObject(categoryName: string, object: {}) {
		console.log("object", object);
		console.log('categoryName',categoryName);
		this.objectRemovedEvent.emit({categoryName: categoryName, removedObject: object});
	}

	moveObject(object: {}, position: number) {
		// possubly that this function is not needed
		console.log('this.addedObjects',this.addedObjects);
	}

	objectNameChanged(changedObject: {}, newValue: string) {
		this.addedObjects[this.selectedObjectsCategory].forEach((addedObject, index) => {
			if (addedObject.hasOwnProperty("name") && changedObject.hasOwnProperty("name")) {
				var addedObjectIng = addedObject as Ingredient;
				var changedObjectIng = changedObject as Ingredient;
				if (addedObjectIng.name === changedObjectIng.name) {
					addedObjectIng.name = newValue;
				}
			} else if (addedObject == changedObject) {
				addedObject = newValue;
			}
			
		});
	}

	objectQtyChanged(changedObject: {}, newValue: string) {
		this.addedObjects[this.selectedObjectsCategory].forEach((addedObject, index) => {
			if (addedObject.hasOwnProperty("name") && changedObject.hasOwnProperty("name")) {
				var addedObjectIng = addedObject as Ingredient;
				var changedObjectIng = changedObject as Ingredient;
				if (addedObjectIng.name === changedObjectIng.name) {
					addedObjectIng.quantity = newValue
				}
			}
		});
	}

}
