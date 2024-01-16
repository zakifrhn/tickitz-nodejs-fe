import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addData, logout } from "../store/reducer/user";
import Profile from "../assets/profile.png";
import noImage from "../assets/noimage.png";
import useApi from "../helpers/useApi";

function Navbar() {
  const dispatch = useDispatch();
  const { isAuth, data } = useSelector((s) => s.users);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="bg-white border rounded-lg w-screen px-10 sticky top-0 z-10">
        <div className="w-full md:flex md:flex-row md:justify-between md:items-center xs:flex xs:flex-row  xs:justify-between xs:items-center md:px-5 py-5">
          <div className="brand-md-menu w-full md:flex md:flex-row md:items-center md:gap-x-10">
            <img src={logo} alt="" className="" />

            <div className="w-full md:hidden mb-10">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:hidden xs:flex xs:justify-end -mt-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

            {data && data.roles == "admin" ? (
              <div className="md-menu  md:flex md:flex-row md:gap-x-7">
                <Link to="/">Home</Link>
                <Link to="/admin">Manage Movie</Link>
              </div>
            ) : (
              <div
                className={`${
                  isOpen ? "block" : "hidden"
                } md-menu flex xs:flex-col xs:justify-center xs:gap-y-5 md:flex md:flex-row md:gap-x-7`}
              >
                <Link to="/" className="xs:flex xs:justify-center">
                  Home
                </Link>
                <Link to="/view-all" className="xs:flex xs:justify-center">
                  List Movie
                </Link>
                {isAuth ? (
                  <div>
                    <Link
                      to="/profiles"
                      className="md:hidden xs:flex xs:justify-center mb-5"
                    >
                      Profile
                    </Link>
                    <Link
                      to="#"
                      className="md:hidden xs:flex xs:justify-center"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/sign-in"
                      className="md:hidden xs:flex xs:justify-center"
                    >
                      Login
                    </Link>
                  </div>
                )}
                <p className="md:hidden xs:flex xs:justify-center text-font">
                  @2020 Tickitz. All Right Reserved
                </p>
              </div>
            )}
          </div>

          {isAuth ? (
            <div className="search-md-logo-profile hidden md:flex md:w-8 md:h-8 md:me-10 md:items-center">
              <button className="btn-dropdown-profile">
                <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                  <label tabIndex={0} className=" m-1">
                    <img
                      src={data.image_user !== null ? data.image_user : noImage}
                      className="md:w-8 md:h-8 md:ms-7 mx-auto rounded-2xl"
                      alt=""
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 md:-me-7 rounded-box w-32 gap-y-1 py-3"
                  >
                    <Link to="/profiles">Profile</Link>
                    <Link to="#" onClick={() => dispatch(logout())}>
                      Logout
                    </Link>
                  </ul>
                </div>
              </button>
            </div>
          ) : (
            <div className="search-md-logo-profile hidden md:flex md:w-8 md:h-8 md:me-10 md:items-center">
              <button className="btn-sign-up btn btn-primary">
                <Link to="/sign-in" className="text-white">
                  Login
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
