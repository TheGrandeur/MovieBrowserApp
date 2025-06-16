// types/navigation.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  [key: string]: any; // to allow other dynamic fields
}

export type RootStackParamList = {
  Home: undefined;
  Favorites: undefined;
  MovieDetailScreen: { item: Movie };
};