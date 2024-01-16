import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar";
import Cards from "../../component/card";
import CardHome from "../../component/cardHome";
import hero from "../../assets/hero.png";
import banner from "../../assets/banner-left.png";
import Footer from "../../component/footer";
import { addData } from "../../store/reducer/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useApi from "../../helpers/useApi";
import axios from "axios";

function Home() {
  const api = useApi();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((s) => s.users);
  const navigate = useNavigate();

  const [month, setMonth] = useState([]);
  const [movie, setMovie] = useState([]);
  const [result, setResult] = useState([]);
  const [meta, setMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/users");
      dispatch(addData(data.data[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const getMoviesTop = async () => {
    try {
      await api({
        url: `/movie?month=${month}&page=${page}&limit=5&genre=${filter}&search=${search}`,
        method: "GET",
      }).then(({ data }) => {
        setMovie(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMovies = async () => {
    try {
      await api({
        url: `/movie?month=${month}&page=${page}&limit=5&genre=${filter}&search=${search}`,
        method: "GET",
      }).then(({ data }) => {
        setResult(data.data);
        setMeta(data.meta);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const inputMonth = (e) => {
    if (e.target.name !== "") {
      setMonth(e.target.name);
    } else {
      setMonth("");
      console.log(e);
    }
  };

  useEffect(() => {
    getMoviesTop();
  }, []);

  useEffect(() => {
    getMovies();
  }, [month, page]);

  useEffect(() => {
    fetchUser();
    if (!isAuth) navigate("/sign-in");
  }, []);

  return (
    <div className="container w-screen">
      <Navbar />

      <section className="w-screen md:px-10 mt-7">
        <div className="main-top md:flex md:flex-row md:justify-between md:items-center md:h-auto xs:flex xs:flex-col">
          <div className="part-sentence md:w-full">
            <img src={banner} className="w-4/6 mx-auto" alt="" />
          </div>
          <div className="part-banner w-full xs:mt-7">
            <img src={hero} className="mx-auto" alt="" />
          </div>
        </div>

        <div className="main-middle w-full px-10 py-10 bg-backgroundColor rounded-md md:gap-y-5">
          <div className="nowshowing-view-all flex flex-row justify-between">
            <span className="text-primary md:font-medium">
              <p>Now Showing</p>
            </span>
            <span className="text-primary">
              <p>
                <Link to="/view-all">view All</Link>
              </p>
            </span>
          </div>

          <div className="wrapper-card md:p-5 md:mx-5 gap-y-5 gap-x-5 sm:flex sm:flex-row sm:flex-wrap sm:justify-center xs:flex xs:flex-col xs:items-center">
            {movie ? (
              movie.map((v) => {
                return (
                  <CardHome
                    image={v.image_movie}
                    name={v.title_movie}
                    genre={v.genre}
                  />
                );
              })
            ) : (
              <div>Data Not Found</div>
            )}
          </div>

          <div className="nowshowing-view-all flex flex-row justify-between">
            <span className="text-primary md:font-medium">
              <p>Now Showing</p>
            </span>
            <span className="text-primary">
              <p>
                <Link to="/view-all">view All</Link>
              </p>
            </span>
          </div>

          <div className="month-viewing mt-5 flex flex-row overflow-x-scroll gap-x-4 xl:justify-center 2xl:justify-center lg:py-3 xl:overflow-x-hidden xl:py-4">
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="September"
            >
              {" "}
              September
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="October"
            >
              {" "}
              Oktober
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="November"
            >
              {" "}
              November
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="December"
            >
              {" "}
              December
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="January"
            >
              {" "}
              January
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="February"
            >
              {" "}
              February
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="March"
            >
              {" "}
              March
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="April"
            >
              {" "}
              April
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="May"
            >
              {" "}
              May
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="June"
            >
              {" "}
              June
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="July"
            >
              {" "}
              July
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer"
              onClick={inputMonth}
              name="August"
            >
              {" "}
              August
            </button>
          </div>

          <div className="wrapper-card md:p-5 gap-x-5 md:mx-5 md:flex md:flex-row md:flex-wrap md:justify-center xs:gap-y-5 xs:py-6 xs:flex xs:flex-col xs:items-center">
            {result ? (
              result.map((v) => {
                return (
                  <Cards
                    id={v.id_movie}
                    image={v.image_movie}
                    name={v.title_movie}
                    genre={v.genre}
                  />
                );
              })
            ) : (
              <h1>Data not found</h1>
            )}
          </div>

          <div className="pagination flex flex-row justify-center gap-x-5">
            {meta !== undefined ? (
              <>
                {meta.prev ? (
                  <>
                    <button
                      onClick={() => setPage(1)}
                      className={
                        '"bg-white text-[#5F2EEA] w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"'
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => {
                        setPage(meta.prev);
                      }}
                      className={
                        (page == meta.prev
                          ? "bg-[#5F2EEA] text-white"
                          : "bg-white text-[#5F2EEA]") +
                        " w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"
                      }
                    >
                      {" "}
                      {meta.prev}{" "}
                    </button>
                  </>
                ) : (
                  ""
                )}

                <button
                  key={page}
                  onClick={() => {
                    setPage(page);
                  }}
                  className={
                    "bg-[#5F2EEA] text-white w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"
                  }
                >
                  {" "}
                  {page}{" "}
                </button>
                {meta.next ? (
                  <>
                    <button
                      onClick={() => {
                        setPage(meta.next);
                      }}
                      className={
                        (page == meta.next
                          ? "bg-[#5F2EEA] text-white"
                          : "bg-white text-[#5F2EEA]") +
                        " w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white"
                      }
                    >
                      {" "}
                      {meta.next}{" "}
                    </button>

                    <button
                      onClick={() => setPage(meta.next)}
                      className={
                        '"bg-white text-[#5F2EEA] w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"'
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setPage(1)}
                  className={
                    '"bg-white text-[#5F2EEA] w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"'
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="card-marketing bg-white border mt-5 rounded-md md:w-4/5 md:mx-auto py-5">
            <span className="text-center md:text-xl">
              <p>Be the vanguard of the</p>
            </span>
            <span className="text-center text-primary md:text-5xl">
              <p>Moviegoers</p>
            </span>
            <form
              action=""
              className="my-5 md:flex md:flex-row md:justify-center md:gap-x-3 xs:flex xs:flex-col xs:items-center xs:gap-y-3"
            >
              <input
                type="text"
                className="rounded-md border border-border p-2 md:w-3/6 xs:w-4/5"
                placeholder="Type your email"
              />
              <button className=" border bg-primary rounded-md p-2 md:w-1/5 xs:w-4/5 text-white md:px-3">
                Join Now
              </button>
            </form>
            <span className="text-center w-full">
              <p className="w-3/5 mx-auto text-font text-sm xs:w-4/5 lg:w-3/6">
                By joining you as a Tickitz member, we will always send you the
                latest updates via email
              </p>
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
