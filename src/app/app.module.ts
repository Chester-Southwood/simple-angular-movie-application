import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieService } from './services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './pipes/safe.pipe';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';
import { TruncateStringPipe } from './truncate-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    MovieDetailComponent,
    MoviesComponent,
    TruncateStringPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
