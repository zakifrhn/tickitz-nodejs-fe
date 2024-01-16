import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import googlePlay from "../../assets/logos_google-pay.png";
import visa from "../../assets/logos_visa.png";
import gopay from "../../assets/Logo GoPay (SVG-240p) - FileVector69 1.png";
import ovo from "../../assets/logo ovo.png";
import dana from "../../assets/Logo DANA (PNG-240p) - FileVector69 1.png";
import paypal from "../../assets/logos_paypal.png";
import bca from "../../assets/Bank BCA Logo (SVG-240p) - FileVector69 1.png";
import bri from "../../assets/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment, { duration } from "moment";

function PaymentInfo() {
  const { data, isAuth } = useSelector((s) => s.users);
  console.log(data);
  const navigates = useNavigate();
  const [totalSeat, setTotalSeat] = useState(0);
  const { seats, title, time_watch, date, price, cinema } = useSelector(
    (s) => s.users
  );

  const ticket = seats.seats;
  const countTicket = ticket.split(",");
  const arrayTicket = countTicket.length;
  const now = new Date();
  const generateVirtualAccount = () => {
    const randomNumbers = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 10)
    );
    const virtualAccountNumber = randomNumbers.join("");
    return virtualAccountNumber;
  };

  const virtualAccount = generateVirtualAccount();
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(virtualAccount)
      .then(() => {
        console.log("virtual account copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying to clipboard", error);
      });
  };

  const targetDate = moment(now).add(2, "day");
  const dateDisplay = moment(now).add(2, "day").format("DD-MM-YYYY");

  const countTimer = () => {
    const payTime = moment.duration(targetDate.diff(moment()));
    const days = payTime.days();
    const hours = payTime.hours();
    const minutes = payTime.minutes();
    const seconds = payTime.seconds();
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };
  const result = countTimer(targetDate);

  useEffect(() => {
    if (!isAuth) {
      navigates("/");
    }

    let countSet = 0;
    seats.seats
      .split(",")
      .map((v) => (v != "" ? (" " ? countSet++ : "") : " "));
    setTotalSeat(countSet * price);
  }, [isAuth]);

  return (
    <div>
      <Navbar />
      <main className="w-full bg-border flex flex-col items-center pb-10">
        <ul className="steps">
          <li className="step step-success">Dates and Time</li>
          <li className="step step-success">Seats</li>
          <li className="step">Payment</li>
        </ul>

        <div className="bg-white w-3/4 px-10 py-10">
          <h1 className="font-bold text-2xl">Payment Info</h1>
          <p className="text-lg text-gray-300 mt-5">DATE & TIME</p>
          <p className="text-lg mt-3">
            {date}, {time_watch}
          </p>
          <hr className="border-gray-300 my-3 w-full" />
          <p className="text-lg text-gray-300 mt-5">MOVIE TITLE</p>
          <p className="text-lg mt-3">{title}</p>
          <hr className="border-gray-300 my-3 w-full" />
          <p className="text-lg text-gray-300 mt-5">CINEMA NAME</p>
          <p className="text-lg mt-3">{cinema}</p>
          <hr className="border-gray-300 my-3 w-full" />
          <p className="text-lg text-gray-300 mt-5">NUMBER OF TICKETS</p>
          <p className="text-lg mt-3">{`${arrayTicket} pieces`}</p>
          <hr className="border-gray-300 my-3 w-full" />
          <p className="text-lg text-gray-300 mt-5">TOTAL PAYMENT</p>
          <p className="text-lg mt-3 text-blue-800 font-bold">{`$. ${
            arrayTicket * price
          }.00`}</p>
          <hr className="border-gray-300 my-3 w-full" />

          <h1 className="font-bold text-2xl mt-10">PERSONAL INFORMATION</h1>
          <p className="text-lg text-gray-300 mt-5">FULL NAME</p>
          <input
            type="text"
            className="border border-gray rounded-lg w-full text-black px-3 py-3 mb-6 "
            placeholder={data.fullname}
          />
          <p className="text-lg text-gray-300 mt-5">EMAIL</p>
          <input
            type="text"
            className="border border-gray rounded-lg w-full text-black px-3 py-3 mb-6 "
            placeholder={data.email}
          />
          <p className="text-lg text-gray-300 mt-5">PHONE NUMBER</p>
          <input
            type="text"
            className="border border-gray rounded-lg w-full text-black px-3 py-3 mb-6 "
            placeholder={data.phone_number}
          />

          <h1 className="font-bold text-2xl mt-10 ">PAYMENT METHOD</h1>
          <div className="flex flex-col lg:flex-row gap-x-10 gap-y-10 mt-10 justify-center">
            <div className="btn border border-gray-300 w-full  lg:w-1/5 py-auto  items-center flex justify-center  rounded-lg focus:outline-none focus:ring focus:ring-primary">
              <img src={googlePlay} alt="" />
            </div>
            <div className="btn border border-gray-300 w-full lg:w-1/5 py-auto items-center flex justify-center  rounded-lg focus:outline-none focus:ring focus:ring-primary cursor-pointer">
              <img src={visa} alt="" />
            </div>
            <div className="btn border border-gray-300 w-full lg:w-1/5 py-auto items-center flex justify-center  rounded-lg focus:outline-none focus:ring focus:ring-primary cursor-pointer">
              <img src={gopay} alt="" />
            </div>
            <div className="btn border border-gray-300 w-full lg:w-1/5 py-auto items-center flex justify-center  rounded-lg focus:outline-none focus:ring focus:ring-primary cursor-pointer">
              <img src={paypal} alt="" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-x-10 gap-y-10 mt-10 justify-center">
            <div className="btn border border-gray-300 w-full  lg:w-1/5 py-auto  items-center flex justify-center  rounded-lg focus:outline-none focus:ring focus:ring-primary">
              <img src={dana} alt="" />
            </div>
            <div className="btn border border-gray-300 w-full  lg:w-1/5 py-auto  items-center flex justify-center rounded-lg focus:outline-none focus:ring focus:ring-primary">
              <img src={bca} alt="" />
            </div>
            <div className="btn border border-gray-300 w-full  lg:w-1/5 py-auto  items-center flex justify-center rounded-lg focus:outline-none focus:ring focus:ring-primary">
              <img src={bri} alt="" />
            </div>
            <div className="btn border border-gray-300 w-full  lg:w-1/5 py-auto  items-center flex justify-center  rounded-lg focus:outline-none focus:ring focus:ring-primary">
              <img src={ovo} alt="" />
            </div>
          </div>
          <button
            className="w-full bg-blue-700 text-white py-5 mt-5 font-bold rounded"
            onClick={() => window.my_modal_2.showModal()}
          >
            Pay your order
          </button>
          <dialog id="my_modal_2" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-2xl text-center">Payment Info</h3>
              <div className="flex justify-between mt-5">
                <p>No Rekening Virtual</p>
                <p>{virtualAccount}</p>
                <button
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={copyToClipboard}
                >
                  Copy
                </button>
              </div>
              <div className="flex justify-between mt-3">
                <p>Total Payment</p>
                <p className="text-blue-600">{`$. ${
                  arrayTicket * price
                }.00`}</p>
              </div>
              <p>
                Pay this payment bill before it is due,{" "}
                <span className="text-rose-600">{` in ${dateDisplay}, ${result.days} days, ${result.hours} hours, ${result.minutes} minutes, ${result.seconds} seconds`}</span>
                . If the bill has not been paid by the specified time, it will
                be forfeited
              </p>

              <div className="btn text-white w-full bg-blue-700 mt-5 rounded">
                <Link to="/tickets">Check Tickets</Link>
              </div>
              <div className="text-center mt-3 rounded">
                <Link to="/" className="text-blue-700 text-xl">
                  Pay Later
                </Link>
              </div>
            </form>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PaymentInfo;
