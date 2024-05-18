
import React from "react"

import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
// import { bannerImages } from "@/lib/constants";
import BannerBottom from "@/components/BannerBottom";

import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "https://ng.jumia.is/cms/0-5-brand-festival/2023/BF-Slider.jpg",
  },
  {
    id: 2,
    image:
      "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/w35-Grocery/Slider_.jpg",
  },
  {
    id: 3,
    image: "https://ng.jumia.is/cms/08-august/theplace_desktopslider.jpg",
  },
];

export default function Home() {

  return (
    <>
      {/* <FullWidthSlider slides={slides} /> */}
      <Image src="/banner.jpg" alt="banner" width={1000} height={300} className="w-screen" />
      {/* <Hero images={bannerImages} /> */}
      <BannerBottom />
      <Collections />
      <ProductList />
    </>
  );
}

export const dynamic = "force-dynamic";

