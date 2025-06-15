// types/navigation.ts

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export type RootStackParamList = {
  Home: undefined;
  MovieDetailScreen: { item: Movie };
  Favorites: undefined;
};