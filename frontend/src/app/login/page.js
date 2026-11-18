
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState("register");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const endpoint =
      mode === "register" ? "/api/register" : "/api/login";

    const body =
      mode === "register"
        ? {
            full_name: fullName,
            phone_number: phoneNumber,
            password: password,
          }
        : {
            phone_number: phoneNumber,
            password: password,
          };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong.");
      }

      if (mode === "register") {
        setMessage("Account created! You can now log in.");
        setMode("login");
        setPassword("");
      } else {
        localStorage.setItem("vyora_token", data.access_token);
        localStorage.setItem(
          "vyora_user",
          JSON.stringify(data.user)
        );

        router.push("/");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0d12] px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#15151d] p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-widest text-violet-500">
            VYORA
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Connect. Share. Belong.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#0d0d12] p-1">
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setMessage("");
            }}
            className={`rounded-lg py-3 font-semibold ${
              mode === "register"
                ? "bg-violet-600 text-white"
                : "text-gray-400"
            }`}
          >
            Register
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
            className={`rounded-lg py-3 font-semibold ${
              mode === "login"
                ? "bg-violet-600 text-white"
                : "text-gray-400"
            }`}
          >
            Login
          </button>
        </div>

        <h2 className="mb-2 text-2xl font-bold">
          {mode === "register"
            ? "Create your account"
            : "Welcome back"}
        </h2>

        <p className="mb-6 text-sm text-gray-400">
          {mode === "register"
            ? "Join people around the world."
            : "Log in to continue to VYORA."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {mode === "register" && (
            <input
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl border border-white/10 bg-[#0d0d12] p-4 outline-none focus:border-violet-500"
            />
          )}

          <input
            type="tel"
            required
            pattern="^\+[1-9]\d{7,14}$"
            title="Use international format, for example +254712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number (e.g. +254712345678)"
            className="w-full rounded-xl border border-white/10 bg-[#0d0d12] p-4 outline-none focus:border-violet-500"
          />

          <input
            type="password"
            required
            minLength={8}
            maxLength={128}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (at least 8 characters)"
            className="w-full rounded-xl border border-white/10 bg-[#0d0d12] p-4 outline-none focus:border-violet-500"
          />

          {message && (
            <p
              role="status"
              className="rounded-xl bg-white/5 p-3 text-sm text-violet-300"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 py-4 font-bold hover:bg-violet-700 disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "register"
                ? "Create account"
                : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to use VYORA responsibly.
        </p>
      </div>
    </main>
  );
}
