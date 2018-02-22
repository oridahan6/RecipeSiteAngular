import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Services
import { DataService } from './services/data.service';

import { AppComponent } from './app.component';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
  // ,
  // {
  //   path: 'recipes',
  //   component: PostsComponent
  // }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
