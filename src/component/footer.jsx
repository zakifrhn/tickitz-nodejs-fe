import React from 'react'
import logo from '../assets/logo.png'
import cinema1 from '../assets/Vector-3.png'
import cinema2 from '../assets/Vector-2.png'
import cinema3 from '../assets/Vector-1.png'
import fb from '../assets/fb.png'
import ig from '../assets/icons8-instagram-50.png'
import yt from '../assets/icons8-youtube-50.png'
import tw from '../assets/twitter.png'


function Footer() {
  return (
    <div className='w-screen'>
      <footer className="footer-view-all w-screen ps-8 pe-8 md:pb-12 bg-white md:gap-x-7 ps-5 pe-5 mt-3 pt-7 md:grid md:grid-flow-col lg:gap-x-30 sm:flex sm:flex-col sm:gap-y-7">
        
        <div className="footer-1 md:flex md:flex-col md:ms-5 xl:flex xl:mx-auto">
          <img src={logo} className="md:w-32" alt="" />
          <div className="stop-watch mt-3 text-font md:text-xs xs:text-base font-sans">
            <p>
              Stop waiting in line. Buy tickets <br />
              conveniently, watch movies quietly.
            </p>
          </div>
        </div>

        <div className="footer-3 md:flex md:flex-col xs:flex xs:flex-wrap xs:flex-row xs:mt-5 xs xl:flex xl:mx-auto">
          <p className="font-bold md:mb-5 xs:w-full">Explore</p>
          <p className="text-font md:mb-3 md:text-sm xs:w-2/4">
            <a href="index.html">Home</a>
          </p>
          <p className="text-font text-sm md:w-full xs:w-2/4">
            <a href="#">List Movie</a>
          </p>
        </div>

        <div className="footer-3 md:gap-y-5 md:flex md:flex-col xs:flex xs:flex-wrap xs:flex-row xs:gap-x-5 xs:mt-5 xl:flex xl:mx-auto">
          <p className="font-bold text-sm xs:w-full xs:mb-3">Our Sponsor</p>
          <img src={cinema1} className="md:-mt-5 md:w-20 xs:w-16" alt=""/>
          <img src={cinema2} className="md:w-24 xs:w-20" alt="" />
          <img src={cinema3} className="md:w-20 xs:w-16" alt="" />
        </div>

        <div className="footer-4 md:gap-y-3 mb-5 md:flex md:flex-col xs:flex xs:flex-row xs:flex-wrap xs:gap-x-5 xs:mt-5 xs:pb-5 xl:flex xl:mx-auto">
          <div className="fu font-bold xs:w-full xs:mb-5">Follow Us</div>
          <span className="fb flex flex-row gap-x-2 md:-mt-5">
            <img src={fb} alt="" />
            <p className="hidden md:flex md:text-xs md:items-center md:ps-2">
              Tickitz Cinema Id
            </p>
          </span>
          <span className="ig flex flex-row gap-x-2">
            <img
              src={ig}
              className="md:w-5 xs:w-5"
              alt=""
            />
            <p className="hidden md:flex md:text-xs md:items-center">
              Tickitz Cinema Id
            </p>
          </span>
          <span className="tw flex flex-row gap-x-2">
            <img src={tw} alt="" />
            <p className="hidden md:flex md:text-xs md:items-center">
              Tickitz Cinema Id
            </p>
          </span>
          <span className="yt flex flex-row gap-x-2">
            <img
              src={yt}
              className="md:w-5 xs:w-5"
              alt=""
            />
            <p className="hidden md:flex md:text-xs md:items-center">
              Tickitz Cinema Id
            </p>
          </span>
        </div>
      </footer>
      <p className="copyright md:pb-10 md:-mt-5 md:mb-5 text-center text-sm text-font bg-white text-center xs:-mt-6 xs:pb-5">
        © 2020 Tickitz. All Rights Reserved
      </p>
  
    </div>
  )
}

export default Footer
