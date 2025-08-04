import StatBox from "./StatBox";
import {Dot} from "lucide-react";
import {useSanityData} from "@/context/SanityDataContext";

export default function Bio() {
  const {data} = useSanityData();
  const bio = data.bio[0];

  return (
    <>
      {/* sm	40rem (640px)	
          md	48rem (768px)	
          lg	64rem (1024px)	
          xl	80rem (1280px)	
          2xl	96rem (1536px)	 
      */}
      <div className="absolute p-4 w-1/2 top-2/5 -translate-y-1/2 text-right md:w-1/2 lg:w-1/3 lg:left-44">
        <h1 className="text-4xl md:text-6xl font-bold">{bio.name}</h1>
        <h2 className="text-2xl font-light text-primary">
          <div className="flex flex-col sm:flex-row justify-end sm:items-center md:gap-2">
            <span className="text-right">{bio.school}</span>
            <div className="flex gap-2 justify-end">
              <span className="flex text-right items-center">
                <Dot className="hidden sm:block" size={36} strokeWidth={0.75} /> #{bio.jersyNumber}
              </span>
              <span className="flex text-right items-center">
                <Dot size={36} strokeWidth={0.75} /> {bio.position}
              </span>
            </div>
          </div>
        </h2>
        <ul className="text-lg md:list-disc md:flex min-w-0 flex-basis-0 flex-shrink flex-grow flex-nowrap justify-end gap-8 mb-4">
          <li className="list-none">
            {bio.heightFeet}&apos; {bio.heightInches}&quot;, {bio.weight} lbs
          </li>
          <li>class of {bio.graduationYear}</li>
          {bio.gpa && <li>{bio.gpa.toFixed(1)} GPA</li>}
        </ul>
        <p className="text-xs md:text-md xl:text-lg font-extralight mb-4">{bio.statement}</p>
        <StatBox year={2024} classes="hidden xl:flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md text-neutral-950 justify-end" />
      </div>
      <StatBox year={2024} classes="absolute bottom-0 left-0 w-full flex xl:hidden flex-col items-center justify-center p-4 bg-white shadow-md text-neutral-950" />
    </>
  );
}
