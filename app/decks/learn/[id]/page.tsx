"use client";

import { useState } from "react";
import { BookOpen, Info, RotateCw } from "lucide-react";
import BackButton from "@/app/components/BackButton";
import Link from "next/link";

const flashcards = []; // Empty array for demonstration

export default function LearningPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animateKey, setAnimateKey] = useState(0);
  const currentCard = flashcards[currentCardIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      setAnimateKey((prevKey) => prevKey + 1); // Update the key to restart the animation
    }, 200);
  };

  return (
    <div className="min-h-screen dark:bg-gray-950 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4 dark:text-white flex justify-center items-center gap-2">
        <BookOpen /> Learning Deck: <span className="font-bold">Vocabs</span>
      </h1>
      {flashcards.length === 0 ? (
        <>
          <div
            className="alert w-full max-w-xl flex justify-center items-center"
            role="alert"
          >
            <p className="sm:text-sm md:text-xl dark:text-white text-center flex justify-center items-center gap-2 ">
              <Info className="text-info" /> No more cards to study today. Come
              back tomorrow!
            </p>
          </div>
          <div className="mt-4">
            <span>Or</span>
            <Link href="/create" className="btn-link ml-2">
              Create a Card
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="w-full max-w-md h-80 mb-4 [perspective:1000px]">
            <div className="ml-2 md:!ml-0">
              <BackButton />
            </div>
            <div
              className={`relative cursor-pointer w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                isFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
              onClick={handleFlip}
            >
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <div className="w-full h-full bg-white dark:bg-gray-900 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl flex items-center justify-center p-6">
                  <p
                    key={animateKey}
                    className="text-2xl font-semibold text-center dark:text-white animate-fade-in"
                  >
                    {currentCard.front}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="w-full h-full bg-white dark:bg-gray-900 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl flex items-center justify-center p-6">
                  <p
                    key={animateKey}
                    className="text-2xl font-semibold text-center dark:text-white animate-fade-in"
                  >
                    {currentCard.back}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full max-w-md mt-4">
            <button
              onClick={handleFlip}
              className="flex items-center px-4 py-4 mt-2 bg-white dark:bg-gray-900 bg-opacity-20 dark:text-white rounded-full hover:bg-opacity-30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <RotateCw className="mr-2 h-4 w-4" />
              {isFlipped ? "Hide answer" : "Show answer"}
            </button>
          </div>
          {isFlipped && (
            <div className="flex space-x-2 mt-4">
              <button className="btn-default" onClick={handleNext}>
                Again
              </button>
              <button className="btn-default" onClick={handleNext}>
                Hard
              </button>
              <button className="btn-default" onClick={handleNext}>
                Easy
              </button>
              <button className="btn-default" onClick={handleNext}>
                Very Easy
              </button>
            </div>
          )}
          <p className="mt-4 text-sm dark:text-white">
            Card {currentCardIndex + 1} of {flashcards.length}
          </p>
        </>
      )}
    </div>
  );
}
