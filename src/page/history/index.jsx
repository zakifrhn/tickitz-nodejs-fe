import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import noImage from "../../assets/noimage.png";
import { useSelector, useDispatch } from "react-redux";
import loyalty from "../../assets/loyalty.PNG";
import { Link } from "react-router-dom";
import QR from "../../assets/QR Code 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Show } from "../../helpers/toast";
import { useApiMulti } from "../../helpers/useApi";
import useApi from "../../helpers/useApi";
import { addData } from "../../store/reducer/user";
import { useNavigate } from "react-router-dom";

const HistoryBooking = () => {
  const apiMulti = useApiMulti();
  const api = useApi();
  const dispatch = useDispatch();
  const navigates = useNavigate();
  const { data, isAuth } = useSelector((s) => s.users);
  const { seats, time_watch, title, price, date, location, imgCinema } =
    useSelector((s) => s.users);
  const [image, setImage] = useState(data ? data.image_user : "");
  const [imageReader, setImageReader] = useState("");
  const imgRef = useRef(null);
  const [fullname, setFullname] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await api.get(process.env.REACT_APP_BASEURL + "/users");
      dispatch(addData(data.data[0]));
      setFullname(data.data[0].fullname.split(" "));
    } catch (error) {
      console.log(error);
    }
  };

  const check_image = () => {
    if (image !== null) {
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

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image_user", image);

      await apiMulti({
        url: "/users/update/img",
        method: "PUT",
        data: formData,
      });
      fetchUser();
      Show("Image updated successfully", "success");
      setImageReader("");
    } catch (error) {
      console.error("Error updating image:", error);
      Show("Error updating image", "error");
    }
  };

  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const ticket = seats.seats;
  const countTicket = ticket !== undefined ? ticket.split(",") : "";
  const arrayTicket = countTicket.length;

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
          <Link to="/profiles">Account Settings</Link>
          <Link
            to="/profiles/history"
            className="font-medium border-b-2 border-blue-700"
          >
            Order History
          </Link>
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

          <div className="bg-white flex flex-col w-full lg:hidden rounded-lg px-5 py-5">
            <div className="flex flex-row justify-between">
              <div>
                <p className="text-[#AAAAAA] mb-3">
                  {date} - {location}
                </p>
                <h1 className="font-bold text-3xl">{title}</h1>
              </div>
              <img src={imgCinema} className="h-14" alt="" />
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col md:flex-row w-full gap-x-5">
                <div className="bg-gray-300 text-gray-600 font-bold w-full md:w-40 text-center py-2 rounded-lg my-5 md:my-0">
                  Ticket used
                </div>
                <div className="bg-blue-200 text-blue-600 font-bold w-full md:w-40 text-center py-2 rounded-lg hover:cursor-pointer">
                  <Link to="/tickets">Paid</Link>
                </div>
              </div>
              <div
                onClick={toggleShowDetails}
                className="cursor-pointer w-40 flex items-center justify-center"
              >
                {showDetails ? "Hide Detail" : "Show Detail"}
                <FontAwesomeIcon
                  icon={showDetails ? faCaretUp : faCaretDown}
                  className="ml-3"
                ></FontAwesomeIcon>
              </div>
            </div>
            {showDetails && (
              <div className="flex flex-col md:flex-row mt-5 items-center gap-x-10">
                <div>
                  <h1 className="font-semibold">Ticket Information</h1>
                  <img src={QR} alt="" />
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col gap-y-10">
                    <div className="flex flex-row gap-x-10">
                      <div>
                        <p className="text-[#AAAAAA]">Category</p>
                        <p>PG-13</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Time</p>
                        <p>{time_watch}</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Seats</p>
                        <p>{seats.seats}</p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-x-10">
                      <div>
                        <p className="text-[#AAAAAA]">Movie</p>
                        <p>{title}</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Date</p>
                        <p>{date}</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Count</p>
                        <p>{arrayTicket}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 ml-10">
                    <p className="font-bold text-2xl">Total</p>
                    <p className="font-bold text-2xl">{`$. ${
                      arrayTicket * price
                    }.00`}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-3/4 hidden lg:flex flex-col gap-y-10">
          <div className="bg-white rounded-lg py-5 px-5 ">
            <Link to="/profiles">Account Settings</Link>
            <Link
              to="/profiles/history"
              className="ml-5 font-medium border-b-2 border-blue-700 py-5"
            >
              Order History
            </Link>
          </div>

          <div className="bg-white flex flex-col w-full rounded-lg px-5 py-5">
            <div className="flex flex-row justify-between">
              <div>
                <p className="text-[#AAAAAA] mb-3">
                  {date} - {location}
                </p>
                <h1 className="font-bold text-3xl">{title}</h1>
              </div>
              <img src={imgCinema} className="h-14" alt="" />
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col md:flex-row w-full gap-x-5">
                <div className="bg-gray-300 text-gray-600 font-bold w-full md:w-40 text-center py-2 rounded-lg my-5 md:my-0">
                  Ticket used
                </div>
                <div className="bg-blue-200 text-blue-600 font-bold w-full md:w-40 text-center py-2 rounded-lg hover:cursor-pointer">
                  <Link to="/tickets">Paid</Link>
                </div>
              </div>
              <div
                onClick={toggleShowDetails}
                className="cursor-pointer w-40 flex items-center justify-center"
              >
                {showDetails ? "Hide Detail" : "Show Detail"}
                <FontAwesomeIcon
                  icon={showDetails ? faCaretUp : faCaretDown}
                  className="ml-3"
                ></FontAwesomeIcon>
              </div>
            </div>
            {showDetails && (
              <div className="flex flex-col md:flex-row mt-5 items-center gap-x-10">
                <div>
                  <h1 className="font-semibold">Ticket Information</h1>
                  <img src={QR} alt="" />
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col gap-y-10">
                    <div className="flex flex-row gap-x-10">
                      <div>
                        <p className="text-[#AAAAAA]">Category</p>
                        <p>PG-13</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Time</p>
                        <p>{time_watch}</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Seats</p>
                        <p>{seats.seats}</p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-x-10">
                      <div>
                        <p className="text-[#AAAAAA]">Movie</p>
                        <p>{title}</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Date</p>
                        <p>{date}</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Count</p>
                        <p>{arrayTicket}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 ml-10">
                    <p className="font-bold text-2xl">Total</p>
                    <p className="font-bold text-2xl">{`$. ${
                      arrayTicket * price
                    }.00`}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryBooking;
