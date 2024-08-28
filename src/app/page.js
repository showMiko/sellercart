"use client"

import HeroSection from "./components/HeroSection";
import ImageGallery from "./components/ImageGallery";

import WhatWeDo from "./components/WhatWeDo";

export default function Home() {
  return (
    <div className="flex justify-center flex-col" style={{margin:"-3rem"}}> 
    <HeroSection/>
    <WhatWeDo/>
    <ImageGallery/>

    </div>
  );
};

