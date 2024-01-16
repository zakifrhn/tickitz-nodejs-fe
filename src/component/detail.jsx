import React from 'react'

function MovieDetail({name, genre, release_date, duration, directed, casts, synopsis, image}) {
  return (
    <div>
    <div className="wrapper-detail-movie md:grid md:grid-cols-6 md:gap-x-3 xs:flex xs:flex-col">
    <div className="banner-detail md:grid md:col-start-1 md:col-span-2">
      <div className="img-banner border border-border rounded-md p-3 mx-auto flex items-center h-fit w-full xs:w-4/5 xs:my-5">
        <img src={image} className="mx-auto max-h-[250px]" alt="" />
      </div>
    </div>
    <div className="detail-info md:grid md:col-start-3 md:col-span-6">
      <div className="wrapper-detail-info flex flex-col">
        <div className="wrapper-title-genre xs:text-center">


          <h3 className="text-2xl 2xl:text-4xl">{name}</h3>
          <p className="text-sm text-font mt-2 2xl:text-xl">{genre}</p>
        </div>


        <div className="info-about-movie mt-4 grid grid-rows-2 grid-cols-2">
          <div className="box-info py-2">
            <p className="info-in-top text-xs text-font mb-2 2xl:text-2xl">Release Date</p>
            <p className="info-in-bottom text-sm ">{release_date}</p>
          </div>
          <div className="col-8 box-info col py-2">
            <p className="info-in-top text-xs text-font mb-2 2xl:text-2xl">Duration</p>
            <p className="info-in-bottom text-sm ">{duration}</p>
          </div>
          <div className="col-4 box-info py-2">
            <p className="info-in-top text-xs text-font mb-2 2xl:text-2xl">Directed By</p>
            <p className="info-in-bottom text-sm ">{directed}</p>
          </div>
          <div className="col-8 box-info py-2">
            <p className="info-in-top text-xs text-font mb-2 2xl:text-2xl">Casts</p>
            <p className="info-in-bottom text-sm ">
              {casts}
            </p>
          </div>
        </div>
        <div className="line-1 w-full my-5">
          <hr />
        </div>
        <div className="wrapper-synopsis flex flex-col gap-y-3">
          <p className="text-2xl">Synopsis</p>
          <p className="text-sm text-font text-justify">
                {synopsis}
          </p>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default MovieDetail
