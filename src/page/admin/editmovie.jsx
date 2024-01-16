import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../component/navbar.jsx";
import Footer from "../../component/footer";
import Select from "react-select";
import useApi, { useApiMulti } from "../../helpers/useApi.jsx";
import { useNavigate } from "react-router-dom";
import { Show } from "../../helpers/toast.jsx";
import { useSelector } from "react-redux";
import noImage from "../../assets/noimage.png";

function EditMovie() {
  const api = useApi();
  const [form, setForm] = useState([]);
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectGenre, setSelectGenre] = useState([]);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(movie ? movie.image_movie : "");
  const [imageReader, setImageReader] = useState("https://fakeimg.pl/300x400");
  const imgRef = useRef(null);

  const navigate = useNavigate();

  const params = useParams();
  const apiMulti = useApiMulti();
  const paramsId = params.id;
  const { isAuth } = useSelector((s) => s.users);

  const inputChange = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const detailMovie = async () => {
    try {
      const { data } = await api({
        url: `/movie/detail/${paramsId}`,
        method: "GET",
      });
      setMovie(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

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
    detailMovie();
  }, []);

  useEffect(() => {
    getGenres();
  }, []);

  const genreChange = (values) => setSelectGenre(values);
  const arr = selectGenre.map((v) => v.id_genre);

  const validateForm = () => {
    const newErrors = {};

    if (image == undefined) {
      setImage("https://fakeimg.pl/300x400");
    }

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

  const check_image = async () => {
    if (image != undefined) {
      if (image.name) {
        if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
          Show("Please select valid image (jpg|jpeg|png).", "error");
          setImageReader("");
          setImage("");
        }
      }
    }
  };

  const updateMovie = async (e) => {
    try {
      if (validateForm()) {
        const formData = new FormData();
        formData.append("image_movie", image);
        formData.append("title_movie", form.title_movie);
        formData.append("directed_by", form.directed_by);
        formData.append("casts_movie", form.casts_movie);
        formData.append("release_date", form.release_date);
        formData.append("duration", form.duration);
        formData.append("synopsis_movie", form.synopsis_movie);
        for (var i = 0; i < arr.length; i++) {
          formData.append("genre[]", arr[i]);
        }

        await apiMulti({
          method: "put",
          url: `/movie/edit/${paramsId}`,
          data: formData,
        }).then((data) => {
          Show("Data Berhasil Diupdate", "success");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        });
      } else {
        Show("Plese check again", "error");
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

  useEffect(() => {
    if (!isAuth) navigate("/sign-in");
  }, [isAuth]);

  useEffect(() => {
    check_image();
  }, [image]);

  return (
    <div>
      <Navbar />

      <section className="bg-backgroundColor w-full px-10 py-10">
        <div className="font-semibold text-lg pb-5">
          <p>Form Edit Movie</p>
        </div>

        <div className="bg-white px-3 p-5">
          <div className="md:grid md:grid-cols-6 md:gap-x-5 lg:p-6">
            <div className="md:grid md:col-start-1 md:col-span-2 border-border border p-5 mx-auto gap-y-5">
              {/*<img className='mx-auto' src={card1} alt=''/> */}
              <div>
                <img
                  src={
                    imageReader == ""
                      ? image == ""
                        ? noImage
                        : image
                      : imageReader
                  }
                  alt=""
                  className="img-thumbnail"
                />
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                name="image_movie"
                accept="image/*"
                ref={imgRef}
                multiple
                onChange={(e) => [
                  setImage(e.target.files[0]),
                  setImageReader(URL.createObjectURL(e.target.files[0])),
                ]}
              />
            </div>

            <div className="md:grid md:col-start-3 md:col-span-6 xs:mt-5 md:mt-0">
              <div className="w-full md:grid md:grid-cols-2 md:gap-x-5">
                <form className="">
                  <label className="md:text-sm lg:text-md">Movie Name</label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="title_movie"
                    placeholder={movie.title_movie}
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
                    name="genre"
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
                  <label className="md:text-sm lg:text-md">Director</label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="directed_by"
                    placeholder={movie.directed_by}
                    onChange={inputChange}
                  />
                  {errors.directed_by && (
                    <p className="text-red-500">{errors.directed_by}</p>
                  )}
                </form>

                <form className="xs:mt-5 md:mt-0">
                  <label className="md:text-sm lg:text-md">Casts</label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="casts_movie"
                    placeholder={movie.casts_movie}
                    onChange={inputChange}
                  />
                  {errors.casts_movie && (
                    <p className="text-red-500">{errors.casts_movie}</p>
                  )}
                </form>

                <form className="xs:mt-5 md:mt-0">
                  <label className="md:text-sm lg:text-md">Release Date</label>
                  <input
                    className="border border-border rounded-md p-2 w-full mt-2"
                    name="release_date"
                    placeholder={movie.release_date}
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
                    placeholder={movie.duration}
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
              placeholder={movie.synopsis_movie}
              onChange={inputChange}
            />
            {errors.synopsis_movie && (
              <p className="text-red-500">{errors.synopsis_movie}</p>
            )}
          </form>

          <div className="w-full flex md:flex-row md:justify-end md:gap-x-10 mt-5 xs:flex-col xs:gap-y-5">
            <button
              className="md:w-28 p-3 border rounded-md bg-primary text-white hover:bg-white hover:text-primary hover:shadow-lg hover:shadow-indigo-500/50"
              onClick={updateMovie}
            >
              Submit
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EditMovie;
