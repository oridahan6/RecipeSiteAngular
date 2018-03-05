import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedPropertiesComponent } from './added-properties.component';

describe('AddedPropertiesComponent', () => {
  let component: AddedPropertiesComponent;
  let fixture: ComponentFixture<AddedPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
