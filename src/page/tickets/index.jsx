import React, { useRef, useEffect } from 'react'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import tickitz from '../../assets/tickitz 1.png'
import background from '../../assets/background.png'
import tiket from '../../assets/Ticket.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as htmlToImage from 'html-to-image';
import { Show } from '../../helpers/toast'
import {useNavigate} from 'react-router-dom'



const Tickets = () => {

    const {isAuth} = useSelector((s)=>s.users)
    const navigates = useNavigate()
    const { 
        seats,
        title,
        time_watch,
        date, price} = useSelector((s) => s.users)

        const ticket = seats.seats;
        const countTicket = ticket.split(',')
        const arrayTicket = countTicket.length
    
      
        const containerRef = useRef()

        const convertToImage = () =>{

            htmlToImage.toPng(containerRef.current).then((dataImageURL)=>{
                
                const link = document.createElement('a')
                link.href = dataImageURL
                const fileName = `ticket for film ${title}`
                link.download = fileName
                link.click()
            }).catch((error)=>{
                setTimeout(()=>{
                    Show('sorry this ticket can not download', 'error')
                },3000)

            })
        }
        useEffect(()=>{
            if(!isAuth){
                navigates('/')
            }
        },[isAuth])
          
  return (
    <div>
        <Navbar/>
        <main className="bg-background h-full w-full flex flex-col lg:flex-row gap-x-20 items-center">
                <div className="relative">
                    <img src={background} className=" h-full object-cover brightness-50" alt="" />
                    <div className="absolute inset-0 flex ml-10 md:ml-40 items-start justify-center flex-col">
                        <img src={tickitz} alt="" />
                        <h1 className="text-white text-2xl font-bold">Thank you for purchasing</h1>
                        <p className="text-white font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="text-white">please download your ticket</p>
                    </div>
                </div>
                <div className="h-full flex flex-col md:mr-20 gap-y-5">
                    <div className="w-full bg-white" ref={containerRef}>
                        <img src={tiket} className="h-full mt-20" alt="" />
                        <div className="pb-10 w-full">
                            <div className=" flex flex-row justify-between mx-5 pt-5">
                                <div>
                                    <p>Movie</p>
                                    <p className="font-bold">{title.length >= 15 ? title.slice(0, 15) + `...` : title}</p>
                                </div>
                                <div>
                                    <p  className='flex justify-end'>Category</p>
                                    <p className="font-bold flex justify-end">PG-13</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between mx-5 pt-5">
                                <div>
                                    <p>Date</p>
                                    <p className="font-bold">{date}</p>
                                </div>
                                <div>
                                    <p className='flex justify-end'>Time</p>
                                    <p className="font-bold">{time_watch}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between mx-5 pt-5">
                                <div>
                                    <p>Count</p>
                                    <p className="font-bold">{arrayTicket}</p>
                                </div>
                                <div>
                                    <p className='flex justify-end'>Seats</p>
                                    <p className="font-bold">{ticket}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center pt-5">
                                <div className="border px-5 py-2 flex justify-between w-3/4">
                                    <h1>Total</h1>
                                    <h1 className="font-bold">$. {arrayTicket * price}.00</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full border btn border-blue-600 py-3 text-blue-600 font-bold" onClick={convertToImage}>Download</button>
                    <Link to="/profiles/history" className="btn w-full border bg-blue-600 text-white font-bold py-3 hover:text-blue-600">Done</Link>
                </div>
            </main>
        <Footer/>
    </div>
  )
}

export default Tickets
