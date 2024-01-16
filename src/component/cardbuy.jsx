import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bookingDetails } from "../store/reducer/user";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ORDER } from "../migration/order";
import useApi from "../helpers/useApi";

function CardBuy({
  idMovie,
  idOrder,
  img_cinema,
  cinemaName,
  address,
  time,
  priceMovie,
  date_cinema,
}) {
  const dispatch = useDispatch();
  const [pickWatch, setPickWatch] = useState({});
  const [titleMovie, setTitleMovie] = useState("");
  const api = useApi();

  const getDetail = async () => {
    const response = await api({
      url: `/movie/detail/${idMovie}`,
      method: "GET",
    });
    console.log(response);
    const data = await response.data.data;
    console.log(data);
    setTitleMovie(data[0].title_movie);
  };

  const getInfoBook = () => {
    dispatch(
      bookingDetails({
        title: titleMovie,
        time_watch: pickWatch.time,
        date: pickWatch.dateCinema,
        price: pickWatch.priceCinema,
        cinema: pickWatch.nameCinema,
        location: pickWatch.locationCinema,
        imgCinema: img_cinema,
      })
    );
  };

  useEffect(() => {
    getInfoBook();
  }, []);

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      <div className="card w-80 bg-base-100 shadow-xl px-5 hover:cursor-pointer transition-shadow hover:scale-105 duration-500">
        <figure className="px-5 pt-5 flex justify between gap-x-5">
          <img src={img_cinema} alt="Shoes" className="rounded-xl w-20" />
          <span className="flex flex-col">
            <p className="text-xl">{cinemaName}</p>
            <p className="text-sm text-font">{address}</p>
            <p className="text-sm text-font">{date_cinema}</p>
          </span>
        </figure>
        <hr className="w-full mt-5"></hr>
        <div className="card-body items-center">
          <span className="text-sm text-center items-center flex flex-row flex-wrap justify-center gap-x-3 gap-y-3">
            {time
              ? time.map((v) => {
                  const chooseOrder = ORDER.find((e) => e.idOrders === idOrder);
                  return chooseOrder ? (
                    <div key={v.time_watch}>
                      <p
                        className={
                          (pickWatch.time === v.time_watch
                            ? "bg-primary text-white rounded-md scale-105"
                            : "bg-white") +
                          " hover:cursor-pointer hover:scale-105 hover:shadow-lg p-1"
                        }
                        onClick={() =>
                          setPickWatch({
                            time: v.time_watch,
                            idOrder: chooseOrder.idOrders,
                            nameCinema: chooseOrder.cinema,
                            priceCinema: chooseOrder.price,
                            dateCinema: chooseOrder.date,
                            locationCinema: chooseOrder.location,
                          })
                        }
                      >
                        {v.time_watch}
                      </p>
                    </div>
                  ) : null;
                })
              : ""}

            {/** 
                            time
    ? time.map((v) => {
        const chooseOrder = ORDER.find((e) => e.idOrders === idOrder);
        return chooseOrder ? (
          <div key={v.time_watch}>
            <p
              className={
                (pickWatch.includes(v.time_watch)
                  ? 'bg-primary text-white rounded-md scale-105'
                  : 'bg-white') +
                ' hover:cursor-pointer hover:scale-105 hover:shadow-lg p-1'
              }
              onClick={() =>
                setPickWatch((prevPicks) => {
                  if (prevPicks.includes(v.time_watch)) {
                    return prevPicks.filter((item) => item !== v.time_watch);
                  } else {
                    return [...prevPicks, v.time_watch, chooseOrder.cinema, chooseOrder.date, chooseOrder.location];
                  }
                })
              }
            >
              {v.time_watch}
            </p>
          </div>
        ) : null;
      })
    : ''
    */}
          </span>

          <div className="text-sm w-full flex flex-row my-5">
            <p>Price</p>
            <p className="flex justify-end">{priceMovie}</p>
          </div>
          <div className="card-actions w-full">
            <button
              className="btn btn-primary w-full text-white px-4"
              onClick={getInfoBook}
            >
              <Link to={`/order/${idMovie}`}>Book now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBuy;
