import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full'},
  { path: 'movies', component: MoviesComponent, pathMatch: 'full'},
  { path: 'movies/:id', component: MovieDetailComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
