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
  return (
    <div>
      <Link to={`/deck/${deckId}/create-card`}>Create Card</Link>
      {cards?.length > 0 ? (
        cards.map((card) => (
          <div key={card.id}>
            <h2>{card.question}</h2>
            <p>{card.answer}</p>
          </div>
        ))
      ) : (
        <p>No cards found</p>
      )}
    </div>
  );
};

export default ViewCards;
