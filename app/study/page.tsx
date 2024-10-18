"use client";

import BackButton from "@/app/components/BackButton";
import SingleDeckLoadingSkeleton from "@/app/components/SingleDeckLoadingSkeleton";
import { Card, Deck } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { Check, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface DeckWithCardsArr extends Deck {
  cards: Card[];
}

const StudyPage = () => {
  const [decks, setDecks] = useState<DeckWithCardsArr[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDecks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/decks`);
        setDecks(response.data);
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

    fetchDecks();
  }, []);

  if (isLoading) {
    return <SingleDeckLoadingSkeleton />;
  }

  if (error) return notFound();

  console.log(decks[0]?.cards);

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 p-8">
      <div className="max-w-3xl mx-auto dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <BackButton />
        {decks.map((deck) => (
          <div key={deck.id}>
            <h2 className="text-xl font-semibold">{deck.name}</h2>
            <p className="text-gray-400 mt-2">Cards Due Today:</p>
            {deck.cards.length <= 0 ? (
              <div className="flex gap-2 badge-ghost p-2 rounded-lg mt-2 mb-2">
                <Check className="text-success" />
                <span>You&apos;re all set for today! Check back tomorrow.</span>
              </div>
            ) : (
              <div>
                {deck.cards.map((card) => (
                  <div key={card.id}>
                    <div className="text-xl font-medium flex items-center gap-2 mt-2">
                      <Info className="h-4 w-4 text-error" /> {card.front}
                    </div>
                  </div>
                ))}
                <button className="btn btn-outline btn-error mt-2">
                  <Link href={`/decks/learn/${deck.id}`}>Study Now</Link>
                </button> 
              </div>
            )}

            <div className="divider"></div>
          </div>
        ))}

        <Link href="/create" className="flex justify-center link link-primary">
          Create More Deck
        </Link>
      </div>
    </div>
  );
};

export default StudyPage;
