import React, { useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import Button from "../components/button/Button";
import MoreMovie from "../components/movie/MoreMovie";
import TooltipAdvanced from "../components/tooltip/TooltipAdvanced";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieById(movieId), fetcher);

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
    const id = movieId;
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

  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[400px] lg:h-[600px] relative mb-10">
        <div className="overlay absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>

      <div className="page-container mx-auto">
        <div className="lg:flex mb-10">
          <div className="h-[400px] lg:w-[800px] -mt-[200px] relative z-10 pb-10">
            <img
              src={tmdbAPI.imageOriginal(poster_path)}
              className="h-full object-cover rounded-xl mx-auto"
              alt=""
            />
          </div>

          <div className="flex-col lg:-mt-[100px] relative z-10 ml-5 ">
            <h1 className="text-4xl font-bold text-white mb-5">{title}</h1>
            <div className="genres-list">
              <Swiper
                grabCursor={"true"}
                spaceBetween={20}
                slidesPerView={"auto"}
              >
                {genres.map((item) => (
                  <SwiperSlide key={item.id}>
                    <GenresItem item={item}></GenresItem>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <p className="leading-relaxed mx-auto">{overview}</p>
            <button
              onClick={handleAddFavourite}
              className="mt-5 rounded-lg bg-[rgba(0,0,0,0.5)] text-white mx-auto"
            >
              <TooltipAdvanced>Add to Favorite</TooltipAdvanced>
            </button>
          </div>
        </div>

        <MovieMeta type="credits"></MovieMeta>
        <MovieMeta type="videos"></MovieMeta>
        <MovieMeta type="similar"></MovieMeta>
      </div>
      <ToastContainer />
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const navigate = useNavigate();

  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);

  if (!data) return null;

  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="">
        <h2 className="text-3xl font-medium mb-10">Casts</h2>
        <div className="cast-list">
          <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
            {cast.map((item) => (
              <SwiperSlide key={item.id}>
                <CreditsItem item={item}></CreditsItem>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  } else {
    const { results } = data;

    if (!results || results.length <= 0) return null;

    if (type === "videos") {
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div className="" key={item.id}>
                <div className="flex justify-between">
                  <h2 className="text-3xl font-medium mb-10">Trailer</h2>
                  {/* <NavLink
                    to="/viewmore"
                    className="py-3 px-6 rounded-lg capitalize mt-auto bg-primary mb-10 lg:text-lg xl:text-lg text-sm"
                  >
                    See all
                  </NavLink> */}
                  <Button
                    bgColor="primary"
                    onClick={() => navigate(`/movies/${movieId}`)}
                  >
                    Watch more
                  </Button>
                  {/* <Button onClick={() => MoreMovie(item.id)}>More</Button> */}
                </div>
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="1280"
                    height="720"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

function CreditsItem({ item }) {
  const { profile_path, name } = item;
  return (
    <div className="flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none cast-item">
      <img
        src={tmdbAPI.imageOriginal(profile_path)}
        className="lg:w-[211px] h-[270px] object-cover rounded-lg"
        alt={name}
      />
      <h3 className="text-xl font-medium">{name}</h3>
    </div>
  );
}

function GenresItem({ item }) {
  const { name } = item;
  return (
    <div className="flex items-center gap-x-5 mb-5 genre-item">
      <span className="py-2 px-4 border-primary text-primary border rounded">
        {name}
      </span>
    </div>
  );
}

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="">
      <h2 className="text-3xl font-medium mb-10">Casts</h2>
      <div className="cast-list">
        <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
          {cast.map((item) => (
            <SwiperSlide key={item.id}>
              <CreditsItem item={item}></CreditsItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 1).map((item) => (
          <div className="" key={item.id}>
            <h2 className="text-3xl font-medium mb-10">Trailer</h2>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="1280"
                height="720"
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
