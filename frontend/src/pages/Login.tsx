import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100 px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Welcome Back
          </p>
          <h1 className="text-3xl font-bold text-zinc-900">Login</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Access your flashcards and continue studying.
          </p>

          <form onSubmit={onLoginHandler} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200"
            >
              Login
            </button>

            <p className="text-center text-sm text-zinc-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-orange-600 transition hover:text-orange-700"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
