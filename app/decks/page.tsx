"use client";

import { deckFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Deck } from "@prisma/client";
import { Spinner } from "@radix-ui/themes";
import axios from "axios";
import delay from "delay";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DecksLoadingSkeleton from "../components/DecksLoadingSkeleton";

interface DeckWithCount extends Deck {
  _count: {
    cards: number;
  };
}

export default function CustomDeckPage() {
  const [decks, setDecks] = useState<DeckWithCount[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDecks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/decks");
        setDecks(response.data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchDecks();
  }, [isModalOpen]); // Add deckCreated as a dependency

  const form = useForm<z.infer<typeof deckFormSchema>>({
    resolver: zodResolver(deckFormSchema),
    defaultValues: {
      name: "",
      tags: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof deckFormSchema>) => {
    try {
      setSubmitting(true);
      await axios
        .post("/api/decks", values)
        .then(() => form.reset())
        .finally(() => setSubmitting(false));
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 p-8">
      {isLoading ? (
        <DecksLoadingSkeleton />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {decks.length <= 0 && <span>You haven't created any decks yet!</span>}

          {decks.map((deck) => (
            <div
              key={deck.id}
              className="dark:bg-gray-900 shadow-lg rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-2">{deck.name}</h2>
              <p className="text-sm text-gray-400 mb-4">{deck.tags}</p>
              <p className="text-sm text-gray-400 mb-4">
                Last Studied: {new Date(deck.updatedAt).toDateString()}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {deck._count.cards} cards
                </span>
                <button className="btn-default">Study</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn-rounded-fixed"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="w-8 h-8" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Create New Deck</h2>
              <button
                className="text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-6 h-6 transition-transform duration-500 hover:rotate-90" />
              </button>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="deckName"
                  className="block text-sm font-medium dark:text-gray-300"
                >
                  Deck Name
                </label>
                <input
                  id="deckName"
                  type="text"
                  {...form.register("name")}
                  placeholder="Enter deck name"
                  className="input-field"
                />
              </div>
              <span className="text-red-500">
                {form.formState.errors.name?.message}
              </span>
              <div className="space-y-2">
                <label
                  htmlFor="deckTag"
                  className="block text-sm font-medium dark:text-gray-300"
                >
                  Deck Tag
                </label>
                <input
                  id="deckTag"
                  type="text"
                  {...form.register("tags")}
                  placeholder="Enter deck tag"
                  className="input-field"
                />
              </div>
              <span className="text-red-500">
                {form.formState.errors.tags?.message}
              </span>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full btn-default"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  "Create Deck"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
