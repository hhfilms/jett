"use client";

import React from "react";
import Header from "@/components/Header";
import StatChart from "@/components/StatChart";
import DotNavigation from "@/components/DotNavigation";
import {useEffect, useState} from "react";
import StatBox from "./StatBox";
import Articles from "./ArticleList";
import PhotoGallery from "./PhotoGallery";
import Contact from "./Contact";
import Link from "next/link";
import Schedule from "./Schedule";

export default function FullPageWrapper() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory relative">
      {/* Bio */}
      <section data-section-name="Bio" id="one" className="bg-[url('/hero-2.png')] bg-center bg-cover bg-no-repeat h-screen bg-neutral-950 md:snap-start relative">
        <Header classes="px-4" />
        <div className="absolute w-1/2 top-1/2 -translate-y-1/2 md:w-2/3 md:-left-36 xl:w-1/3 xl:left-28 p-4  text-right">
          <h2 className="text-6xl font-bold">Jett Lopez</h2>
          <h3 className="text-2xl font-light text-primary">
            <ul className="md:list-disc md:flex min-w-0 flex-basis-0 flex-shrink flex-grow flex-nowrap justify-end gap-8">
              <li className="list-none">Amarillo High</li>
              <li>#2</li>
              <li>QB</li>
            </ul>
          </h3>
          <ul className="text-lg md:list-disc md:flex min-w-0 flex-basis-0 flex-shrink flex-grow flex-nowrap justify-end gap-8 mb-4">
            <li className="list-none">6&apos; 1&quot;, 205 lbs</li>
            <li>class of 2026</li>
          </ul>

          <StatBox
            year={2024}
            yds={3004}
            tds={34}
            rating={130.0}
            ints={4}
            comp={65.7}
            classes="hidden xl:flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md text-neutral-950 justify-end"
          />
        </div>
        <StatBox
          year={2024}
          yds={3004}
          tds={34}
          rating={130.0}
          ints={4}
          comp={65.7}
          classes=" absolute bottom-0 left-0 w-full flex xl:hidden flex-col items-center justify-center p-4 bg-white shadow-md text-neutral-950"
        />
      </section>

      {/* Stats */}
      <section data-section-name="Stats" id="two" className="lg:h-screen bg-neutral-50 md:snap-start">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3 className="text-2xl uppercase lg:text-5xl font-bold text-neutral-950 text-center py-4">2025 in Season Stats</h3>
          <StatChart />
        </div>
      </section>

      {/* Articles*/}
      <section data-section-name="News" id="three" className="bg-neutral-950 md:h-screen md:snap-start">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3 className="text-2xl uppercase lg:text-5xl font-bold text-neutral-50 text-center py-4">In the News</h3>
          <Articles />
        </div>
      </section>

      {/* Photos */}
      <section data-section-name="Action" id="four" className="lg:h-screen bg-neutral-50 md:snap-start w-full">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3 className="text-2xl uppercase lg:text-5xl font-bold text-neutral-950 text-center py-4">In Action</h3>
          <PhotoGallery />
        </div>
      </section>

      {/* Section 5 */}
      {/* <section data-section-name="Videos" id="five" className="md:h-screen bg-neutral-50 md:snap-start">
        <h3 className="text-2xl uppercase lg:text-5xl font-bold text-neutral-950 text-center py-4">Videos</h3>
        <main className="w-full">videos</main>
      </section> */}

      {/* Contact */}
      <section data-section-name="Contact" id="seven" className="lg:h-screen bg-neutral-50 md:snap-start flex flex-col">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3 className="text-2xl uppercase lg:text-5xl font-bold text-neutral-950 text-center pt-4">Connect with Me</h3>
          <p className="px-4 lg:px-0 text-xl mb-4 text-center text-primary font-extralight">Looking to talk football, recruiting, or partnerships? Let’s connect</p>
          <Contact />
        </div>
        <div className="bg-neutral-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-center md:gap-4">
          <h4 className="text-3xl md:text-4xl font-semibold uppercase">Follow me:</h4>
          <h5 className="text-3xl md:text-4xl font-semibold uppercase text-primary">
            <Link href="https://www.instagram.com/jett.lopezz/" target="_blank" className="hover:underline">
              @jett.lopezz
            </Link>
          </h5>
        </div>
      </section>

      {/* Schedule */}
      <section data-section-name="Schedule" id="eight" className="lg:h-screen overflow-hidden md:snap-start lg:flex flex-row justify-center">
        <div className="lg:flex h-screen lg:w-1/2">
          <video src="/jettlopez.mp4" autoPlay muted loop playsInline className="h-full w-full object-cover" />
        </div>
        <div className="lg:flex flex-col lg:w-1/2 lg:p-12 flex-grow flex justify-center text-neutral-50">
          <h3 className="uppercase text-2xl md:text-5xl  xl:text-7xl font-bold text-neutral-950 text-center">2025 Schedule</h3>
          <div className="">
            <Schedule />
          </div>
        </div>
      </section>
      <DotNavigation />
    </div>
  );
}
