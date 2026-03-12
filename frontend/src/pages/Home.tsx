import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

type Deck = {
  id: string;
  title: string;
};

const Home = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

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
  }, [decks]);

  return (
    <div className="p-4 flex flex-col justify-center gap-20">
      <div className="flex justify-between items-center">
        <Link to="/create-deck">Create deck</Link>
        <Link to="/logout">Logout</Link>
      </div>
      <div className="mx-auto">
        {decks?.length > 0 ? (
          decks.map((deck) => (
            <div key={deck.id}>
              <h2>{deck.title}</h2>
            </div>
          ))
        ) : (
          <p>No decks found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
