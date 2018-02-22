import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

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

// Define the routes
const ROUTES = [
  { path: '', /* redirectTo: '/', */ pathMatch: 'full', component: HomeComponent },
  { path: 'recipes', component: RecipesListComponent },
  { path: 'add-recipe', component: AddRecipeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    AddRecipeComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    SharedModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
