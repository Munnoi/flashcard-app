import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

const CreateCard = () => {
  const { deckId } = useParams();
  const handleCardCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const question = formData.get("question")?.toString().trim();
      const answer = formData.get("answer")?.toString().trim();
      if (!question || !answer) {
        alert("All fields are required!");
        return;
      }

      await api.post("/card/create", {
        question,
        answer,
        deckId,
      });
      alert("Card created");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100 px-6 py-12">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-8">
        <div className="w-full max-w-xl rounded-3xl border border-orange-100 bg-white/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            New Flashcard
          </p>
          <h1 className="mb-6 text-3xl font-bold text-zinc-900">
            Create a card
          </h1>

          <form onSubmit={handleCardCreation} className="space-y-5">
            <div>
              <label
                htmlFor="question"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Question
              </label>
              <input
                id="question"
                type="text"
                name="question"
                placeholder="Enter the front of the card"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Answer
              </label>
              <textarea
                id="answer"
                name="answer"
                rows={6}
                placeholder="Enter the back of the card"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <Link
                to={`/deck/${deckId}/view-cards`}
                className="text-sm font-medium text-zinc-600 transition hover:text-orange-600"
              >
                View cards
              </Link>

              <button
                type="submit"
                className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200"
              >
                Create Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
