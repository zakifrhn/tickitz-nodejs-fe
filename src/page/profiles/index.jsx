import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { Link } from "react-router-dom";
import { Show } from "../../helpers/toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApi from "../../helpers/useApi";
import { useApiMulti } from "../../helpers/useApi";
import noImage from "../../assets/noimage.png";
import loyalty from "../../assets/loyalty.PNG";
import { addData } from "../../store/reducer/user";

const ProfileUser = () => {
  const { data, isAuth } = useSelector((s) => s.users);
  const dispatch = useDispatch();
  const navigates = useNavigate();
  const api = useApi();
  const apiMulti = useApiMulti();
  const [errors, setErrors] = useState({});
  const [errorPassword, setErrorPassword] = useState({});
  const [fullname, setFullname] = useState([]);
  const [image, setImage] = useState(data ? data.image_user : "");
  const [imageReader, setImageReader] = useState("");
  const imgRef = useRef(null);

  const [cpass, setCpass] = useState(true);
  const [cpass1, setCpass1] = useState(true);
  const click_pass = () => {
    setCpass(cpass == true ? false : true);
  };

  const click_pass1 = () => {
    setCpass1(cpass1 == true ? false : true);
  };

  const fetchUser = async () => {
    try {
      const { data } = await api({
        url: `/users`,
        method: "GET",
      });
      dispatch(addData(data.data[0]));
      setFullname(data.data[0].fullname.split(" "));
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstname) {
      newErrors.firstname = "This form must be field";
    }

    if (!form.lastname) {
      newErrors.lastname = "This form must be field";
    }

    if (!form.phone_number) {
      newErrors.phone_number = "This form must be field";
    }

    if (form.pass) {
      if (form.pass.length < 8) {
        newErrors.pass = "Password must be at least 8 characters long";
      }
    }
    if (form.pass && form.pass1 !== form.pass) {
      newErrors.pass1 = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (form.pass.length < 8) {
      newErrors.pass = "Password must be at least 8 characters long";
    }
    if (form.pass && form.pass1 !== form.pass) {
      newErrors.pass1 = "Passwords do not match";
    }

    setErrorPassword(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [form, setForm] = useState({});
  const inputChange = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image_user", image);

      await apiMulti({
        url: "/users/update/img",
        method: "PUT",
        data: formData,
      });
      Show("Image updated successfully", "success");
      setTimeout(() => {
        navigates("/");
      }, 3000);
      setImageReader("");
    } catch (error) {
      console.error("Error updating image:", error);
      Show("Error updating image", "error");
    }
  };

  const check_image = async () => {
    if (image != null) {
      if (image.name) {
        if (!image.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
          Show(
            "Please select valid image (jpg|JPG|jpeg|JPEG|png|PNG).",
            "error"
          );
          setImageReader("");
          setImage("");
        }
      }
    }
  };

  const updateUser = async () => {
    if (validateForm()) {
      await api({
        method: "PATCH",
        url: "/users",
        data: form,
      })
        .then((data) => {
          Show("Data Berhasil di update", "success");
          setTimeout(() => {
            navigates("/");
          }, 3000);
        })
        .catch((error) => {
          Show(error, "error");
        });
    }
  };

  const updateData = {
    pass: form.pass,
  };

  const updatePassword = async () => {
    try {
      if (validatePassword()) {
        await api({
          url: "/users",
          method: "PUT",
          data: updateData,
        })
          .then((data) => {
            console.log(data);
            Show("Password has been updated", "success");
            setTimeout(() => {
              navigates("/sign-in");
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
            Show(error, "error");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {}, [imageReader]);

  useEffect(() => {
    check_image();
  }, [image]);

  useEffect(() => {
    if (!isAuth) {
      navigates("/");
    }
  }, [isAuth]);

  return (
    <div>
      <Navbar />

      <main className="bg-backgroundColor relative w-full flex flex-col lg:flex-row mx-auto py-5 px-10 gap-x-10 ">
        <div className="lg:hidden bg-white rounded-lg py-5 px-5 mb-5 flex flex-row justify-around">
          <Link
            to="/profiles"
            className="font-medium border-b-2 border-blue-700"
          >
            Account Settings
          </Link>
          <Link to="/profiles/history">Order History</Link>
        </div>
        <div className="w-full lg:w-1/4 bg-white rounded-lg flex flex-col items-center pt-5 pb-5">
          <p className="text-left mb-3 font-bold">INFO</p>
          <div className="flex flex-col justify-center items-center relative group">
            <div
              className="h-28 w-28"
              id="file"
              onClick={() => {
                imgRef.current.showPicker();
              }}
            >
              <img
                src={
                  imageReader == ""
                    ? image == null
                      ? noImage
                      : image
                    : imageReader
                }
                className="cursor-pointer w-full h-full object-cover rounded-full"
                alt="profile_picture"
              />
            </div>
            <input
              type="file"
              ref={imgRef}
              multiple
              accept="image/*"
              onChange={(e) => [
                setImage(e.target.files[0]),
                setImageReader(URL.createObjectURL(e.target.files[0])),
              ]}
              className="hidden h-10 w-full border rounded pl-3"
            />
            <p className="btn mt-10" onClick={updateImage}>
              update image
            </p>
          </div>
          <p className="font-bold text-xl mt-5">{data.fullname}</p>
          <hr className="border-gray-300 my-3 w-full" />
          <img className="mt-5" src={loyalty} alt="" />
          <p className="mt-5 mb-5">180 points become a master</p>
          <progress
            className="progress progress-info w-56 mb-5"
            value="40"
            max="100"
          ></progress>
          <p
            className="btn lg:hidden"
            onClick={() => window.my_modal_2.showModal()}
          >
            Edit Profile
          </p>
          <dialog id="my_modal_2" className="modal">
            <form method="dialog" className="modal-box">
              <div className="bg-white rounded-lg py-5 px-5">
                <p>Details Information</p>
                <hr className="border-gray-300 my-3 w-full" />
                <div className="form-card flex flex-col md:flex-row flex-wrap ml-8 mt-12 mr-8 pb-16">
                  <form className="w-full">
                    <label>First Name</label>
                    <div
                      className={`div-firstname p-3 flex flex-row border rounded-md' ${
                        !form.firstname
                          ? "border-border rounded-md"
                          : "border-violet-700 rounded-md"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6  flex items-center ${
                          !form.firstname ? "text-gray-400" : "text-violet-700"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <input
                        onChange={inputChange}
                        className={`input-firstname border-l-2 ps-2 ms-2 outline-none w-full ${
                          !form.firstname ? "border-gray" : "border-violet-700"
                        }`}
                        placeholder={fullname[0]}
                        name="firstname"
                      />
                    </div>
                    {errors.firstname && (
                      <p className="text-red-500">{errors.firstname}</p>
                    )}
                  </form>
                  <form className="w-full">
                    <label>Last Name</label>
                    <div
                      className={`div-lastname p-3 flex flex-row border rounded-md' ${
                        !form.lastname
                          ? "border-border rounded-md"
                          : "border-violet-700 rounded-md"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6  flex items-center ${
                          !form.lastname ? "text-gray-400" : "text-violet-700"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <input
                        onChange={inputChange}
                        className={`input-lastname border-l-2 ps-2 ms-2 outline-none w-full ${
                          !form.lastname ? "border-gray" : "border-violet-700"
                        }`}
                        placeholder={fullname[1]}
                        name="lastname"
                      />
                    </div>
                    {errors.lastname && (
                      <p className="text-red-500">{errors.lastname}</p>
                    )}
                  </form>
                  <form className="w-full">
                    <label>Email</label>
                    <div
                      className={`div-usernaame p-3 flex flex-row border rounded-md' ${
                        !form.email
                          ? "border-border rounded-md"
                          : "border-violet-700 rounded-md"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 ${
                          !form.email ? "text-gray-400" : "text-violet-700"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>

                      <input
                        onChange={inputChange}
                        className={`input-email border-l-2 ps-2 ms-2 outline-none w-full ${
                          !form.email ? "border-gray" : "border-violet-700"
                        }`}
                        placeholder={data.email}
                        name="email"
                        disabled
                      />
                      {errors.email && <p className="text-red-500">{errors}</p>}
                    </div>
                  </form>
                  <form className="w-full">
                    <label>Phone Number </label>
                    <div
                      className={`div-phone-number p-3 flex flex-row border rounded-md' ${
                        !form.phone_number
                          ? "border-border rounded-md"
                          : "border-violet-700 rounded-md"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 ${
                          !form.phone_number
                            ? "text-gray-400"
                            : "text-violet-700"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <input
                        onChange={inputChange}
                        className={`input-phone-number border-l-2 ps-2 ms-2 outline-none w-full ${
                          !form.phone_number
                            ? "border-gray"
                            : "border-violet-700"
                        }`}
                        placeholder={
                          data.phone_number ? data.phone_number : "+62"
                        }
                        name="phone_number"
                        type="number"
                      />
                    </div>
                    {errors.phone_number && (
                      <p className="text-red-500">{errors.phone_number}</p>
                    )}
                  </form>
                </div>
                <button
                  className="btn bg-blue-500 w-full text-white font-medium"
                  onClick={updateUser}
                >
                  Update Changes
                </button>
              </div>
              <div className="bg-white rounded-lg pb-5 px-5">
                <p>Accounts & privacy</p>
                <hr className="border-gray-300 my-3 w-full" />
                <div className="flex flex-col md:flex-row gap-y-6 gap-x-8">
                  <form className="w-full md:w-1/2">
                    <label>New Password</label>
                    <div
                      className={`div-new-pass p-3 flex flex-row border rounded-md' ${
                        !form.pass
                          ? "border-border rounded-md"
                          : "border-violet-700 rounded-md"
                      }`}
                    >
                      <div onClick={click_pass}>
                        {cpass ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className={`w-6 h-6 ${
                                !form.pass ? "text-gray-400" : "text-violet-700"
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className={`w-6 h-6 ${
                                !form.pass ? "text-gray-400" : "text-violet-700"
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </>
                        )}
                      </div>
                      <input
                        className={`input-firstname border-l-2 ps-2 ms-2 outline-none w-full ${
                          !form.pass ? "border-grey" : "border-violet-700 "
                        }`}
                        type={cpass ? "password" : "text"}
                        onChange={inputChange}
                        name="pass"
                      />
                    </div>
                    {errorPassword.pass && (
                      <p className="text-red-500">{errorPassword.pass}</p>
                    )}
                  </form>
                  <form className="w-full md:w-1/2">
                    <label>Confrim Password</label>
                    <div
                      className={`div-replay-pass p-3 flex flex-row border rounded-md' ${
                        !form.pass1
                          ? "border-border rounded-md"
                          : "border-violet-700 rounded-md"
                      }`}
                    >
                      <div onClick={click_pass1}>
                        {cpass1 ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className={`w-6 h-6 ${
                                !form.pass1
                                  ? "text-gray-400"
                                  : "text-violet-700"
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className={`w-6 h-6 ${
                                !form.pass1
                                  ? "text-gray-400"
                                  : "text-violet-700"
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </>
                        )}
                      </div>
                      <input
                        className={`input-firstname border-l-2 ps-2 ms-2 outline-none w-full ${
                          !form.pass1 ? "border-gray" : "border-violet-700"
                        }`}
                        type={cpass1 ? "password" : "text"}
                        name="pass1"
                        onChange={inputChange}
                      />
                    </div>
                    {errorPassword.pass1 && (
                      <p className="text-red-500">{errorPassword.pass1}</p>
                    )}
                  </form>
                </div>
                <button
                  className="btn bg-blue-500 w-full mt-5 text-white font-medium"
                  onClick={updatePassword}
                >
                  Update Password
                </button>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <div className="w-3/4 hidden lg:flex flex-col gap-y-10">
          <div className="bg-white rounded-lg py-5 px-5 ">
            <Link
              to="/profiles"
              className="mr-5 font-medium border-b-2 border-blue-700 py-5"
            >
              Account Settings
            </Link>
            <Link to="/profiles/history">Order History</Link>
          </div>
          <div className="bg-white rounded-lg py-5 px-5">
            <p>Details Information</p>
            <hr className="border-gray-300 my-3 w-full" />
            <div className="form-card md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-4 mx-8 mt-12 pb-16">
              <form className="w-full">
                <label>First Name</label>
                <div
                  className={`div-firstname p-3 flex flex-row border rounded-md' ${
                    !form.firstname
                      ? "border-border rounded-md"
                      : "border-violet-700 rounded-md"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6  flex items-center ${
                      !form.firstname ? "text-gray-400" : "text-violet-700"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <input
                    onChange={inputChange}
                    className={`input-firstname border-l-2 ps-2 ms-2 outline-none w-full ${
                      !form.firstname ? "border-gray" : "border-violet-700"
                    }`}
                    placeholder={fullname[0]}
                    name="firstname"
                  />
                </div>
                {errors.firstname && (
                  <p className="text-red-500">{errors.firstname}</p>
                )}
              </form>
              <form className="w-full">
                <label>Last Name</label>
                <div
                  className={`div-lastname p-3 flex flex-row border rounded-md' ${
                    !form.lastname
                      ? "border-border rounded-md"
                      : "border-violet-700 rounded-md"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6  flex items-center ${
                      !form.lastname ? "text-gray-400" : "text-violet-700"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <input
                    onChange={inputChange}
                    className={`input-lastname border-l-2 ps-2 ms-2 outline-none w-full ${
                      !form.lastname ? "border-gray" : "border-violet-700"
                    }`}
                    placeholder={fullname[1]}
                    name="lastname"
                  />
                </div>
                {errors.lastname && (
                  <p className="text-red-500">{errors.lastname}</p>
                )}
              </form>
              <form className="w-full">
                <label>Email</label>
                <div
                  className={`div-usernaame p-3 flex flex-row border rounded-md' ${
                    !form.email
                      ? "border-border rounded-md"
                      : "border-violet-700 rounded-md"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 ${
                      !form.email ? "text-gray-400" : "text-violet-700"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>

                  <input
                    onChange={inputChange}
                    className={`input-email border-l-2 ps-2 ms-2 outline-none w-full ${
                      !form.email ? "border-gray" : "border-violet-700"
                    }`}
                    placeholder={data.email}
                    name="email"
                    disabled
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
              </form>
              <form className="w-full">
                <label>Phone Number </label>
                <div
                  className={`div-phone-number p-3 flex flex-row border rounded-md' ${
                    !form.phone_number
                      ? "border-border rounded-md"
                      : "border-violet-700 rounded-md"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 ${
                      !form.phone_number ? "text-gray-400" : "text-violet-700"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <input
                    onChange={inputChange}
                    className={`input-phone-number border-l-2 ps-2 ms-2 outline-none w-full ${
                      !form.phone_number ? "border-gray" : "border-violet-700"
                    }`}
                    placeholder={data.phone_number}
                    name="phone_number"
                    type="number"
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-red-500">{errors.phone_number}</p>
                )}
              </form>
            </div>
          </div>
          <button
            className="btn bg-blue-500 w-1/4 text-white font-medium"
            onClick={updateUser}
          >
            Update Changes
          </button>
          <div className="bg-white rounded-lg py-5 px-5">
            <p>Accounts & privacy</p>
            <hr className="border-gray-300 my-3 w-full" />
            <div className="flex flex-col md:flex-row gap-y-6 gap-x-8">
              <form className="w-full md:w-1/2">
                <label>New Password</label>
                <div
                  className={`div-new-pass p-3 flex flex-row border rounded-md' ${
                    !form.pass
                      ? "border-border rounded-md"
                      : "border-violet-700 rounded-md"
                  }`}
                >
                  <div onClick={click_pass}>
                    {cpass ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-6 h-6 ${
                            !form.pass ? "text-gray-400" : "text-violet-700"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-6 h-6 ${
                            !form.pass ? "text-gray-400" : "text-violet-700"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                  <input
                    className={`input-firstname border-l-2 ps-2 ms-2 outline-none w-full ${
                      !form.pass ? "border-grey" : "border-violet-700 "
                    }`}
                    type={cpass ? "password" : "text"}
                    onChange={inputChange}
                    name="pass"
                  />
                </div>
                {errorPassword.pass && (
                  <p className="text-red-500">{errorPassword.pass}</p>
                )}
              </form>

              <form className="w-full md:w-1/2">
                <label>Confrim Password</label>
                <div
                  className={`div-replay-pass p-3 flex flex-row border rounded-md' ${
                    !form.pass1
                      ? "border-border rounded-md"
                      : "border-violet-700 rounded-md"
                  }`}
                >
                  <div onClick={click_pass1}>
                    {cpass1 ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-6 h-6 ${
                            !form.pass1 ? "text-gray-400" : "text-violet-700"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-6 h-6 ${
                            !form.pass1 ? "text-gray-400" : "text-violet-700"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                  <input
                    className={`input-firstname border-l-2 ps-2 ms-2 outline-none w-full ${
                      !form.pass1 ? "border-gray" : "border-violet-700"
                    }`}
                    type={cpass1 ? "password" : "text"}
                    name="pass1"
                    onChange={inputChange}
                  />
                </div>
                {errorPassword.pass1 && (
                  <p className="text-red-500">{errorPassword.pass1}</p>
                )}
              </form>
            </div>
          </div>
          <button
            className="btn bg-blue-500 w-1/4 text-white font-medium"
            onClick={updatePassword}
          >
            Update Password
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileUser;
