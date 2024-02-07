import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environment';
import { MovieService } from '../services/movie.service';
import { Movie } from 'src/models/Movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy{
  apiKey:string = environment.youtube_api_key;

  NOW_PLAYING_URL:string = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + this.apiKey;
  COMING_SOON_URL:string = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + this.apiKey;

  movies:Movie[] = [];

  private movieServiceFetchNowPlayingSubscription: Subscription;

  constructor(private movieService:MovieService) {}

  ngOnInit(): void {
    this.movieServiceFetchNowPlayingSubscription = this.movieService.fetchNowPlayingMovies().subscribe(response => {
      this.movies = response;
    });
  }

  ngOnDestroy(): void {
    this.movieServiceFetchNowPlayingSubscription.unsubscribe();
  }
}
