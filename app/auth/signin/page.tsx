"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

/* ---------------- Login Page ---------------- */
export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    router.replace("/");
  }, [router, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error || result?.url?.includes("/api/auth/signin")) {
      setError(result?.error ?? "Unable to sign in. Please try again.");
      setLoading(false);
      return;
    }

    // Success - wait for session to update then redirect
    if (result?.ok) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F2]">
      <main className="flex-1 flex items-center justify-center mt-30 mb-30 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-center mb-2 text-[#003B3A]">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Sign in to Estiak's Portfolio
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C49A3A]"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C49A3A]"
            />

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium transition
                bg-[#003B3A] text-[#F3F4F2]
                hover:bg-[#003B3A]/90
                disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
