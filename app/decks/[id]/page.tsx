"use client";

import SingleDeckLoadingSkeleton from "@/app/components/SingleDeckLoadingSkeleton";
import { Deck } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

const cards = [
  { id: 1, front: "What is the capital of France?", back: "Paris" },
  { id: 2, front: "What is 2 + 2?", back: "4" },
  { id: 3, front: "Who wrote 'To Kill a Mockingbird'?", back: "Harper Lee" },
  {
    id: 4,
    front: "What is the largest planet in our solar system?",
    back: "Jupiter",
  },
  {
    id: 5,
    front: "What is the boiling point of water in Celsius?",
    back: "100°C",
  },
  { id: 6, front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" },
  { id: 7, front: "What is the smallest prime number?", back: "2" },
  { id: 8, front: "What is the chemical symbol for gold?", back: "Au" },
  {
    id: 9,
    front: "Who was the first President of the United States?",
    back: "George Washington",
  },
  { id: 10, front: "What is the capital of Japan?", back: "Tokyo" },
];

const SingleDeckPage = ({ params: { id } }: Props) => {
  const [deck, setDeck] = useState<Deck>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/decks/${id}`);
        setDeck(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        } else {
          setError("Error Fetching Deck Info!");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeck();
  }, []);

  if (isLoading) {
    return <SingleDeckLoadingSkeleton />;
  }

  if (deck) {
    return (
      <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 p-8">
        {error && <div className="text-red-500">{error}</div>}
        <div className="max-w-3xl mx-auto dark:bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{deck.name}</h2>
          <p className="light:text-gray-600 mb-2">
            <strong>Tags:</strong> {deck.tags || "None"}
          </p>
          <p className="light:text-gray-600 mb-2">
            <strong>Created At:</strong>{" "}
            {new Date(deck.createdAt).toDateString()}
          </p>
          <p className="light:text-gray-600 mb-2">
            <strong>Updated At:</strong>{" "}
            {new Date(deck.updatedAt).toDateString()}
          </p>
          <p className="light:text-gray-600 mb-2">
            <strong>Last Studied:</strong>{" "}
            {new Date(deck.updatedAt).toDateString()}
          </p>
          <button className="btn-default mt-4 mb-4">Study Now</button>
          <p>Complete Deck:</p>
          {cards.map((card) => (
            <div
              key={card.id}
              className="collapse collapse-arrow bg-base-200 mt-2"
            >
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                {card.front}
              </div>
              <div className="collapse-content">
                <p>{card.back}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null; // Return nothing if not loading and no deck
};

export default SingleDeckPage;
