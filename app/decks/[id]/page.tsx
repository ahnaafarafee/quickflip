"use client";

import BackButton from "@/app/components/BackButton";
import SingleDeckLoadingSkeleton from "@/app/components/SingleDeckLoadingSkeleton";
import { Card, Deck } from "@prisma/client";
import { Spinner } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { Ban, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound, redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

const SingleDeckPage = ({ params: { id } }: Props) => {
  const [deck, setDeck] = useState<Deck>();
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

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

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 p-8">
      <div className="max-w-3xl mx-auto dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <BackButton />
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-semibold">{deck?.name}</h2>
          <SquarePen className="h-5 w-5 text-info cursor-pointer" />
          <label htmlFor="my_modal_6">
            <Trash2 className="h-5 w-5 text-error cursor-pointer" />
          </label>
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
      <div>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold text-error">
              Do you want to permanently delete this Deck?
            </h3>
            <p className="py-4">This action can not be undone!</p>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close
              </label>
              <button
                disabled={isSubmitting}
                className="btn btn-error"
                onClick={async () => {
                  try {
                    setSubmitting(true);
                    await axios
                      .delete(`/api/decks/${id}`)
                      .finally(() => router.push("/decks"));
                  } catch (error) {
                    console.log(error);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDeckPage;
