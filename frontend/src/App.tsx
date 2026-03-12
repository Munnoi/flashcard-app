import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateDeck from "./pages/CreateDeck";

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
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
