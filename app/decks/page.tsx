"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type Deck = {
  id: string;
  name: string;
  tag: string;
  cardCount: number;
};

export default function CustomDeckPage() {
  const [decks, setDecks] = useState<Deck[]>([
    { id: "1", name: "JavaScript Basics", tag: "Programming", cardCount: 20 },
    { id: "2", name: "React Hooks", tag: "Web Development", cardCount: 15 },
    { id: "3", name: "CSS Flexbox", tag: "Web Design", cardCount: 10 },
  ]);

  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckTag, setNewDeckTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDeckName.trim() && newDeckTag.trim()) {
      const newDeck: Deck = {
        id: (decks.length + 1).toString(),
        name: newDeckName.trim(),
        tag: newDeckTag.trim(),
        cardCount: 0,
      };
      setDecks([...decks, newDeck]);
      setNewDeckName("");
      setNewDeckTag("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Decks</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="dark:bg-gray-900 shadow-lg rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-2">{deck.name}</h2>
            <p className="text-sm text-gray-400 mb-4">{deck.tag}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {deck.cardCount} cards
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
                Study
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-700 flex items-center justify-center"
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
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateDeck} className="space-y-6">
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
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  placeholder="Enter deck name"
                  required
                  className="w-full px-3 py-2 dark:bg-gray-700 border dark:border-gray-600 rounded-md dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
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
                  value={newDeckTag}
                  onChange={(e) => setNewDeckTag(e.target.value)}
                  placeholder="Enter deck tag"
                  required
                  className="w-full px-3 py-2 dark:bg-gray-700 border dark:border-gray-600 rounded-md dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Create Deck
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
