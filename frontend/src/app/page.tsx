"use client";
import Image from "next/image";
import styles from "@/styles/home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Object[]>([]);
  const [movieTitle, setMovieTitle] = useState<any>([]);
  const [recMovies, setRecMovies] = useState<string[]>([]);
  const [recGenres, setRecGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const recommend_movies = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/recommend/${movieTitle}`
      );
      const data = await response.json();
      console.log(data);
      setRecMovies(data.recommended_movies.titles);
      setRecGenres(data.recommended_movies.genres);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="container_bg">
      <div className={styles.container}>
        <div className={styles.content_left}>
          <div className={styles.header_left}>
            <div className="text-4xl font-extrabold text-red-500">ROBOFLIX</div>
          </div>

          <div className={styles.left_inner_content}>
            <div className={styles.l_s_bar}>
              <ul className={styles.l_s_div}>
                <li className={styles.l_s}>
                  <Image
                    src="/settings.png"
                    alt="settings"
                    width={25}
                    height={20}
                    priority={true}
                  />
                  App Settings
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.content_middle}>
          <div className={styles.header_middle}>
            <ul className={styles.options_bg}>
              <li className={styles.options}>Home</li>
            </ul>
          </div>

          <div className={styles.middle_inner_content}>
            <div>
              <h1 className="text-2xl">movie title</h1>
              <ul>
                {movies.map((movie: any) => (
                  <li key={movie.movieId}>{movie.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.content_right}>
          <div className={styles.header_right}>
            <div className={styles.search_bar_div}>
              <input
                className={styles.search_bar}
                placeholder="search"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    recommend_movies();
                  }
                }}
              />
              {/* <Image
                alt="search"
                src="/search.png"
                height={20}
                width={20}
                priority={true}
                className={styles.search_icon}
              /> */}
            </div>
          </div>

          <div className={styles.right_inner_content}>
            <ul>
              {recMovies.length > 0 ? (
                recMovies.map((movie, index) => (
                  <li key={index}>
                    <strong>{movie}</strong>
                    <div>Genres: {recGenres[index]}</div>
                  </li>
                ))
              ) : (
                <li>No movies to display. Search any movie from the left to see the recommended movies, you need to input the full name.

                for now the dataset is only trained on 27 movies, lol

                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
