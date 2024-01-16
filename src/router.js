import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home/index";
import SignIn from "./page/login/signIn";
import Register from "./page/signup/";
import ViewAll from "./page/view_all/index";
import MovieDetail from "./page/movieDetail/index";
import Admin from "./page/admin/index";
import EditMovie from "./page/admin/editmovie";
import Verification from "./page/verification";
import OrderDetail from "./page/orders";
import PaymentInfo from "./page/payments";
import Tickets from "./page/tickets";
import ProfileUser from "./page/profiles";
import HistoryBooking from "./page/history";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification/:code" element={<Verification />} />
        <Route path="/view-all" element={<ViewAll />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit/:id" element={<EditMovie />} />

        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/order/:id" element={<OrderDetail />} />

        <Route path="/payment" element={<PaymentInfo />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/profiles" element={<ProfileUser />} />
        <Route path="/profiles/history" element={<HistoryBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
