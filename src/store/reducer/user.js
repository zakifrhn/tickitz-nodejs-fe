import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isAuth: false,
    token: "",
    data: {},
    role: "",
    date: "",
    time_watch: "",
    title: "",
    price: "",
    cinema: "",
    seats: "",
    imgCinema: "",
    location: "",
    imgUser: "",
  },
  reducers: {
    login(state, actions) {
      return {
        ...state,
        isAuth: true,
        token: actions.payload,
        data: {
          role: actions.payload.role,
        },
      };
    },
    logout(state, actions) {
      return {
        ...state,
        isAuth: false,
        token: "",
        data: {
          role: "",
        },
        title: "",
        time_watch: "",
        date: "",
        price: "",
        cinema: "",
        location: "",
        imgCinema: "",
      };
    },
    bookingDetails(state, actions) {
      return {
        ...state,
        title: actions.payload.title,
        time_watch: actions.payload.time_watch,
        date: actions.payload.date,
        price: actions.payload.price,
        cinema: actions.payload.cinema,
        location: actions.payload.location,
        imgCinema: actions.payload.imgCinema,
      };
    },
    confirmationSeats(state, actions) {
      return {
        ...state,
        seats: actions.payload.seats,
      };
    },

    addData(state, actions) {
      return {
        ...state,
        data: actions.payload,
      };
    },
  },
});

export const { login, logout, bookingDetails, confirmationSeats, addData } =
  userSlice.actions;
export default userSlice.reducer;
