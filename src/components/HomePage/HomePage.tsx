import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, Skeleton, Pagination } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styles from "./HomePage.module.css";
import { movieType } from "../../store/types";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageNumber = location.search.replace("?page=", "");
  console.log(pageNumber);

  const [moviesData, setMoviesData] = useState<movieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(pageNumber ? +pageNumber : 1);

  const skeletons = [0, 1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .get(`https://movie-task.vercel.app/api/popular?page=${page}`)
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
  }, [page]);

  useEffect(() => {
    if (pageNumber) {
      setPage(+pageNumber);
    }
  }, [pageNumber]);

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
                <Skeleton
                  key={item}
                  variant="rectangular"
                  width={"85%"}
                  height={"40rem"}
                />
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
      </div>
    </section>
  );
};

export default HomePage;
