"use client";

import BackButton from "@/app/components/BackButton";
import SingleDeckLoadingSkeleton from "@/app/components/SingleDeckLoadingSkeleton";
import { Card, Deck } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { Ban, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

const SingleDeckPage = ({ params: { id } }: Props) => {
  const [deck, setDeck] = useState<Deck>();
  const [cards, setCards] = useState<Card[]>([]);
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
          setError(error.response?.data.message || "Error Fetching Deck Info!");
        } else {
          setError("Error Fetching Deck Info!");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeck();

    const fetchCards = async () => {
      try {
        const response = await axios.get(`/api/cards/${id}`);
        setCards(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCards();
  }, [id]);

  if (isLoading) {
    return <SingleDeckLoadingSkeleton />;
  }

  if (error) return notFound();

  console.log(cards);

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 p-8">
      <div className="max-w-3xl mx-auto dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <BackButton />
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-semibold">{deck?.name}</h2>
          <SquarePen className="h-5 w-5 text-info cursor-pointer" />
          <Trash2 className="h-5 w-5 text-error cursor-pointer" />
        </div>
        <p className="light:text-gray-600 mb-2">
          <strong>Tags:</strong> {deck?.tags || "None"}
        </p>
        <p className="light:text-gray-600 mb-2">
          <strong>Created At:</strong>{" "}
          {deck?.createdAt ? new Date(deck.createdAt).toDateString() : "N/A"}
        </p>
        <p className="light:text-gray-600 mb-2">
          <strong>Updated At:</strong>{" "}
          {deck?.updatedAt ? new Date(deck.updatedAt).toDateString() : "N/A"}
        </p>
        <p className="light:text-gray-600 mb-2">
          <strong>Last Studied:</strong>{" "}
          {deck?.updatedAt ? new Date(deck.updatedAt).toDateString() : "N/A"}
        </p>
        <button className="btn-default mt-4 mb-4">Study Now</button>
        <p>Complete Deck:</p>
        {cards.length <= 0 ? (
          <span>
            No cards available.{" "}
            <Link className="btn-link" href="/create">
              Create Now
            </Link>
          </span>
        ) : (
          cards.map((card) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default SingleDeckPage;
