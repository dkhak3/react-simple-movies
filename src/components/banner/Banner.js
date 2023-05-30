import React, { Fragment, useRef } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../../config";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import SlickMovie from "../slickMovie/SlickMovie";
import TooltipAdvanced from "../tooltip/TooltipAdvanced";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=3238cac8a852278ff6dd73e5ff77031e`,
    fetcher
  );

  const movies = data?.results || [];
  return (
    <SlickMovie quality={1} autoplay={true}>
      {movies.length > 0 &&
        movies.map((item) => (
          <SwiperSlide key={item.id}>
            <BannerItem item={item}></BannerItem>
          </SwiperSlide>
        ))}
    </SlickMovie>
  );
};

function BannerItem({ item }) {
  const { title, backdrop_path, id } = item;
  const navigate = useNavigate();

  const itemRef = useRef();

  const showToastMessage = (type) => {
    if (type === 1) {
      toast.success("Add to Favourite Success !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === 2) {
      toast.error("Add to Favourite failed !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleAddFavourite = async () => {
    const id = itemRef.current.id;
    try {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
        )
        .then((res) => {
          const account = JSON.parse(localStorage.getItem("account"));

          const favourite = account.favourite_movie.push(res.data);
          const update = { ...account, favourite };
          showToastMessage(1);
          return localStorage.setItem("account", JSON.stringify(update));
        });
    } catch (error) {
      showToastMessage(2);
      console.log(error);
    }
  };

  return (
    <section
      className="banner page-container mb-20 overflow-hidden h-[500px] relative"
      ref={itemRef}
      id={id}
    >
      <div className="w-full h-full rounded-lg relative">
        <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
        <img
          src={tmdbAPI.imageOriginal(backdrop_path)}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute left-5 bottom-5 w-full text-white">
          <h2 className="font-bold text-3xl mb-5">{title}</h2>
          <div className="flex items-center gap-x-3 mb-8">
            <GetGenres id={id}></GetGenres>
          </div>
          <Button bgColor="primary" onClick={() => navigate(`/movie/${id}`)}>
            Watch now
          </Button>
          <>
            <button
              onClick={handleAddFavourite}
              className="absolute left-40 rounded-lg border-white bg-[rgba(255,255,255,0.3)] text-white mx-auto"
            >
              <TooltipAdvanced>Add to Favorite</TooltipAdvanced>
            </button>
          </>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

function GetGenres({ id }) {
  const { data } = useSWR(tmdbAPI.getMovieById(id), fetcher);

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
