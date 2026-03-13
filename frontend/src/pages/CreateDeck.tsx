import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateDeck = () => {
  const nav = useNavigate();
  const handleDeckCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await api.post("/deck/create", {
      name: formData.get("deck_name"),
    });
    alert("Deck created");
    nav("/");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100 px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-lg rounded-3xl border border-orange-100 bg-white/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            New Deck
          </p>
          <h1 className="text-3xl font-bold text-zinc-900">Create a deck</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Start a new collection for your flashcards.
          </p>

          <form onSubmit={handleDeckCreation} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="deck_name"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Deck Name
              </label>
              <input
                id="deck_name"
                type="text"
                name="deck_name"
                placeholder="Enter deck name"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200"
            >
              Create Deck
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDeck;
