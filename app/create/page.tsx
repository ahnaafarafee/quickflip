"use client";

import { useState } from "react";

const CreateCardPage = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [tag, setTag] = useState("");
  const [card, setCard] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission, e.g., sending the data to an API
    const cardData = { front, back, tag, card };
    console.log(cardData); // Replace with actual API call
    // Reset form fields after submission
    setFront("");
    setBack("");
    setTag("");
    setCard("");
  };

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Create a New Card</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto dark:bg-gray-900 p-6 rounded-lg shadow-lg space-y-6"
      >
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
            value={front}
            onChange={(e) => setFront(e.target.value)}
            className="input-field"
            required
          />
        </div>
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
            value={back}
            onChange={(e) => setBack(e.target.value)}
            className="input-field"
            required
          />
        </div>
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
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label
            htmlFor="card"
            className="block text-sm font-medium light:text-gray-700"
          >
            Card
          </label>
          <select
            id="card"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className="input-field"
            required
          >
            <option value="" disabled>
              Select a card
            </option>
            <option value="Card 1">Card 1</option>
            <option value="Card 2">Card 2</option>
            <option value="Card 3">Card 3</option>
          </select>
        </div>
        <button type="submit" className="btn-default w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCardPage;
