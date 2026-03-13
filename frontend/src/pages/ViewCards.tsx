import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

type Card = {
  id: string;
  question: string;
  answer: string;
};

const ViewCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const { deckId } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get(`/card/get-cards/${deckId}`);
        const data = res.data;
        setCards(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCards();
  }, []);

  const deleteDeckHandler = async () => {
    try {
      const res = window.confirm("Are you sure you want to delete this deck?");
      if (!res) return;
      await api.delete(`/deck/delete/${deckId}`);
      alert("Deck deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const startEditing = (card: Card) => {
    setEditingCardId(card.id);
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
  };

  const handleUpdate = async (cardId: string) => {
    try {
      const res = await api.put(`/card/update/${cardId}`, {
        question: editQuestion,
        answer: editAnswer,
      });
      setCards((prev) =>
        prev.map((card) => (card.id === cardId ? res.data : card)),
      )
      alert("Card updated");
      setEditingCardId(null);
      setEditQuestion("");
      setEditAnswer("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (cardId: string) => {
    try {
      const res = window.confirm("Are you sure you want to delete this card?");
      if (!res) return;
      await api.delete(`/card/delete/${cardId}`); 
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffedd5_35%,_#fde68a_100%)] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Flashcards
            </p>
            <h1 className="text-3xl font-bold text-zinc-900">View Cards</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              onClick={deleteDeckHandler}
              className="inline-flex items-center rounded-2xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
            >
              Delete Deck
            </Link>

            <Link
              to={`/deck/${deckId}/create-card`}
              className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Create Card
            </Link>

            <Link
              to="/"
              className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              Go Back
            </Link>
          </div>
        </div>

        {cards.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div key={card.id} className="space-y-3">
                {editingCardId === card.id ? (
                  <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                      Edit Card
                    </p>

                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editQuestion}
                        onChange={(e) => setEditQuestion(e.target.value)}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        placeholder="Question"
                      />

                      <textarea
                        value={editAnswer}
                        onChange={(e) => setEditAnswer(e.target.value)}
                        rows={5}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        placeholder="Answer"
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleUpdate(card.id)}
                        className="rounded-2xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingCardId(null)}
                        className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 font-medium text-zinc-700 transition hover:bg-zinc-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="perspective">
                      <div className="group relative h-56 w-full">
                        <div className="relative h-full w-full preserve-3d transition duration-700 group-hover:rotate-y-180">
                          <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-white/60 bg-white/80 p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur backface-hidden">
                            <div>
                              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                                Question
                              </p>
                              <h2 className="text-xl font-bold text-zinc-900">
                                {card.question}
                              </h2>
                            </div>
                          </div>

                          <div className="absolute inset-0 flex rotate-y-180 items-center justify-center rounded-3xl border border-orange-200 bg-orange-500 p-6 text-center text-white shadow-[0_20px_50px_rgba(249,115,22,0.28)] backface-hidden">
                            <div>
                              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100">
                                Answer
                              </p>
                              <p className="text-lg leading-relaxed">
                                {card.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => startEditing(card)}
                        className="flex-1 rounded-2xl border border-orange-200 bg-white px-4 py-2 font-semibold text-orange-600 transition hover:bg-orange-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(card.id)}
                        className="flex-1 rounded-2xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-orange-200 bg-white/70 p-12 text-center shadow-sm">
            <p className="text-lg font-medium text-zinc-700">No cards found</p>
            <p className="mt-2 text-sm text-zinc-500">
              Create your first flashcard for this deck.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCards;
