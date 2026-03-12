import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const onLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await api.post("/auth/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    localStorage.setItem("token", res.data.token);
    alert("Login Successful");
    nav("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl">Login</h1>
      <form onSubmit={onLoginHandler} className="flex flex-col gap-2 max-w-3xl mt-3">
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit" className="px-2 py-1 bg-red-400 rounded text-white hover:cursor-pointer">Login</button>
      </form>
    </div>
  );
};

export default Login;
