import api from "../api/axios";

const CreateDeck = () => {
  const handleDeckCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await api.post("/deck/create", {
      name: formData.get("deck_name"),
    });
    alert("Deck created");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleDeckCreation}>
        <input type="text" name="deck_name" />
        <button type="submit" className="px-2 py-1 bg-red-400 rounded text-white hover:cursor-pointer">Create</button>
      </form>
    </div>
  );
};

export default CreateDeck;
