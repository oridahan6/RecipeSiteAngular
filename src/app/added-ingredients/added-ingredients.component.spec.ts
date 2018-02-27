import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedIngredientsComponent } from './added-ingredients.component';

describe('AddedIngredientsComponent', () => {
  let component: AddedIngredientsComponent;
  let fixture: ComponentFixture<AddedIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
