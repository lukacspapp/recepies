'use client'

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "../app/globals.css";

export default function App() {
  return (
    <div className="flex justify-center items-center h-full">
      <Swiper className="mySwiper">
        <SwiperSlide className="bg-red-500">Slide 1</SwiperSlide>
        <SwiperSlide className="bg-blue-500">Slide 2</SwiperSlide>
        <SwiperSlide className="bg-green-500">Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
}
