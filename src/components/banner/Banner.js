import React, { Fragment } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=3238cac8a852278ff6dd73e5ff77031e`,
    fetcher
  );

  const movies = data?.results || [];
  return (
    <section className="banner page-container mb-20 overflow-hidden h-[500px]">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, backdrop_path, id } = item;
  const navigate = useNavigate();

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <GetGenres id={id}></GetGenres>
        </div>
        <button
          onClick={() => navigate(`/movie/${id}`)}
          className="py-3 px-6 rounded-lg bg-primary text-white font-medium"
        >
          Watch now
        </button>
      </div>
    </div>
  );
}

function GetGenres({ id }) {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${id}?api_key=3238cac8a852278ff6dd73e5ff77031e`,
    fetcher
  );

  if (!data) return null;
  const { genres } = data;
  if (!genres || genres.length <= 0) return null;
  return (
    <Fragment>
      {genres.map((item) => (
        <span
          className="py-2 px-4 border border-white rounded-lg"
          key={item.id}
        >
          {item.name}
        </span>
      ))}
    </Fragment>
  );
}

export default Banner;
