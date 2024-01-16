import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useApiMulti } from "../helpers/useApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import noImage from "../assets/noimage.png";

function CardAdmin({ image, name, genre, id }) {
  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();
  const apiMulti = useApiMulti();
  const { isAuth } = useSelector((s) => s.users);

  const [modalDelete, setModalDelete] = useState(false);
  const [response, setResponse] = useState(0);
  const [modalSuccess, setModalSuccess] = useState(false);

  const deleteMovie = async () => {
    try {
      await apiMulti({
        method: "DELETE",
        url: `/movie/delete/${id}`,
      })
        .then(({ data }) => {
          console.log("Data berhasil dihapus", data);
          setModalSuccess(true);
          setResponse(data.status);
        })
        .catch((er) => {
          console.error(er);
          console.log(er);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = async () => {
    setModalDelete(true);
  };

  useEffect(() => {
    if (!isAuth) navigate("/sign-in");
  }, [isAuth]);

  return (
    <div>
      <div className="card w-44 bg-base-100 border border-border hover:shadow-xl">
        <figure className="px-5 pt-5">
          <img
            src={image == "null" ? noImage : image}
            alt="imageCinema"
            className="h-[200px] rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center -mt-3">
          <h2 className="card-title text-sm">{name}</h2>
          <p className="text-xs text-font">{genre}</p>
          <div className="card-actions flex flex-col py-3 gap-y-3">
            <button
              className="btn-sm rounded-md btn-outline btn btn-info px-4 w-full"
              onClick={() => navigate(`/edit/${id}`)}
            >
              Update
            </button>

            <button
              className="btn-sm rounded-md btn btn-outline btn-error px-4 w-full"
              onClick={showModal}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {modalDelete ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full ">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Confirm</h3>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="px-8 py-5 text-red-500 bg-transparent font-bold uppercase rounded-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow-lg"
                    type="button"
                    onClick={() => setModalDelete(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary px-8 py-5 text-white font-bold rounded-lg hover:shadow-lg"
                    type="button"
                    onClick={deleteMovie}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {modalSuccess ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full ">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Confirm</h3>
                  {response === 200 ? (
                    <p className="text-gray-400 mt-5">
                      Movie Berhasil Di Hapus
                    </p>
                  ) : (
                    <p className="text-gray-400 mt-5">Movie Gagal Di Hapus</p>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="px-8 py-5 text-red-500 bg-transparent font-bold uppercase rounded-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow-lg"
                    type="button"
                    onClick={() => navigate("/")}
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

export default CardAdmin;
