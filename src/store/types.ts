export type movieType = {
  id: string;
  poster_path: string;
  vote_average: string;
};

export type movieDetailType = {
  id: string;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  title: string;
  genres: { name: string; id: number }[];
  overview: string;
  release_date: string;
  vote_average: string;
  spoken_languages: { english_name: string }[];
  status: string;
  tagline: string;
};
