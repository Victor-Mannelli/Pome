"use client"

import { SingleAnimeDataForSlug } from "@/utils/types";
import { useEffect } from "react";
import DOMPurify from 'dompurify';

export function Sinopse({ animeData, inAnimeInfo }: { animeData: SingleAnimeDataForSlug | null, inAnimeInfo: boolean }) {
  const sinopseDiv = document.getElementById(inAnimeInfo ? "sinopseAI" : "sinopsePG");
  const cleanedDescription = DOMPurify.sanitize(animeData.description)

  useEffect(() => {
    if (sinopseDiv && sinopseDiv.innerHTML !== cleanedDescription) {
      sinopseDiv.innerHTML = cleanedDescription
    };
  }, [sinopseDiv])

  return (
    <>
      <div className={`bg-fourthAndAHalf rounded-xl p-5 text-white
          ${inAnimeInfo ? "w-full" : "w-[calc(100%-40px)]"}
          ${(inAnimeInfo && animeData.bannerImage) || (!inAnimeInfo && !animeData.bannerImage) ? "hidden" : ""}
        `}>
        <h1 className="text-xl font-bold pb-3"> Sinopse </h1>
        <div id={inAnimeInfo ? "sinopseAI" : "sinopsePG"} className="text-lg text-white">
        </div>
      </div>
    </>
  )
}
