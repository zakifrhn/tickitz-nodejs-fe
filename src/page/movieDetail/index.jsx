import React, { useState, useEffect } from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MovieDetail from "../../component/detail";
import CardBuy from "../../component/cardbuy";
import ProtectedRoute from "../../helpers/withAuth";
import { useSelector } from "react-redux";
import { ORDER } from "../../migration/order";
import useApi from "../../helpers/useApi";

function Detail() {
  const dateCinema = [
    {
      id: 1,
      date: "01-02-2015",
    },
    {
      id: 2,
      date: "02-02-2015",
    },
    {
      id: 3,
      date: "03-02-2015",
    },
  ];

  const areaCinema = [
    {
      id: 1,
      location: "Pekalongan",
    },
    {
      id: 2,
      location: "Surabaya",
    },
  ];

  const params = useParams();
  const navigate = useNavigate();
  const api = useApi();

  const paramsId = params.id;
  const [detail, setDetail] = useState([]);
  const [values, setValues] = useState([]);
  const [area, setArea] = useState([]);
  const [chDate, setChDate] = useState([]);
  const [filterBook, setFilterBook] = useState([]);
  const [infoBook, setInfoBook] = useState({});

  const getDetail = async () => {
    const response = await api({
      url: `/movie/detail/${paramsId}`,
      method: "GET",
    });
    const data = await response.data.data;
    setDetail(data);
  };

  const { isAuth } = useSelector((s) => s.users);

  const arrOrder = async () => {
    try {
      const hasil = [...ORDER];
      setValues(hasil);
    } catch (error) {
      throw new Error("Sory data not found");
    }
  };

  console.log(detail);

  const filterCinema = async (selectDate, selectArea) => {
    try {
      const hasil = ORDER.filter((value) => {
        return value.date === selectDate && value.location === selectArea;
      });
      if (hasil.length !== 0) {
        setFilterBook(hasil);
      } else {
        setFilterBook([]);
      }
    } catch (error) {
      setFilterBook([]);
    }
  };

  useEffect(() => {
    arrOrder();
  }, []);

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    if (!isAuth) navigate("/sign-in");
  }, []);

  return (
    <div>
      <Navbar />

      <section className="w-full px-10 mt-10 py-5">
        {detail ? (
          detail.map((v) => {
            return (
              <MovieDetail
                name={v.title_movie}
                image={v.image_movie}
                genre={v.genre}
                release_date={v.release_date}
                directed={v.directed_by}
                duration={v.duration}
                casts={v.casts_movie}
                synopsis={v.synopsis_movie}
              />
            );
          })
        ) : (
          <h1>Data Not Found</h1>
        )}
        <div className="main-middle w-full bg-backgroundColor rounded-md my-7">
          <div className="show-ticket text-center py-5">
            <p className="text-2xl">Show and Tickets</p>
          </div>
          <div className="date-city w-full flex md:flex-row md:gap-x-5 xs:flex xs:flex-col xs:gap-y-5 justify-center mx-auto md:px-5">
            <div className="choose-date">
              <div className="p-2 flex flex-row bg-border mx-auto rounded-md border items-center gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>

                <select
                  className="bg-border outline-none xs:w-full md:w-fit hover:cursor-pointer"
                  placeholder="Select area"
                  onChange={(e) => setChDate(e.target.value)}
                >
                  <option selected>Choose your date</option>
                  {dateCinema.map((v) => {
                    return <option key={v}>{v.date}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="choose-area ">
              <div className="p-2 flex flex-row bg-border mx-auto rounded-md border items-center gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <select
                  className="bg-border outline-none xs:w-full md:w-fit hover:cursor-pointer"
                  placeholder="Select area"
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option selected>Choose your Location</option>
                  {areaCinema.map((v) => {
                    return <option key={v}>{v.location}</option>;
                  })}
                </select>
              </div>
            </div>

            <button
              className="text-center items-center md:px-2"
              onClick={() => filterCinema(chDate, area)}
            >
              <div className="mx-auto text-center w-full p-2 px-10 rounded-md bg-primary text-white">
                Filter
              </div>
            </button>
          </div>
          <div className="wrapper-ticket flex md:flex-row md:flex-wrap md:justify-center md:mx-10 md:my-10 md:gap-x-10 md:gap-y-10 px-7 py-10 xs:flex xs:flex-col">
            {filterBook && filterBook.length !== 0 ? (
              filterBook.map((v) => (
                <CardBuy
                  idMovie={paramsId}
                  idOrder={v.idOrders}
                  cinema={v.cinemaName}
                  date_cinema={v.date}
                  img_cinema={v.image}
                  address={v.location}
                  time={v.time}
                  priceMovie={v.price + ".00"}
                />
              ))
            ) : values && values.length !== 0 ? (
              values.map((v) => (
                <CardBuy
                  idMovie={paramsId}
                  idOrder={v.idOrders}
                  cinema={v.cinemaName}
                  date_cinema={v.date}
                  img_cinema={v.image}
                  address={v.location}
                  time={v.time}
                  priceMovie={v.price + ".00"}
                />
              ))
            ) : (
              <h1>Data Not Found</h1>
            )}

            {/** 
                filterBook.length !== 0 ? (
                  filterBook.map((v) => {
                    <CardBuy cinema={v.cinema} date_cinema={v.date} img_cinema={v.image} address={v.location} time={v.time} price={v.price + '.00'} />
                  })
                ) : (
                  <h1>Data not found</h1>
                )
                */}
          </div>

          <div className="view-more flex flex-row justify-center items-center h-auto w-full my-7">
            <hr className="w-2/5 xs:w-1/3" />
            <p className="mx-5 text-primary xs:mx-4 xs:text-xs">view more</p>
            <hr className="w-2/5 xs:w-1/3" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProtectedRoute(Detail);
