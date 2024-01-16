import React, { useState, useEffect } from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Cards from "../../component/card";
import axios from "axios";
import useApi from "../../helpers/useApi";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../../store/reducer/user";
import { useNavigate } from "react-router-dom";

function View() {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((s) => s.users);

  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState([]);
  const [month, setMonth] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/users/");
      dispatch(addData(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // const getMovies = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:5200/movie?month=${month}&page=${page}&limit=10&genre=${filter}&search=${search}`
  //     );
  //     setMovies(data.data);
  //     setMeta(data.meta);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getMovies = async () => {
    try {
      const { data } = await api({
        url: `/movie?month=${month}&page=${page}&limit=10&genre=${filter}&search=${search}`,
        method: "GET",
      });
      setMovies(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    }
  };

  // const getGenres = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:5200/genre/");
  //     setGenres(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getGenres = async () => {
    try {
      const { data } = await api({
        url: "/genre/",
        method: "GET",
      });
      setGenres(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(()=>{
  //     if(!isAuth){
  //         fetchUser()
  //     }
  // },[])

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    getMovies();
  }, [filter, search, page, month]);

  const changeFilter = (e) => {
    if (e.target.value !== "All") {
      setFilter(e.target.value);
    } else {
      setFilter("");
      console.log(e);
    }
  };

  const inputChange = (e) => {
    if (e.target.value !== "") {
      setSearch(e.target.value);
    } else {
      setSearch("");
      console.log(e);
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
    if (!isAuth) navigate("/");
  }, [isAuth]);

  return (
    <>
      <Navbar />

      <section className="bg-graysmoth px-5 w-full me-5">
        <div className="mx-auto flex flex-col max-w-7xl items-center justify-between p-5 py-10">
          <div className="md:flex md:flex-row justify-between w-full md:items-center xs:flex xs:flex-col">
            <h2 className="md:text-2xl xs:text-1xl font-medium xs:py-5">
              List Movie
            </h2>
            <div className="md:flex md:w-7/12 max-w-8xl justify-end xs:flex xs:flex-col md:flex-row xs:w-full xs:gap-y-5">
              <select
                onChange={changeFilter}
                className="select select-bordered max-w-screen justify-end"
              >
                <option selected>All</option>
                {genres.map((v) => {
                  return <option>{v.genre_movie}</option>;
                })}
              </select>
              <input
                type="text"
                name="search"
                placeholder="Search Movie Name"
                className="input input-bordered max-w-screen"
                onChange={inputChange}
              />
            </div>
          </div>
        </div>
        <div className="mx-auto flex flex-col max-w-7xl items-center justify-between xs:overflow-x-scroll lg:overflow-x-hidden">
          <div className="flex justify-between w-full items-center xs:gap-x-5">
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer  focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="September"
            >
              {" "}
              September
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="October"
            >
              {" "}
              Oktober
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="November"
            >
              {" "}
              November
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="December"
            >
              {" "}
              December
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="January"
            >
              {" "}
              January
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="February"
            >
              {" "}
              February
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="March"
            >
              {" "}
              March
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="April"
            >
              {" "}
              April
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="May"
            >
              {" "}
              May
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="June"
            >
              {" "}
              June
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="July"
            >
              {" "}
              July
            </button>
            <button
              className="xs:text-sm xs:p-1 xs:flex xs:items-center xs:px-3 md:text-xs lg:text-sm xl:text-lg border border-primary md:p-1 md:px-3 rounded-md hover:text-white hover:bg-primary hover:cursor-pointer focus:bg-primary focus:text-white"
              onClick={inputMonth}
              name="August"
            >
              {" "}
              August
            </button>
          </div>
        </div>
        <div className="bg-backgroundColor mx-auto flex flex-wrap	max-w-7xl items-center justify-around p-5 m-10 gap-x-5 gap-y-5">
          {movies ? (
            movies.map((v) => {
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
      </section>

      <Footer />
    </>
  );
}

export default View;
