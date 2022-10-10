import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, Skeleton, Pagination } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styles from "./HomePage.module.css";
import { movieType } from "../../store/types";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../store/context/context";

const BaseUrl = "https://movie-task.vercel.app/api";

const MuiStyles = {
  "404Text": {
    fontSize: "30rem",
    fontWeight: "bold",
    color: "#B1DDEA",
    lineHeight: 1,
  },
};

const HomePage = () => {
  const ctx = useAppContext();
  const searchValue = ctx?.searchValue;
  const navigate = useNavigate();
  const location = useLocation();
  const pageNumber = location.search.replace("?page=", "");
  console.log(pageNumber);

  const [moviesData, setMoviesData] = useState<movieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(pageNumber ? +pageNumber : 1);

  const skeletons = [0, 1, 2, 3, 4, 5, 6, 7];

  /**
   * fetching data
   */
  useEffect(() => {
    if (searchValue && searchValue.trim().length > 0) return;
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchMovies(`${BaseUrl}/popular?page=${page}`);
  }, [page, searchValue]);

  /**
   * fetching search results
   */
  useEffect(() => {
    if (!searchValue || searchValue.trim().length === 0) return;
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchMovies(`${BaseUrl}/search?page=${page}&query=${searchValue}`);
  }, [page, searchValue]);

  useEffect(() => {
    if (pageNumber) {
      setPage(+pageNumber);
    }
  }, [pageNumber]);

  const fetchMovies = (url: string) => {
    axios
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
        setMoviesData(data);
        setTotalPages(response.data.data.total_pages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const pageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    navigate(`?page=${value}`);
  };

  // console.log("data", moviesData);

  return (
    <section className={styles.home}>
      <div className={styles.innerContainer}>
        <div className={styles.moviesContainer}>
          {!isLoading ? (
            moviesData.map((item) => (
              <Card
                key={item.id}
                className={styles.card}
                onClick={() => navigate(`/movie/${item.id}`)}
                // elevation={0}
                sx={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${item.poster_path})`,
                  backgroundSize: "cover",
                }}
              >
                <div className={styles.ratingContainer}>
                  <StarIcon fontSize="large" />
                  <Typography variant="subtitle2">
                    {item.vote_average}
                  </Typography>
                </div>

                <div className={styles.cardOverlay} />
              </Card>
            ))
          ) : (
            <>
              {skeletons.map((item) => (
                <div className={styles.movieSkeletonContainer} key={item}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {totalPages > 0 && (
          <div className={styles.paginationContainer}>
            <Pagination
              count={totalPages}
              color="primary"
              variant="outlined"
              onChange={pageChangeHandler}
            />
          </div>
        )}

        {!isLoading && moviesData.length === 0 && (
          <div className={styles.errorContainer}>
            <Typography variant="h1" sx={MuiStyles["404Text"]}>
              404
            </Typography>
            <Typography variant="h4" color="primary">
              There is no such movie
            </Typography>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
