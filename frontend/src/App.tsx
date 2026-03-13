import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateDeck from "./pages/CreateDeck";
import ViewCards from "./pages/ViewCards";
import CreateCard from "./pages/CreateCard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/create-deck"
        element={
          <PrivateRoute>
            <CreateDeck />
          </PrivateRoute>
        }
      />
      <Route
        path="/deck/:deckId/view-cards"
        element={
          <PrivateRoute>
            <ViewCards />
          </PrivateRoute>
        }
      />
      <Route
        path="/deck/:deckId/create-card"
        element={
          <PrivateRoute>
            <CreateCard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
