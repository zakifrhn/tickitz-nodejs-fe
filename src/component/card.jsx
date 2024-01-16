import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/noimage.png";

function Card({ id, name, image, genre }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="card w-44 bg-base-100 hover:shadow-xl hover:pointer">
        <figure className="px-5 py-5">
          <img
            src={image == "undefined" ? noImage : image}
            alt="Shoes"
            className="h-[200px] rounded-xl"
            onClick={() => setOpen(!open)}
          />
        </figure>
        {!open && (
          <div className="card-body items-center text-center -mt-10">
            <h2 className="card-title text-sm">{name}</h2>
            <p className="text-xs text-font">{genre}</p>
            <div className="card-actions">
              <button
                className="btn btn-primary text-white px-4 text-sm"
                onClick={() => navigate(`/detail/${id}`)}
              >
                Detail
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
