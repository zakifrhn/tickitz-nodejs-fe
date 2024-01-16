import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import dummySeats from "../../assets/screen.jpg";
import availSeat from "../../assets/seatavail.jpg";
import soldSeat from "../../assets/seatsold.png";
import bookSeat from "../../assets/seatlove.png";
import chooseSeat from "../../assets/seat selected.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Show } from "../../helpers/toast";
import { confirmationSeats } from "../../store/reducer/user.js";
import useApi from "../../helpers/useApi.jsx";

function Order() {
  const api = useApi();
  const params = useParams();
  const paramsId = params.id;
  const navigates = useNavigate();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState([]);
  const [genres, setGenres] = useState(null);
  const [seatStore, setSeatStore] = useState({});
  const [totalSeat, setTotalSeat] = useState(0);

  const {
    isAuth,
    title,
    time_watch,
    date,
    price,
    cinema,
    location,
    imgCinema,
  } = useSelector((s) => s.users);

  const getDetail = async () => {
    const response = await axios.get(
      process.env.REACT_APP_DATABASE_VERCEL + `/movie/detail/${paramsId}`
    );
    const data = await response.data.data;
    setDetail(data[0]);
    setGenres(data[0].genre.split(","));
  };

  const inputChange = (e) => {
    const data = { ...seatStore };
    data[e.target.name] = e.target.value;
    setSeatStore(data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigates("/sign-in");
    }
  }, [isAuth]);

  useEffect(() => {
    if (seatStore.seats) {
      let countSeat = 0;
      seatStore.seats
        .split(",")
        .map((v) => (v != "" ? (v != " " ? countSeat++ : "") : " "));
      setTotalSeat(countSeat * parseInt(price));
    }

    if (seatStore.seats == "") {
      setTotalSeat(0);
    }
    dispatch(
      confirmationSeats({
        seats: seatStore,
      })
    );
  }, [seatStore]);

  return (
    <div>
      <Navbar />
      <main className="bg-border flex flex-col items-center pb-10">
        <div className="mt-7">
          <ul className="steps">
            <li className="step step-success">Dates and Time</li>
            <li className="step">Seat</li>
            <li className="step">Payment</li>
          </ul>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="bg-white w-full lg:w-2/3 mx-5 rounded-lg px-5 py-5">
            <div className=" border border-gray-300 mt-5 px-5 py-5 grid grid-cols-1 md:flex flex-row md:justify-between items-center">
              <div className="w-[150px] h-[150px] md:mr-10 mb-4 md:mb-0 place-self-center border p-1">
                <img
                  src={detail.image_movie}
                  className="h-full w-full object-cover place-self-center"
                  alt=""
                />
              </div>
              <div className="md:w-full place-self-center">
                <h1 className="text-2xl font-semibold my-2">
                  {detail.title_movie}
                </h1>
                <div className="flex flex-row my-2 justify-around md:justify-normal gap-x-2">
                  {genres
                    ? genres.map((v, index) => {
                        return (
                          <div>
                            <div
                              className={`block bg-gray-100 rounded-lg px-2 py-1 text-gray-400 ${
                                index == 2 ? "hidden" : ""
                              }`}
                            >
                              {v}
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
                <div className="grid cols-1 md:flex flex-row justify-between">
                  <p className="mb-4 md:mb-0">Reguler - {location}</p>
                  <div className="flex justify-end">
                    <button
                      className="rounded-lg bg-blue-700 text-white px-10 py-2 w-full md:w-50"
                      onClick={() => navigates(`/detail/${paramsId}`)}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 ">
              <h1 className="font-bold text-2xl">Choose Your Seat</h1>
              <img
                alt="this dummy seats"
                src={dummySeats}
                className="ml-10 mt-5 w-4/5"
              />
              <h1 className="font-bold text-xl">Seating Key</h1>
              <div className="flex flex-row gap-2 lg:gap-x-10 mt-5">
                <img src={availSeat} className="h-5 w-5" alt="" />
                <p>Available</p>
                <img src={chooseSeat} className="h-5 w-5" alt="" />
                <p>Selected</p>
                <img src={bookSeat} className="h-5 w-5" alt="" />
                <p>Love Nest</p>
                <img src={soldSeat} className="h-5 w-5" alt="" />
                <p>Sold</p>
              </div>
              <p
                className="btn flex lg:hidden mt-5 "
                onClick={() => window.my_modal_2.showModal()}
              >
                Choose Seat
              </p>
              <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box">
                  <div className="bg-white flex flex-col pt-10 pb-10 justify-items-center rounded-lg">
                    <div className="items-center justify-center flex">
                      <img src={imgCinema} className="bg-cover w-1/2" alt="" />
                    </div>
                    <h1 className="font-bold text-xl text-center my-2">
                      {cinema}
                    </h1>
                    <div className="flex flex-row justify-between mx-5 my-2">
                      <p>Movie Selected</p>
                      <p>{title}</p>
                    </div>
                    <div className="flex flex-row justify-between mx-5 my-2">
                      <p>Time</p>
                      <p>{time_watch}</p>
                    </div>
                    <div className="flex flex-row justify-between mx-5 my-2">
                      <p>Date</p>
                      <p>{date}</p>
                    </div>
                    <div className="flex flex-row justify-between mx-5 my-2">
                      <p>One Ticket Price</p>
                      <p>$. {price}.00</p>
                    </div>
                    <div className="flex flex-row justify-between mx-5 my-2">
                      <p>Seat Choosed</p>
                      <input
                        type="text"
                        className="border border-gray-300 py-2 px-5 rounded-lg"
                        placeholder="input your seats"
                        name="seats"
                        onChange={inputChange}
                      />
                    </div>
                    <hr className="my-3 border-gray-300" />

                    <div className="flex flex-row justify-between mx-5 my-2">
                      <h1 className="font-bold text-xl">Total Payment</h1>
                      <h1 className="font-bold text-xl text-blue-600">
                        $. {totalSeat}.00
                      </h1>
                    </div>
                  </div>
                  <Link
                    to="/payment"
                    className="block bg-blue-600 w-full py-5 text-white mt-10 rounded-lg text-center"
                  >
                    Checkout Now
                  </Link>
                </form>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
          <div className="w-1/3 mx-5 rounded-lg h-full hidden lg:block">
            <div className="bg-white flex flex-col pt-10 pb-10 justify-items-center rounded-lg">
              <div className="items-center justify-center flex">
                <img src={imgCinema} className="bg-cover w-1/2" alt="" />
              </div>
              <h1 className="font-bold text-xl text-center my-2">{cinema}</h1>
              <div className="flex flex-row justify-between mx-5 my-2">
                <p>Movie Selected</p>
                <p>{title}</p>
              </div>
              <div className="flex flex-row justify-between mx-5 my-2">
                <p>Time</p>
                <p>{time_watch}</p>
              </div>
              <div className="flex flex-row justify-between mx-5 my-2">
                <p>Date</p>
                <p>{date}</p>
              </div>
              <div className="flex flex-row justify-between mx-5 my-2">
                <p>One Ticket Price</p>
                <p>$. {price}.00</p>
              </div>
              <div className="flex flex-row justify-between mx-5 my-2">
                <p>Seat Choosed</p>
                <input
                  type="text"
                  className="border border-gray-300 py-2 px-5 rounded-lg"
                  placeholder="input your seats"
                  name="seats"
                  onChange={inputChange}
                />
              </div>
              <hr className="my-3 border-gray-300" />

              <div className="flex flex-row justify-between mx-5 my-2">
                <h1 className="font-bold text-xl">Total Payment</h1>
                <h1 className="font-bold text-xl text-blue-600">
                  $. {totalSeat}.00
                </h1>
              </div>
            </div>
            <Link
              to="/payment"
              className="block bg-blue-600 w-full py-5 text-white mt-10 rounded-lg text-center"
            >
              Checkout Now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Order;
