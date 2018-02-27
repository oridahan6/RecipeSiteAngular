import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-units',
  templateUrl: './select-units.component.html',
  styleUrls: ['./select-units.component.css']
})
export class SelectUnitsComponent implements OnInit {

	@Input() units: string[];

	@Input() selectedUnit: string;

	constructor() { }

	ngOnInit() {
	}

}
