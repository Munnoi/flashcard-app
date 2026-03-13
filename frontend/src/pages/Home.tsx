import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

type Deck = {
  id: string;
  title: string;
};

const Home = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await api.get("/deck/get-decks");
        const data = res.data;
        setDecks(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDecks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const startEditing = (deck: Deck) => {
    setEditingDeckId(deck.id);
    setEditTitle(deck.title);
  };

  const handleUpdateDeck = async (deckId: string) => {
    try {
      const res = await api.put(`/deck/update/${deckId}`, {
        title: editTitle,
      });

      setDecks((prev) =>
        prev.map((deck) =>
          deck.id === deckId ? { ...deck, title: editTitle } : deck,
        ),
      );

      setEditingDeckId(null);
      setEditTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Dashboard
            </p>
            <h1 className="text-3xl font-bold text-zinc-900">Your Decks</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Open a deck to view or create flashcards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/create-deck"
              className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Create Deck
            </Link>

            <Link
              to="/login"
              onClick={handleLogout}
              className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              Logout
            </Link>
          </div>
        </div>

        {decks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {decks.map((deck) => (
              <div
                key={deck.id}
                className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              >
                {editingDeckId === deck.id ? (
                  <>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                      Edit Deck
                    </p>

                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />

                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleUpdateDeck(deck.id)}
                        className="flex-1 rounded-2xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingDeckId(null);
                          setEditTitle("");
                        }}
                        className="flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-2 font-medium text-zinc-700 transition hover:bg-zinc-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to={`/deck/${deck.id}/view-cards`} className="block">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                        Deck
                      </p>
                      <h2 className="text-2xl font-bold text-zinc-900 transition hover:text-orange-600">
                        {deck.title}
                      </h2>
                      <p className="mt-3 text-sm text-zinc-500">
                        Open this deck to review and manage cards.
                      </p>
                    </Link>

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => startEditing(deck)}
                        className="flex-1 rounded-2xl border border-orange-200 bg-white px-4 py-2 font-semibold text-orange-600 transition hover:bg-orange-50"
                      >
                        Edit
                      </button>

                      <Link
                        to={`/deck/${deck.id}/view-cards`}
                        className="flex-1 rounded-2xl bg-orange-500 px-4 py-2 text-center font-semibold text-white transition hover:bg-orange-600"
                      >
                        Open
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-orange-200 bg-white/70 p-12 text-center">
            <p className="text-lg font-medium text-zinc-700">No decks found</p>
            <p className="mt-2 text-sm text-zinc-500">
              Create your first deck to start adding flashcards.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
