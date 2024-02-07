import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { HttpClient } from '@angular/common/http';
import { Observable, first, map, of, tap } from "rxjs";
import { Movie } from "src/models/Movie";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class MovieService {
  apiKey:string = environment.youtube_api_key;

  NOW_PLAYING_URL:string = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + this.apiKey;
  COMING_SOON_URL:string = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + this.apiKey;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  fetchNowPlayingMovies(): Observable<Movie[]>  {
    return this.http
    .get<any>(this.NOW_PLAYING_URL)
    .pipe(
      tap(x=> {
      }),
      map(response => {
        const movies:Movie[] = [];
        response.results.forEach( item => {
          movies.push({
            title: item['title'],
            isAdultRated: JSON.parse(item['adult']),
            movieId: JSON.parse(item['id']),
            voteAverage: JSON.parse(item['vote_average']),
            backDropPath: item['backdrop_path'],
            overview: item['overview'],
            posterPath: item['poster_path'],
            originalLanguage: item['original_language'],
            originalTitle: item['original_title'],
            genreIds: Array.from(item['genre_ids']),
            isVideoTrailer: JSON.parse(item['video']),
            releaseDate: item['release_date'],
            voteCount: JSON.parse(item['vote_count']),
            popularity: JSON.parse(item['popularity']),
          })
        });
        return movies.slice();
      }));
  }


  getMovieUrl(id: number):Observable<string> {
     return this.http
    .get<string>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}`)
    .pipe(
      map(x=> {
         return x['results'][0]['key'];
      }),
      first(),
      )
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http
    .get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
    .pipe(
      tap(x=> {
      }),
      map(response => {
        const movie:Movie = {
          title: response['title'],
          isAdultRated: JSON.parse(response['adult']),
          movieId: JSON.parse(response['id']),
          voteAverage: JSON.parse(response['vote_average']),
          backDropPath: response['backdrop_path'],
          overview: response['overview'],
          posterPath: response['poster_path'],
          originalLanguage: response['original_language'],
          originalTitle: response['original_title'],
          genreIds: Array.from(response['genres']),
          isVideoTrailer: JSON.parse(response['video']),
          releaseDate: response['release_date'],
          voteCount: JSON.parse(response['vote_count']),
          popularity: JSON.parse(response['popularity'])
        }
        return movie;
      })
      )};


  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
