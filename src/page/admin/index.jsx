import React, { useState, useEffect } from "react";
import Select from "react-select";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { useNavigate } from "react-router-dom";
import CardAdmin from "../../component/cardadmin";
import { useSelector } from "react-redux";
import useApi, { useApiMulti } from "../../helpers/useApi";
import { Show } from "../../helpers/toast";

function Index() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectGenre, setSelectGenre] = useState([]);
  const [image, setImage] = useState("https://fakeimg.pl/300x400");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [saveImage, setSaveImage] = useState(null);
  const [meta, setMeta] = useState([]);
  const [errors, setErrors] = useState({});
  const api = useApi();
  const apiMulti = useApiMulti();
  const navigate = useNavigate();

  const { isAuth } = useSelector((s) => s.users);

  const getMovies = async () => {
    try {
      const { data } = await api({
        url: `/movie?page=${page}&limit=12&genre=${filter}&search=${search}`,
        method: "GET",
      });
      setMovies(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(movies);

  const getGenres = async () => {
    try {
      const { data } = await api({
        url: `/genre/`,
        method: "GET",
      });
      setGenres(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [search, filter, page]);

  useEffect(() => {
    getGenres();
  }, []);

  const inputChange = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const imageChange = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.files[0];
    setSaveImage(data[e.target.name]);

    let uploaded = data[e.target.name];
    console.log(URL.createObjectURL(uploaded));

    setImage(URL.createObjectURL(uploaded));
  };

  const genreChange = (values) => setSelectGenre(values);
  const arr = selectGenre.map((v) => v.id_genre);
  console.log(arr);

  const validateForm = () => {
    const newErrors = {};

    if (arr.length == 0) {
      newErrors.id_genre = "This form must be field";
    }

    if (!form.title_movie) {
      newErrors.title_movie = "This form must be field";
    }

    if (!form.directed_by) {
      newErrors.directed_by = "This form must be field";
    }

    if (!form.casts_movie) {
      newErrors.casts_movie = "This form must be field";
    }

    if (!form.release_date) {
      newErrors.release_date = "This form must be field";
    }

    if (!form.duration) {
      newErrors.duration = "This form must be field";
    }

    if (!form.synopsis_movie) {
      newErrors.synopsis_movie = "This form must be field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addMovie = async () => {
    try {
      if (validateForm()) {
        const formData = new FormData();
        formData.append("image_movie", saveImage);
        formData.append("title_movie", form.title_movie);
        formData.append("directed_by", form.directed_by);
        formData.append("casts_movie", form.casts_movie);
        formData.append("release_date", form.release_date);
        formData.append("duration", form.duration);
        formData.append("synopsis_movie", form.synopsis_movie);
        for (var i = 0; i < arr.length; i++) {
          formData.append("id_genre[]", arr[i]);
        }

        await apiMulti({
          url: `/movie/insert`,
          method: "POST",
          data: formData,
        }).then((data) => {
          Show("Data Berhasil Ditambahkan", "success");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        });
      }
    } catch (er) {
      const axiosErr = er.response.data;
      if (axiosErr.message !== undefined) {
        Show(axiosErr.message, "warning");
      } else if (axiosErr.error !== undefined) {
        Show(axiosErr.error, "error");
      }
    }
  };

  const changeFilter = (e) => {
    if (e.target.value !== "All") {
      setFilter(e.target.value);
    } else {
      setFilter("");
    }
  };

  const changeSearch = (e) => {
    if (e.target.value !== "") {
      setSearch(e.target.value);
    } else {
      setSearch("");
    }
  };

  useEffect(() => {
    if (!isAuth) navigate("/sign-in");
  }, [isAuth]);

  return (
    <div>
      <Navbar />
      <section className="w-full px-10 py-10 bg-backgroundColor">
        <div className="font-semibold text-lg pb-5">
          <p>Form Insert Movie</p>
        </div>

        <div className="bg-white px-3 p-5">
          <div className="md:grid md:grid-cols-6 md:gap-x-5 lg:p-6">
            <div className="md:grid md:col-start-1 md:col-span-2 border-border border p-5 mx-auto gap-y-5">
              {/*<img className='mx-auto' src={card1} alt=''/> */}
              <div>
                <img src={image} alt="" className="img-thumbnail" />
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                name="image_movie"
                onChange={imageChange}
              />
            </div>

            <div className="md:grid md:col-start-3 md:col-span-6 xs:mt-5 md:mt-0">
              <div className="w-full md:grid md:grid-cols-2 md:gap-x-5">
                <form className="">
                  <label className="md:text-sm lg:text-md">Movie Name</label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="title_movie"
                    onChange={inputChange}
                  />
                  {errors.title_movie && (
                    <p className="text-red-500">{errors.title_movie}</p>
                  )}
                </form>
                <div classname="flex flex-row">
                  <Select
                    defaultValue={[getGenres[2], getGenres[3]]}
                    isMulti
                    name="id_genre"
                    onChange={genreChange}
                    options={genres.map((v) => {
                      return {
                        value: v,
                        label: v.genre_movie,
                        id_genre: v.id_genre,
                      };
                    })}
                    className="basic-multi-select mt-9"
                    classNamePrefix="select"
                    type="text"
                  />
                  {errors.id_genre && (
                    <p className="text-red-500">{errors.id_genre}</p>
                  )}
                </div>

                <form className="xs:mt-5 md:mt-0">
                  <label className="md:text-sm lg:text-md">Casts</label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="casts_movie"
                    onChange={inputChange}
                  />
                  {errors.casts_movie && (
                    <p className="text-red-500">{errors.casts_movie}</p>
                  )}
                </form>

                <form className="xs:mt-5 md:mt-0">
                  <label className="md:text-sm lg:text-md">Director</label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="directed_by"
                    onChange={inputChange}
                  />
                  {errors.directed_by && (
                    <p className="text-red-500">{errors.directed_by}</p>
                  )}
                </form>

                <form className="xs:mt-5 md:mt-0">
                  <label className="md:text-sm lg:text-md">Release Date</label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="release_date"
                    onChange={inputChange}
                  />
                  {errors.release_date && (
                    <p className="text-red-500">{errors.release_date}</p>
                  )}
                </form>

                <form className="xs:mt-5 md:mt-0">
                  <label className="md:text-sm lg:text-md">
                    Duration Movie
                  </label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="duration"
                    onChange={inputChange}
                  />
                  {errors.duration && (
                    <p className="text-red-500">{errors.duration}</p>
                  )}
                </form>
              </div>
            </div>
          </div>

          <form className="synopsis w-full mt-5">
            <label>Synopsis</label>
            <input
              type="text"
              className="border border-border rounded-md p-2 w-full mt-2"
              name="synopsis_movie"
              onChange={inputChange}
            />
            {errors.synopsis_movie && (
              <p className="text-red-500">{errors.synopsis_movie}</p>
            )}
          </form>

          <div className="w-full flex md:flex-row md:justify-end md:gap-x-10 mt-5 xs:flex-col xs:gap-y-5">
            {/**           <button onClick={reset_form} className='md:w-28 p-3 border rounded-md bg-primary text-white hover:bg-white hover:text-primary hover:shadow-lg hover:shadow-indigo-500/50'>
            Reset
          </button>*/}

            <button
              className="md:w-28 p-3 border rounded-md bg-primary text-white hover:bg-white hover:text-primary hover:shadow-lg hover:shadow-indigo-500/50"
              onClick={addMovie}
            >
              Insert
            </button>
          </div>
        </div>

        <div className="section-1 md:flex md:flex-row xs:flex xs:flex-col xs:gap-y-5 mt-7">
          <div className="w-2/4 md:flex md:items-center font-semibold md:text-xl">
            <p>List Data Movie</p>
          </div>

          <form className="w-full flex flex-row md:justify-end gap-x-5">
            <form className="">
              <select
                onChange={changeFilter}
                className="select select-bordered w-full max-w-xs"
              >
                <option selected>All</option>
                {genres.map((v) => {
                  return <option>{v.genre_movie}</option>;
                })}
              </select>
            </form>

            <form>
              <input
                onChange={changeSearch}
                className="border border-border p-3 rounded-md xs:w-full"
                placeholder="Search movie name.."
              />
            </form>
          </form>
        </div>

        <div className="bg-white mx-auto flex flex-wrap items-center justify-around p-5 m-10 gap-x-5 gap-y-5">
          {movies ? (
            movies.map((v) => {
              return (
                <CardAdmin
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
    </div>
  );
}

export default Index;
