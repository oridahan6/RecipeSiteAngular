import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { routing } from './app.routes';

// Services
import { DataService } from './services/data.service';

// Components
import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { HomeComponent } from './home/home.component';
import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import { AddedPropertiesComponent } from './added-properties/added-properties.component';
import { SelectUnitsComponent } from './select-units/select-units.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    AddRecipeComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    AddedPropertiesComponent,
    SelectUnitsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SharedModule,
    DndModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
