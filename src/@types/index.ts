import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Root: NavigatorScreenParams<MainParamList>;
};

export type TabsParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type MainParamList = {
  Principal: NavigatorScreenParams<TabsParamList>;
  MovieDetails: {
    id: number;
  };
};

export enum RequesterMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export type RequesterServiceModel = {
  method: RequesterMethodEnum;
  endpoint: string;
  timeout?: number;
  attempt?: number;
};

export type RequesterOptionsModel = {
  data?: any;
  headers?: any;
};

export type RequesterResponseModel = {
  success: boolean;
  status?: number;
  error: any;
  data: any;
};

export type ResultProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type DataProps = {
  page: number;
  results: ResultProps[];
  total_pages: number;
  total_results: number;
};

export type GenreProps = {
  id: number;
  name: string;
};

export type ProductionCompanyProps = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionContryProps = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguagesProps = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genre: GenreProps[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanyProps[];
  production_countries: ProductionContryProps[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesProps[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
