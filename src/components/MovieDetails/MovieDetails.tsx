import React, { useState, useEffect } from "react";
import styles from "./MovieDetails.module.css";
import { Typography, Card, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

import { movieDetailType } from "../../store/types";
import axios from "axios";
import { Img_BaseUrl } from "../../utils";

const MuiStyles = {
  genreItem: {
    padding: ".7rem 1.2rem",
    borderRadius: 20,
    backgroundColor: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    fontSize: "1.4rem",
    textTransform: "uppercase",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: 0.8,
    wordSpacing: 3,
    transition: "all .2s",

    ":hover": {
      backgroundColor: "rgba(255, 255, 255, .2)",
    },
  },
  heading: {
    textTransform: "uppercase",
    color: "#fff",
    marginBottom: "1.5rem",
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<movieDetailType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .get(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
      .then((response) => {
        console.log(response);
        const data = response.data.data as movieDetailType;

        setMovieData({
          backdrop_path: data.backdrop_path,
          genres: data.genres,
          title: data.title,
          id: data.id,
          original_title: data.original_title,
          overview: data.overview,
          poster_path: data.poster_path,
          release_date: data.release_date,
          spoken_languages: data.spoken_languages,
          status: data.status,
          tagline: data.tagline,
          vote_average: data.vote_average,
        });

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <section className={styles.movieDetails}>
      {/* image container */}
      <div
        className={styles.movieBgImg}
        style={{
          backgroundImage: !isLoading
            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${Img_BaseUrl}${movieData?.backdrop_path})`
            : "",
        }}
      >
        {isLoading && (
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"100%"}
            sx={{ backgroundColor: "#222 !important" }}
          />
        )}
      </div>
      {/* basic details container */}
      <div className={styles.contentContainer}>
        <div className={styles.contentInnerContainer}>
          <div className={styles.posterImgContainer}>
            {!isLoading && (
              <img
                src={`${Img_BaseUrl}${movieData?.poster_path}`}
                alt="poster"
                className={styles.posterImg}
              />
            )}
            {isLoading && (
              <Skeleton
                variant="rectangular"
                width={"20rem"}
                height={"30rem"}
                // sx={{ background: "#333" }}
              />
            )}
          </div>
          {/* text */}
          <div className={styles.movieBasicDetailsContainer}>
            {!isLoading ? (
              <Typography
                variant="h2"
                fontWeight={"bold"}
                color="primary"
                className={styles.movieName}
              >
                {movieData?.title}
              </Typography>
            ) : (
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: 2 }}
                height={"5rem"}
                width={"40rem"}
              />
            )}
            <div className={styles.genreContainer}>
              {!isLoading ? (
                movieData?.genres.map((item) => (
                  <Card key={item.id} sx={MuiStyles.genreItem}>
                    {item.name}
                  </Card>
                ))
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{ borderRadius: 2 }}
                  height={"5rem"}
                  width={"40rem"}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* textContainer */}
      <div className={styles.textContainer}>
        <div className={styles.storyContainer}>
          {!isLoading ? (
            <>
              <Typography variant="h6" color="primary" sx={MuiStyles.heading}>
                Story
              </Typography>
              <Typography variant="subtitle1" color={"secondary"}>
                {movieData?.overview}
              </Typography>
            </>
          ) : (
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: 2 }}
              height={"8rem"}
              width={"100%"}
            />
          )}
        </div>

        {!isLoading ? (
          <div>
            <Typography variant="h6" color="primary" sx={MuiStyles.heading}>
              Details
            </Typography>

            <Typography variant="subtitle1" color={"secondary"}>
              Status: {movieData?.status}
            </Typography>
            <Typography variant="subtitle1" color={"secondary"}>
              Release Date: {movieData?.release_date}
            </Typography>
            <Typography variant="subtitle1" color={"secondary"}>
              Spoken language:{" "}
              {movieData?.spoken_languages.map((item, i) =>
                movieData?.spoken_languages.length === i + 1
                  ? item.english_name
                  : `${item.english_name}, `
              )}
            </Typography>
          </div>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: 2 }}
            height={"12rem"}
            width={"100%"}
          />
        )}
      </div>
    </section>
  );
};

export default MovieDetails;
