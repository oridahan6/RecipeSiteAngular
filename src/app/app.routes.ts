import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

// Route Configuration
export const routes: Routes = [
  { path: '', /* redirectTo: '/', */ pathMatch: 'full', component: HomeComponent },
  { path: 'recipes', component: RecipesListComponent },
  { path: 'add-recipe', component: AddRecipeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);