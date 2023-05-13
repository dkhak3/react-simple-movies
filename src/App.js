import { Fragment, lazy, Suspense } from "react";
import "swiper/scss";
import { Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
import PageNotFound from "./components/layout/PageNotFound";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";
import Footer from "./components/layout/Footer";
import Signup from "./components/accounts/signup/Signup";
import Login from "./components/accounts/login/Login";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";

// dynamic import (dùng tới mới load)
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                  <ScrollToTop></ScrollToTop>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/movies"
              element={
                <>
                  <MoviePage></MoviePage>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/movie/:movieId"
              element={
                <>
                  <MovieDetailsPage></MovieDetailsPage>
                  <ScrollToTop></ScrollToTop>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
