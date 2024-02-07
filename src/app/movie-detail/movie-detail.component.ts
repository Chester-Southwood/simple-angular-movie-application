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
  movieTrailer:string;
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

    this.movieServiceGetMovieUrlSubscription = this.movieService.getMovieUrl(id).subscribe(trailer => {
      this.movieTrailer = `https://www.youtube.com/embed/${trailer}`
    })
  }

  ngOnDestroy(): void {
    this.movieServiceByIdSubscription.unsubscribe();
    this.movieServiceGetMovieUrlSubscription.unsubscribe();
  }



}
