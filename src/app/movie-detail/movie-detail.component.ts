import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from 'src/models/Movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy{
  movie:Movie;
  movieTrailers:string[] = [];
  movieTrailerIndex:number = 0;
  starCount: number[];
  remainingStarCount: number[];

  private movieServiceByIdSubscription: Subscription;
  private movieServiceGetMovieUrlSubscription: Subscription;

  constructor(private activeRoute:ActivatedRoute, private movieService: MovieService) {
  }

  ngOnInit(): void {
    const id:number = +this.activeRoute.snapshot.params['id'];
    this.movieServiceByIdSubscription = this.movieService.getMovieById(id).subscribe(movie => {
      this.movie = movie;
      this.starCount = Array(Math.round(this.movie.voteAverage)).fill(0).map((x,i)=>i)
      this.remainingStarCount = Array(Math.round(10 - this.movie.voteAverage)).fill(0).map((x,i)=>i)
    });

    const trailerCount: number = 4;
    this.movieServiceGetMovieUrlSubscription = this.movieService.getMovieUrls(id, trailerCount).subscribe(trailers => {
      let movieTrailers:string[] = [];
      for (let index = 0; index < trailers.length; index++) {
        movieTrailers.push(`https://www.youtube.com/embed/${trailers[index]}`);
      }
      this.movieTrailers = movieTrailers;
      this.movieTrailerIndex = 0;//Math.floor(Math.random() * trailerCount)
    })
  }

  ngOnDestroy(): void {
    this.movieServiceByIdSubscription.unsubscribe();
    this.movieServiceGetMovieUrlSubscription.unsubscribe();
  }

  updateVideo(event: Event) {
    this.movieTrailerIndex = +event.target['value'];
  }

}
