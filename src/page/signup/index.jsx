import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import banner1 from "../../assets/banner-login.png";
import axios from "axios";
import success from "../../assets/success.png";
import { useSelector } from "react-redux";
import failed from "../../assets/failed-removebg-preview.png";

function Index() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState(0);
  const [msg, setMsg] = useState("");
  const { isAuth } = useSelector((s) => s.users);
  const navigate = useNavigate();
  const backendURL = "http://localhost:5200";

  const inputChange = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const [cpass, setCpass] = useState(true);
  const click_pass = () => {
    setCpass(cpass == true ? false : true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstname) {
      newErrors.firstname = "This form must be field";
    }

    if (!form.lastname) {
      newErrors.lastname = "This form must be field";
    }

    if (!form.username) {
      newErrors.username = "This form must be field";
    }

    if (!form.email || !form.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.pass || form.pass.length < 8) {
      newErrors.pass = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async (e) => {
    e.preventDefault();
    validateForm();
    try {
      const respone = await axios.post(
        process.env.REACT_APP_DATABASE_VERCEL + `/users/`,
        form
      );
      setShowModal(true);
      setResponse(respone.data.status);
      setMsg(respone.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="parent-sign-up md:grid md:grid-cols-6 md:w-screen md:h-screen xs:flex xs:flex-col">
        <div className="main-banner xs:hidden md:grid col-start-1 col-span-4">
          <div className="relative">
            <img
              src={banner1}
              alt=""
              className="bg-center object-cover w-full h-screen"
            />
          </div>
        </div>

        <div className="form-sign-in md:col-start-5 md:col-span-6 md:px-8  md:py-5 xs:w-full xs:flex xs:flex-col xs:px-14">
          <div className="logo xs:w-full md:hidden xs:flex">
            <img src={logo} className="xs:w-3/6 xs:pt-8 xs:-ms-3" alt="" />
          </div>

          <div className="sign-in md:flex md:flex-col md:gap-y-5 xs:flex xs:flex-col xs:gap-y-3">
            <p className="md:text-4xl xs:text-4xl">Sign Up</p>

            <p className="md:text-xs text-font xs:text-sm xs:w-4/5">
              Fill your addtional details
            </p>

            <form
              action
              className="md:w-full md:flex md:flex-col md:gap-y-1 xs:flex xs:flex-col xs:gap-y-2"
            >
              <label htmlFor>First Name</label>
              <div
                className={`div-usernaame p-2 flex flex-row border rounded-md' ${
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
                  className={`w-6 h-6 md:w-4 md:h-4 ${
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
                  type="text"
                  onChange={inputChange}
                  name="firstname"
                  required
                  className={`input-username border-l-2 ps-2 ms-2 outline-none md:text-xs w-full ${
                    !form.firstname ? "border-gray" : "border-violet-700"
                  }`}
                  placeholder="Write your firstname"
                />
              </div>
              {errors.firstname && (
                <p className="text-red-500">{errors.firstname}</p>
              )}
            </form>

            <form
              action
              className="md:w-full md:flex md:flex-col md:gap-y-1 xs:flex xs:flex-col xs:gap-y-2"
            >
              <label htmlFor>Last Name</label>
              <div
                className={`div-usernaame p-2 flex flex-row border rounded-md' ${
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
                  className={`w-6 h-6 md:w-4 md:h-4 ${
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
                  type="text"
                  onChange={inputChange}
                  name="lastname"
                  required
                  className={`input-username border-l-2 ps-2 ms-2 outline-none md:text-xs w-full ${
                    !form.lastname ? "border-gray" : "border-violet-700"
                  }`}
                  placeholder="Write your firstname"
                />
              </div>

              {errors.lastname && (
                <p className="text-red-500">{errors.lastname}</p>
              )}
            </form>

            <form
              action
              className="md:w-full md:flex md:flex-col md:gap-y-1 xs:flex xs:flex-col xs:gap-y-2"
            >
              <label htmlFor>Phone Number</label>
              <div
                className={`div-usernaame p-2 flex flex-row border rounded-md' ${
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
                  className={`w-6 h-6 md:w-4 md:h-4 ${
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
                  type="number"
                  onChange={inputChange}
                  name="phone_number"
                  required
                  className={`input-username border-l-2 ps-2 ms-2 outline-none md:text-xs w-full ${
                    !form.phone_number ? "border-gray" : "border-violet-700"
                  }`}
                  placeholder="Write your phone number"
                />
              </div>
            </form>

            <form
              action
              className="md:w-full md:flex md:flex-col md:gap-y-1 xs:flex xs:flex-col xs:gap-y-2"
            >
              <label htmlFor>Email</label>
              <div
                className={`div-usernaame p-2 flex flex-row border rounded-md' ${
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
                  className={`w-6 h-6 md:w-4 md:h-4 ${
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
                  type="email"
                  onChange={inputChange}
                  name="email"
                  required
                  className={`input-username border-l-2 ps-2 ms-2 outline-none md:text-xs w-full ${
                    !form.email ? "border-gray" : "border-violet-700"
                  }`}
                  placeholder="Write your email"
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </form>

            <form
              action
              className="md:w-full md:flex md:flex-col md:gap-y-1 xs:flex xs:flex-col xs:gap-y-2"
            >
              <label htmlFor>Username</label>
              <div
                className={`div-usernaame p-2 flex flex-row border rounded-md' ${
                  !form.username
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
                  className={`w-6 h-6 md:w-4 md:h-4 ${
                    !form.username ? "text-gray-400" : "text-violet-700"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                <input
                  type="text"
                  onChange={inputChange}
                  name="username"
                  required
                  className={`input-username border-l-2 ps-2 ms-2 outline-none md:text-xs w-full ${
                    !form.username ? "border-gray" : "border-violet-700"
                  }`}
                  placeholder="Write your username"
                />
              </div>
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </form>

            <form action className="md:w-full md:gap-y-1 xs:flex xs:flex-col">
              <label htmlFor className>
                Password
              </label>
              <div
                className={`div-password p-2 flex flex-row border ' ${
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
                        className={`w-6 h-6 md:w-4 md:h-4 ${
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
                        className={`w-6 h-6 md:w-4 md:h-4 ${
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
                  type={cpass ? "password" : "text"}
                  required
                  onChange={inputChange}
                  name="pass"
                  autoComplete="on"
                  className={`input-username border-l-2 ps-2 ms-2 outline-none md:text-xs w-full ${
                    !form.pass ? "border-gray" : "border-violet-700"
                  }`}
                  placeholder="Write your password"
                />
              </div>
              {errors.pass && <p className="text-red-500">{errors.pass}</p>}
            </form>
            <button
              className="w-full bg-primary border rounded-md p-2 text-white md:mt-5 xs:mt-5"
              onClick={register}
            >
              Sign Up
            </button>
            <div className="forgot md:text-center md:text-sm xs:text-center xs:text-sm xs:my-5">
              <p className="text-font">
                Already have account ?{" "}
                <Link to="/sign-in" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full ">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  {response === 200 ? (
                    <>
                      <img src={success} alt="" className="flex" />
                      <p className="text-gray-400 mt-5 text-center">
                        Registrastion Success, <br /> Please Check Email For
                        Activation
                      </p>
                    </>
                  ) : (
                    <>
                      <img
                        src={failed}
                        alt=""
                        className="flex max-w-[100px] max-h-[100px]"
                      />
                      <p className="text-gray-400 mt-5">{msg}</p>
                    </>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="px-8 py-5 text-red-500 bg-transparent font-bold uppercase rounded-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow-lg"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Index;
