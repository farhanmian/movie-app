import axios from "axios";
import { movieType } from "./store/types";

export const fetchMovies = (url: string) => {
  return axios
    .get(url)
    .then((response) => {
      console.log(response);
      const data: movieType[] = [];
      response.data.data.results.map((item: movieType) => {
        const transformedData = {
          id: item.id,
          poster_path: item.poster_path,
          vote_average: item.vote_average,
        };
        data.push(transformedData);
      });
      return { data, total_pages: response.data.data.total_pages };
      //   setMoviesData(data);
      //   setTotalPages(response.data.data.total_pages);
      //   setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      //   setIsLoading(false);
      throw new Error(err);
    });
};

export const BaseUrl = "https://movie-task.vercel.app/api";
