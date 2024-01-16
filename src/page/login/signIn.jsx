import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { addData, login } from "../../store/reducer/user";
import banner1 from "../../assets/banner-login.png";
import useApi from "../../helpers/useApi";
import { Show } from "../../helpers/toast";

function SignIn() {
  const [form, setForm] = useState({});
  const [btnState, setBtnState] = useState(true);
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useApi();

  const { isAuth } = useSelector((s) => s.users);

  const [cpass, setCpass] = useState(true);
  const click_pass = () => {
    setCpass(cpass == true ? false : true);
  };

  const inputChange = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const goLogin = async () => {
    await api({
      method: "POST",
      url: `/auth/`,
      data: form,
    })
      .then(({ data }) => {
        const token = data.token;
        const role = data.role;
        dispatch(login({ token, role }));
        Show("Login Success", "success");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((er) => {
        // console.log(er.message);
        const axiosErr = er.response.data;
        if (axiosErr.message !== undefined) {
          Show(axiosErr.message, "warning");
        } else if (axiosErr.error !== undefined) {
          Show(axiosErr.error, "error");
        }
        console.log(er);
        //Show("Gagal Login", "error")
      });
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="parent-sign-in md:grid md:grid-cols-6 md:w-screen md:h-screen xs:flex xs:flex-col">
        <div className="main-banner xs:hidden md:grid col-start-1 col-span-4">
          <div className="relative">
            <img
              src={banner1}
              alt=""
              className="bg-center object-cover w-full h-screen"
            />
          </div>
        </div>

        <div className="form-sign-in md:col-start-5 md:col-span-6 md:px-8 md:py-8 xs:w-full xs:flex xs:flex-col xs:px-14">
          <div className="logo xs:w-full md:hidden xs:flex">
            <img src={logo} className="xs:w-3/6 xs:pt-8 xs:-ms-3" alt="" />
          </div>

          <div className="sign-in md:flex md:flex-col md:gap-y-5 xs:flex xs:flex-col xs:gap-y-3">
            <p className="md:text-4xl xs:text-4xl">Sign In</p>
            <p className="md:text-xs text-font xs:text-sm xs:w-4/5">
              Sign In with you data that you entered during your registration
            </p>

            <form
              action=""
              className="email md:w-full md:flex md:flex-col md:gap-y-1 xs:flex xs:flex-col xs:gap-y-2"
            >
              <label htmlFor="username">Username</label>
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
            </form>

            <form
              action=""
              className="pwd md:w-full md:gap-y-1 xs:flex xs:flex-col"
            >
              <label htmlFor="password" className>
                Password
              </label>

              <div
                className={`div-usernaame p-2 flex flex-row border ' ${
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
            </form>

            {/** 
                    <button className={`w-full  border rounded-md p-2  md:mt-5 xs:mt-5 ${btnState == true ? 'bg-violet-300 text-gray-200':'bg-primary text-white'}`} onClick={goLogin} disabled={btnState}>
                        Sign In
                    </button>
                    */}
            <button
              className="w-full  border rounded-md p-2  md:mt-5 xs:mt-5 bg-primary text-white"
              onClick={goLogin}
            >
              Sign In
            </button>

            <div className="forgot md:text-center md:text-sm xs:text-center xs:text-sm xs:mt-3">
              <p className="text-font">
                Forgot your password ?{" "}
                <Link to="/sign-in" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="don't-have-account md:text-center md:text-xs xs:text-center xs:text-xs">
              <p className="text-font">
                Don't have account ?{" "}
                <Link to="/register" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
