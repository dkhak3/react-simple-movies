import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";
import Button from "../components/button/Button";
import { NavLink, Navigate } from "react-router-dom";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container pb-20">
        <div className="flex items-center justify-between">
          <h2 className="lg:text-3xl xl:text-3xl text-xl capitalize text-primary mb-10  font-bold flex-1">
            Now playing <strong className="text-white">Movies</strong>
          </h2>
          <NavLink
            to="/movies"
            className="py-3 px-6 rounded-lg capitalize mt-auto bg-primary mb-10 lg:text-lg xl:text-lg text-sm"
          >
            See all
          </NavLink>
        </div>
        <MovieList optionsToast="1"></MovieList>
      </section>

      <section className="movies-layout page-container pb-20">
        <div className="flex items-center justify-between">
          <h2 className="lg:text-3xl xl:text-3xl text-xl capitalize text-primary mb-10 font-bold">
            Top rated <strong className="text-white">Movies</strong>
          </h2>
          <NavLink
            to="/movies"
            className="py-3 px-6 rounded-lg capitalize mt-auto bg-primary mb-10 lg:text-lg xl:text-lg text-sm"
          >
            See all
          </NavLink>
        </div>
        <MovieList optionsToast="1" type="movie/top_rated"></MovieList>
      </section>

      <section className="movies-layout page-container pb-20">
        <div className="flex items-center justify-between">
          <h2 className="lg:text-3xl xl:text-3xl text-xl capitalize text-primary mb-10 font-bold">
            Trending <strong className="text-white">Movies</strong>
          </h2>
          <NavLink
            to="/movies"
            className="py-3 px-6 rounded-lg capitalize mt-auto bg-primary mb-10 lg:text-lg xl:text-lg text-sm"
          >
            See all
          </NavLink>
        </div>
        <MovieList optionsToast="1" type="trending/movie/day"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
