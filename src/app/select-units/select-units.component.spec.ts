import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUnitsComponent } from './select-units.component';

describe('SelectUnitsComponent', () => {
  let component: SelectUnitsComponent;
  let fixture: ComponentFixture<SelectUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
