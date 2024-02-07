export interface Movie {
  movieId:number ;
  voteAverage: number;
  backDropPath: string;
  overview: string;
  posterPath: string;
  title: string;
  popularity: number;
  voteCount: number;
  releaseDate:string;
  originalLanguage: string;
  originalTitle: string;
  isAdultRated: boolean;
  genreIds: number[];
  isVideoTrailer:boolean;
}
