"use client";

import BackButton from "@/app/components/BackButton";
import { cardFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@prisma/client";
import { Spinner } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { Ban, SquarePen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Props {
  params: { id: string };
}

const EditCardPage = ({ params: { id } }: Props) => {
  const [card, setCard] = useState<Card>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId");

  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      front: "",
      back: "",
      tag: "",
    },
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(
          `/api/cards/single/${id}?deckId=${deckId}`
        );
        setCard(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCard();
  }, [id]);

  const onSubmit = async (values: z.infer<typeof cardFormSchema>) => {
    console.log(values);
    try {
      setSubmitting(true);
      await axios
        .patch(`/api/cards/edit/${id}?deckId=${deckId}`, values)
        .then(() => form.reset())
        .finally(() => setSubmitting(false));
      router.push(`/decks/${deckId}`);
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
        <SquarePen /> Update Card
      </div>
      {card ? (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto dark:bg-gray-900 p-6 rounded-lg shadow-lg space-y-6"
        >
          <BackButton />

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
              defaultValue={card.front}
              placeholder={card.front}
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
            <input
              type="text"
              id="back"
              {...form.register("back")}
              placeholder={card.back}
              defaultValue={card.back}
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
              "Update Card"
            )}
          </button>
          {error && (
            <div className="bg-red-500/50 p-2 text-sm flex items-center gap-2 rounded-lg">
              <Ban /> {error}
            </div>
          )}
        </form>
      ) : (
        <span>No card to edit</span>
      )}
    </div>
  );
};

export default EditCardPage;
