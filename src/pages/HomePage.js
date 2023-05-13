import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container pb-20">
        <div className="flex items-center justify-between">
          <h2 className="capitalize text-primary mb-10 text-3xl font-bold flex-1">
            Now playing <strong className="text-white">Movies</strong>
          </h2>
          <a
            href="/movies"
            className="py-3 px-6 rounded-lg capitalize mt-auto bg-primary mb-10"
          >
            See all
          </a>
        </div>
        <MovieList></MovieList>
      </section>

      <section className="movies-layout page-container pb-20">
        <div className="flex items-center justify-between">
          <h2 className="capitalize text-primary mb-10 text-3xl font-bold">
            Top rated <strong className="text-white">Movies</strong>
          </h2>
          <a
            href="/movies"
            className="py-3 px-6 rounded-lg capitalize mt-auto bg-primary mb-10"
          >
            See all
          </a>
        </div>
        <MovieList type="movie/top_rated"></MovieList>
      </section>

      <section className="movies-layout page-container pb-20">
        <div className="flex items-center justify-between">
          <h2 className="capitalize text-primary mb-10 text-3xl font-bold">
            Trending <strong className="text-white">Movies</strong>
          </h2>
          <a
            href="/movies"
            className="py-3 px-6 rounded-lg capitalize mt-auto bg-primary mb-10"
          >
            See all
          </a>
        </div>
        <MovieList type="trending/movie/day"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
