"use client";

import BackButton from "@/app/components/BackButton";
import SingleDeckLoadingSkeleton from "@/app/components/SingleDeckLoadingSkeleton";
import { deckFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Deck } from "@prisma/client";
import { Spinner } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { Ban, SquarePen, Trash2, X } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Props {
  params: { id: string };
}

const SingleDeckPage = ({ params: { id } }: Props) => {
  const [deck, setDeck] = useState<Deck>();
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState("");
  const [formError, serFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

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
        .patch(`/api/decks/${id}`, values)
        .then(() => setSubmitting(false));
      location.reload();
    } catch (error) {
      setSubmitting(false);
      if (error instanceof AxiosError) {
        serFormError(error.response?.data.message);
      } else {
        serFormError("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    const fetchDeck = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/decks/${id}`);
        setDeck(response.data);
        form.reset({
          name: response.data.name,
          tags: response.data.tags,
        });
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
  }, [id, form]);

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
          <label htmlFor="modal_edit">
            <SquarePen className="h-5 w-5 text-info cursor-pointer" />
          </label>
          <label htmlFor="modal_delete">
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
        <input type="checkbox" id="modal_delete" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold text-error">
              Do you want to permanently delete this Deck?
            </h3>
            <p className="py-4">This action can not be undone!</p>
            <div className="modal-action">
              <label htmlFor="modal_delete" className="btn">
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
      <div>
        <input type="checkbox" id="modal_edit" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <div className="text-2xl mb-8 flex items-center justify-center gap-2">
              <SquarePen /> Update Deck
            </div>
            {deck && (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-2 !pb-0"
              >
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
                    defaultValue={deck.name}
                    placeholder={deck.name}
                    {...form.register("name")}
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
                    "Update Deck"
                  )}
                </button>
                {formError && (
                  <div className="bg-red-500/50 p-2 text-sm flex items-center gap-2 rounded-lg">
                    <Ban /> {formError}
                  </div>
                )}
              </form>
            )}
            <div className="modal-action">
              <label
                className="absolute right-2 top-2 cursor-pointer p-2"
                htmlFor="modal_edit"
              >
                <X className="w-6 h-6 transition-transform duration-500 hover:rotate-90" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDeckPage;
