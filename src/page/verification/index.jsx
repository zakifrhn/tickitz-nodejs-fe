import React from "react";
import success from "../../assets/success.png";
import useApi from "../../helpers/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { Show } from "../../helpers/toast";

function Verification() {
  const token = useParams();
  const navigate = useNavigate();
  const api = useApi();

  const verif = () => {
    api({
      method: "GET",
      url: `/auth/${token.code}`,
    })
      .then(() => {
        Show("Registration success", "success");
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div>
      <div className="w-screen h-screen flex justify-center">
        <div className="w-4/5 md:w-3/6 h-fit rounded-lg shadow-lg shadow-gray-500/50 align-middle m-auto p-10">
          <img src={success} alt="" className="mx-auto" />
          <div className="text-center mt-5">
            <p>
              Terimakasih telah mendaftarkan akun anda. Email anda sudah
              terverifikasi. Silahkan Login Kembali
            </p>
          </div>
          <button className="w-full flex justify-center mt-5">
            <div
              className="w-2/5 justify-center border rounded-md p-2  md:mt-5 xs:mt-5 bg-primary text-white"
              onClick={verif}
            >
              Sign In
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
