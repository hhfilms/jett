"use client";

import React from "react";
import Header from "@/components/Header";
import StatChart from "@/components/StatChart";
import DotNavigation from "@/components/DotNavigation";
import {useEffect, useState} from "react";

import Articles from "./ArticleList";
import PhotoGallery from "./PhotoGallery";
import Contact from "./Contact";
import Link from "next/link";
import Schedule from "./Schedule";
import Bio from "./Bio";
import HudlVids from "./HudlVids";

import {FaSquareXTwitter, FaSquareInstagram} from "react-icons/fa6";
import Image from "next/image";
import YoutubeGallery from "./YouTubeGallery";
import StatTable from "./StatTable";

export default function FullPageWrapper() {
  const [hasMounted, setHasMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory relative">
      {/* Bio */}
      <section data-section-name="Bio" id="bio" className="bg-[url('/hero-2.png')] bg-center bg-cover bg-no-repeat h-screen bg-neutral-950 md:snap-start relative">
        <Header classes="px-8" />
        <Bio />
      </section>

      {/* Schedule */}
      <section data-section-name="Schedule" id="schedule" className="bg-neutral-900 md:snap-start w-full py-8">
        <Schedule />
      </section>

      {/* Stats */}
      <section data-section-name="Stats" id="stats" className="lg:h-screen bg-neutral-50 md:snap-start">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3 className="text-3xl uppercase lg:text-5xl font-bold text-neutral-950 text-center pt-4">Season Stats</h3>
          <div className="flex gap-0 mb-8">
            <button
              onClick={() => setViewMode("chart")}
              className={`px-2 text-sm py-1 rounded-tl-sm rounded-bl-sm  ${viewMode === "chart" ? "bg-primary text-white" : "bg-neutral-200 text-neutral-400"}`}>
              Chart
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-2 text-sm py-1 rounded-tr-sm rounded-br-sm ${viewMode === "table" ? "bg-primary text-white" : "bg-neutral-200 text-neutral-400"}`}>
              Table
            </button>
          </div>
          {viewMode === "chart" ? (
            <StatChart />
          ) : (
            <div key="table" className="animate-slideDown w-full">
              <StatTable />
            </div>
          )}
        </div>
      </section>

      {/* Articles*/}
      <section data-section-name="News" id="news" className="bg-neutral-50 md:h-screen md:snap-start">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3 className="text-3xl uppercase lg:text-5xl font-bold text-neutral-950 text-center pt-4">In the News</h3>
          <Articles />
        </div>
      </section>

      {/* Hudl */}
      <section data-section-name="Hudl" id="hudl" className="md:h-screen bg-neutral-50 md:snap-start">
        <h3 className="text-3xl uppercase lg:text-5xl font-bold text-neutral-950 text-center pt-4">Hudl Highlights</h3>
        <HudlVids />
      </section>

      {/* Photos */}
      <section data-section-name="Photos" id="photos" className="bg-neutral-50 md:snap-start w-full">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3 className="text-3xl uppercase lg:text-5xl font-bold text-neutral-950 text-center pt-4">Photos</h3>
          <PhotoGallery />
        </div>
      </section>

      {/* YouTube */}
      <section data-section-name="YouTube" id="youtube" className="md:h-screen bg-neutral-50 md:snap-start">
        <h3 className="text-3xl uppercase lg:text-5xl font-bold text-neutral-950 text-center py-4">YouTube</h3>
        <div className="w-full aspect-video max-w-6xl mx-auto lg:px-4">
          <YoutubeGallery />
        </div>
      </section>

      {/* Contact */}
      <section data-section-name="Contact" id="contact" className=" bg-[#e0e5ec] md:snap-start w-full">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3 className="text-3xl uppercase lg:text-5xl font-bold text-neutral-950 text-center pt-4">Connect with Me</h3>
          <p className="px-4 lg:px-0 text-xl mb-4 text-center text-neutral-500 font-extralight">Looking to talk football, recruiting, or partnerships? Let’s connect</p>
          <Contact />
        </div>

        <div className="bg-neutral-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-center md:gap-4">
          <h4 className="text-3xl md:text-4xl font-semibold uppercase">Follow me:</h4>
          <div className="font-semibold uppercase text-neutral-50 flex flex-row justify-center items-center gap-2">
            <div>
              <Link href="https://www.instagram.com/jett.lopezz/" target="_blank" className="cursor-pointer">
                <FaSquareInstagram size="4em" className="cursor-pointer" />
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link href="https://x.com/JettLopez10/" target="_blank" className="cursor-pointer">
                <FaSquareXTwitter size="4em" />
              </Link>
            </div>
            <div className="bg-neutral-50 hover:bg-neutral-100 rounded-lg cursor-pointer">
              <Link href="https://www.hudl.com/profile/18129509/Jett-Lopez/highlights" target="_blank" className="relative w-14 h-14 block cursor-pointer">
                <Image src="/hudl-logo-vector.svg" alt="Hudl Logo" fill sizes="(min-width: 1024px) 88px, (min-width: 640px) 56px, 44px" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto lg:h-full relative">
          <video src="/jettlopez.mp4" autoPlay muted loop playsInline className="h-full w-full object-cover" />
        </div>
        <div className="w-full lg:w-1/2 p-4 lg:p-12 flex flex-col justify-center text-neutral-50 ">
          <h3 className="text-3xl uppercase lg:text-5xl font-bold text-neutral-950 text-center pt-4">2025 Schedule</h3>
          <Schedule />
        </div>*/}
      <DotNavigation />
    </div>
  );
}
