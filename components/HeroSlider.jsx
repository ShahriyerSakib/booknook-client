"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaBookOpen, FaRegCalendarCheck, FaPlusCircle } from "react-icons/fa";

const slides = [
  {
    title: "Your next read is one click away",
    text: "Browse books shared by our community and pick something for the week ahead.",
    icon: <FaBookOpen />,
    bg: "from-[#0f5c4d] to-[#0b3b33]",
    stamp: "Open shelves",
  },
  {
    title: "Borrow for seven days, no fees",
    text: "Confirm a borrow in seconds. Your return date is set for you and tracked in My Borrows.",
    icon: <FaRegCalendarCheck />,
    bg: "from-[#1c2f5a] to-[#101c38]",
    stamp: "Due in 7 days",
  },
  {
    title: "Got books gathering dust? Share them",
    text: "Add a title, upload a cover and let other readers borrow it. Edit or remove it any time.",
    icon: <FaPlusCircle />,
    bg: "from-[#7a4a0c] to-[#3d2606]",
    stamp: "Add yours",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="w-full"
    >
      {slides.map((s) => (
        <SwiperSlide key={s.title}>
          <div className={`bg-gradient-to-br ${s.bg} text-white`}>
            <div className="container-x grid min-h-[26rem] items-center gap-8 py-16 md:min-h-[32rem] md:grid-cols-[1.2fr_1fr]">
              <div className="space-y-5 px-6 md:px-10">
                <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">{s.title}</h1>
                <p className="max-w-lg text-lg opacity-85">{s.text}</p>
                <Link href="/books" className="btn btn-accent rounded-lg">Browse Books</Link>
              </div>
              <div className="hidden justify-center md:flex">
                <div className="ruled relative w-72 rotate-3 rounded-lg bg-[#f7f9f8] p-6 text-[#13231f] shadow-2xl">
                  <div className="mb-4 text-5xl text-[#0f5c4d]">{s.icon}</div>
                  <p className="font-display text-xl font-bold">Library Card</p>
                  <p className="mt-1 text-sm opacity-70">BookNook member</p>
                  <div className="stamp mt-6 inline-block px-3 py-1 text-sm font-bold" style={{ color: "#b7740f", borderColor: "#b7740f" }}>{s.stamp}</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
