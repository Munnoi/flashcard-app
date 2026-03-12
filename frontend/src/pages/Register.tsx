import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const onRegisterHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await api.post("/auth/register", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    alert("Registration Successful");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl">Register</h1>
      <form
        onSubmit={onRegisterHandler}
        className="flex flex-col gap-2 max-w-3xl mt-3"
      >
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button
          type="submit"
          className="px-2 py-1 bg-red-400 rounded text-white hover:cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
