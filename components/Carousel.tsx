'use client'

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "../app/globals.css";
import { MoveLeft, MoveRight } from "lucide-react";
import { useScroll } from "framer-motion";

export default function Carousel({ } : { }) {


  const data = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1480926965639-9b5f63a0817b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
  ]

  const ref = useRef(null);



  return (
    <div className="flex items-center overflow-x-scroll h-44">
      <ul className="flex list-none p-0 mb-0">
        {/* {children} */}
      </ul>
    </div>
  )
}
