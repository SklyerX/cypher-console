"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function AuthCard() {
  return (
    <div className="w-11/12 md:w-[500px] h-[500px] bg-[#212121] border border-input rounded-md flex flex-col items-center pt-10">
      <Image src="/hat.png" alt="App Logo" width={70} height={70} />
      <h1 className="text-xl font-medium">Cypher Developer Panel</h1>
      <button
        className="w-11/12 py-2 flex gap-2 items-center justify-center mt-10 bg-blue-500/30 rounded-full border border-blue-700 hover:bg-blue-500/50"
        onClick={() => signIn("discord")}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.6933 7.10665C23.92 6.27998 22 5.67998 20 5.33331C19.9825 5.33275 19.965 5.33604 19.9489 5.34295C19.9328 5.34987 19.9183 5.36023 19.9067 5.37331C19.6667 5.81331 19.3867 6.38665 19.2 6.82665C17.0787 6.50665 14.9213 6.50665 12.8 6.82665C12.6133 6.37331 12.3333 5.81331 12.08 5.37331C12.0667 5.34665 12.0267 5.33331 11.9867 5.33331C9.98666 5.67998 8.07999 6.27998 6.29333 7.10665C6.27999 7.10665 6.26666 7.11998 6.25333 7.13331C2.62666 12.56 1.62666 17.84 2.11999 23.0666C2.11999 23.0933 2.13333 23.12 2.15999 23.1333C4.55999 24.8933 6.86666 25.96 9.14666 26.6666C9.18666 26.68 9.22666 26.6666 9.23999 26.64C9.77333 25.9066 10.2533 25.1333 10.6667 24.32C10.6933 24.2666 10.6667 24.2133 10.6133 24.2C9.85333 23.9066 9.13333 23.56 8.42666 23.16C8.37333 23.1333 8.37333 23.0533 8.41333 23.0133C8.55999 22.9066 8.70666 22.7866 8.85333 22.68C8.87999 22.6533 8.91999 22.6533 8.94666 22.6666C13.5333 24.76 18.48 24.76 23.0133 22.6666C23.04 22.6533 23.08 22.6533 23.1067 22.68C23.2533 22.8 23.4 22.9066 23.5467 23.0266C23.6 23.0666 23.6 23.1466 23.5333 23.1733C22.84 23.5866 22.1067 23.92 21.3467 24.2133C21.2933 24.2266 21.28 24.2933 21.2933 24.3333C21.72 25.1466 22.2 25.92 22.72 26.6533C22.76 26.6666 22.8 26.68 22.84 26.6666C25.1333 25.96 27.44 24.8933 29.84 23.1333C29.8667 23.12 29.88 23.0933 29.88 23.0666C30.4667 17.0266 28.9067 11.7866 25.7467 7.13331C25.7333 7.11998 25.72 7.10665 25.6933 7.10665ZM11.36 19.88C9.98666 19.88 8.83999 18.6133 8.83999 17.0533C8.83999 15.4933 9.95999 14.2266 11.36 14.2266C12.7733 14.2266 13.8933 15.5066 13.88 17.0533C13.88 18.6133 12.76 19.88 11.36 19.88ZM20.6533 19.88C19.28 19.88 18.1333 18.6133 18.1333 17.0533C18.1333 15.4933 19.2533 14.2266 20.6533 14.2266C22.0667 14.2266 23.1867 15.5066 23.1733 17.0533C23.1733 18.6133 22.0667 19.88 20.6533 19.88Z"
            fill="#0284c7"
          />
        </svg>
        Discord
      </button>
      <button
        className="w-11/12 py-2 flex gap-2 items-center justify-center mt-3 bg-white/30 rounded-full border border-white hover:bg-white/50"
        onClick={() => signIn("google")}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.08542 10.0133C5.19476 7.80428 6.89658 5.94731 9.00066 4.64992C11.1047 3.35253 13.5282 2.66585 16.0001 2.66663C19.5934 2.66663 22.6121 3.98796 24.9201 6.13996L21.0974 9.96396C19.7147 8.64263 17.9574 7.96929 16.0001 7.96929C12.5267 7.96929 9.58675 10.316 8.54008 13.4666C8.27342 14.2666 8.12142 15.12 8.12142 16C8.12142 16.88 8.27342 17.7333 8.54008 18.5333C9.58808 21.6853 12.5267 24.0306 16.0001 24.0306C17.7934 24.0306 19.3201 23.5573 20.5147 22.7573C21.2073 22.3013 21.8003 21.7096 22.2577 21.018C22.7151 20.3263 23.0275 19.5491 23.1761 18.7333H16.0001V13.576H28.5574C28.7147 14.448 28.8001 15.3573 28.8001 16.3026C28.8001 20.364 27.3467 23.7826 24.8241 26.1026C22.6187 28.14 19.6001 29.3333 16.0001 29.3333C14.2489 29.334 12.5148 28.9896 10.8968 28.3198C9.27882 27.65 7.80868 26.6679 6.57043 25.4296C5.33217 24.1914 4.35008 22.7212 3.68026 21.1032C3.01045 19.4852 2.66605 17.7511 2.66675 16C2.66675 13.848 3.18142 11.8133 4.08542 10.0133Z"
            fill="#ffffff"
            className="group-hover:text-black"
          />
        </svg>
        Google
      </button>
    </div>
  );
}