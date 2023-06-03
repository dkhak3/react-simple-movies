import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { apiKey, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import TooltipAdvanced from "../tooltip/TooltipAdvanced";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const MovieCard = ({ item, options = "1", optionsToast = "2" }) => {
  const { title, vote_average, release_date, poster_path, id } = item;

  const navigate = useNavigate();

  const itemRef = useRef();

  const showToastMessage = (type) => {
    if (type === 1) {
      toast.success("Add to Favourite success", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === 2) {
      toast.error("Sign in to add movies to favourites", {
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

          if (account.sign_in) {
            let favourite = account.favourite_movie.push(res.data);

            const update = { ...account, favourite };
            showToastMessage(1);
            return localStorage.setItem("account", JSON.stringify(update));
          }
          showToastMessage(2);
        });
    } catch (error) {
      showToastMessage(2);
    }
  };

  return (
    <div
      className="movie-card relative flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full"
      ref={itemRef}
      id={id}
    >
      <img
        src={tmdbAPI.imageOriginal(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />

      {options === "1" && (
        <button
          onClick={handleAddFavourite}
          className="absolute right-5 top-5 rounded-lg bg-[rgba(0,0,0,0.5)] text-white mx-auto"
        >
          <TooltipAdvanced>Add to Favorite</TooltipAdvanced>
        </button>
      )}

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm mb-10">
          <span className="opacity-50">
            {new Date(release_date).getFullYear()}
          </span>
          <div className="flex">
            <span className="flex text-center justify-center opacity-50">
              {vote_average}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.43074 14.4147L7 12.4532L10.5693 14.4147C11.083 14.6971 11.6815 14.2374 11.5829 13.6362L10.9023 9.48853L13.7861 6.5502C14.204 6.12442 13.9749 5.37905 13.3993 5.29162L9.40997 4.68568L7.62678 0.908861C7.3694 0.363713 6.6306 0.363713 6.37322 0.908861L4.59003 4.68568L0.600728 5.29162C0.0251203 5.37905 -0.203981 6.12442 0.213886 6.5502L3.09765 9.48853L2.4171 13.6362C2.31846 14.2374 2.91697 14.6971 3.43074 14.4147Z"
                fill="#F9CB62"
              />
            </svg>
          </div>
        </div>
        <Button bgColor="primary" onClick={() => navigate(`/movie/${id}`)}>
          Watch now
        </Button>
      </div>
      <>{optionsToast === "2" && <ToastContainer />}</>
    </div>
  );
};

MovieCard.prototype = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  <p className="bg-red-50 text-red-400">
    Something went wrong with this component
  </p>;
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSkeleton width="100%" height="20px" />
        </h3>
        <div className="flex items-center justify-between text-sm mb-10">
          <span className="opacity-50">
            <LoadingSkeleton width="50px" height="10px" />
          </span>
          <div className="flex">
            <span className="flex text-center justify-center opacity-50">
              <LoadingSkeleton width="30px" height="10px" />
            </span>
            <LoadingSkeleton width="30px" height="10px" />
          </div>
        </div>
        <LoadingSkeleton width="100%" height="45px" radius="6px" />
      </div>
    </div>
  );
};
