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
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleCardCreation} className="flex flex-col max-w-3xl">
        <input type="text" name="question" />
        <textarea name="answer" />
        <button
          type="submit"
          className="px-2 py-1 bg-red-400 rounded text-white hover:cursor-pointer"
        >
          Create
        </button>
      </form>
      <Link to={`/deck/${deckId}/view-cards`}>View Cards</Link>
    </div>
  );
};

export default CreateCard;
