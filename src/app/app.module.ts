import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// External modules
import { DndModule } from 'ng2-dnd';
import { NgSelectModule } from '@ng-select/ng-select';

import { routing } from './app.routes';

// Services
import { DataService } from './services/data.service';

// Helpers
import './helpers/extensions.ts';

// Components
import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { HomeComponent } from './home/home.component';
import {
	FooterComponent,
	HeaderComponent,
	AlertComponent,
	AlertService,
	SharedModule
} from './shared';
import { AddedPropertiesComponent } from './added-properties/added-properties.component';
import { SelectUnitsComponent } from './select-units/select-units.component';
import { RecipeComponent } from './recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    AddRecipeComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    AddedPropertiesComponent,
    SelectUnitsComponent,
    AlertComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SharedModule,
    DndModule.forRoot(),
    NgSelectModule
  ],
  providers: [
  	DataService,
  	AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
