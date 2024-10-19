"use client";

import { cardFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Deck } from "@prisma/client";
import { Spinner } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { Ban, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import BackButton from "../components/BackButton";

const CreateCardPage = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get("/api/decks");
        setDecks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDecks();
  }, []);

  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      front: "",
      back: "",
      tag: "",
      deckId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof cardFormSchema>) => {
    try {
      setSubmitting(true);
      await axios
        .post("/api/cards", values)
        .then(() => form.reset())
        .finally(() => setSubmitting(false));
    } catch (error) {
      setSubmitting(false);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 p-8">
      <div className="text-3xl mb-8 flex items-center justify-center gap-2">
        <SquarePen /> Create a New Card
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto dark:bg-gray-900 p-6 rounded-lg shadow-lg space-y-6"
      >
        <BackButton />

        <div>
          <label
            htmlFor="deckId"
            className="block text-sm font-medium light:text-gray-700"
          >
            Deck
          </label>
          <select
            id="deckId"
            {...form.register("deckId")}
            className="input-field"
            required
          >
            <option value="" disabled>
              Select a Deck
            </option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="front"
            className="block text-sm font-medium light:text-gray-700"
          >
            Front
          </label>
          <input
            type="text"
            id="front"
            {...form.register("front")}
            className="input-field"
          />
        </div>
        <span className="text-red-500">
          {form.formState.errors.front?.message}
        </span>
        <div>
          <label
            htmlFor="back"
            className="block text-sm font-medium light:text-gray-700"
          >
            Back
          </label>
          <textarea
            id="back"
            {...form.register("back")}
            className="input-field"
          />
        </div>
        <span className="text-red-500">
          {form.formState.errors.back?.message}
        </span>
        <div>
          <label
            htmlFor="tag"
            className="block text-sm font-medium light:text-gray-700"
          >
            Tag (Optional)
          </label>
          <input
            type="text"
            id="tag"
            {...form.register("tag")}
            className="input-field"
          />
        </div>
        <span className="text-red-500">
          {form.formState.errors.tag?.message}
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
            "Create Card"
          )}
        </button>
        {error && (
          <div className="bg-red-500/50 p-2 text-sm flex items-center gap-2 rounded-lg">
            <Ban /> {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCardPage;
