"use client";

import {useCallback, useEffect, useState} from "react";

type Section = {
  id: string;
  label: string;
};

export default function DotNavigation() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, []);

  // Grab sections with data-section-name
  useEffect(() => {
    const foundSections: Section[] = [];

    document.querySelectorAll("section").forEach((el, index) => {
      const id = el.id || `section-${index}`;
      el.id = id;

      const label = el.getAttribute("data-section-name") || `Section ${index + 1}`;
      foundSections.push({id, label});
    });

    setSections(foundSections);
  }, []);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: document.getElementById("scroll-container") || null,
        threshold: 0.5,
      }
    );

    sections.forEach(({id}) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="hidden fixed top-1/2 right-6 -translate-y-1/2 z-50 md:flex flex-col gap-4">
      {sections.map((section) => {
        const isActive = section.id === activeSection;
        return (
          <button key={section.id} onClick={() => handleScroll(section.id)} className={`group relative w-4 h-4 rounded-full transition ${isActive ? "bg-[#3F69B3]" : "bg-gray-400 hover:bg-blue-300"}`}>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition text-right">
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
