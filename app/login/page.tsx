"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const t = {
    hi: {
      title: "प्रवेश करें",
      email: "ईमेल",
      password: "पासवर्ड",
      login: "लॉगिन",
      placeholderEmail: "अपना ईमेल दर्ज करें",
      placeholderPassword: "अपना पासवर्ड दर्ज करें",
      error: "अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।",
      success: "सफलतापूर्वक लॉगिन हो गया!",
    },
    en: {
      title: "Login",
      email: "Email",
      password: "Password",
      login: "Login",
      placeholderEmail: "Enter your email",
      placeholderPassword: "Enter your password",
      error: "Invalid email or password. Please try again.",
      success: "Logged in successfully!",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("jwt", data.token);
        setLoading(false);
        window.dispatchEvent(new Event("storage"));
        router.push("/");
      } else {
        setError(t[language].error);
        setLoading(false);
      }
    } catch (err) {
      setError(t[language].error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("jwt")) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background content-wrapper">
      <Card className="w-full max-w-md shadow-lg border-orange-200 bg-white/80 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-red-800 mb-2">
            {t[language].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="email">
                {t[language].email}
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder={t[language].placeholderEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/90 border-orange-200 focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="password">
                {t[language].password}
              </label>
              <Input
                id="password"
                type="password"
                required
                placeholder={t[language].placeholderPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/90 border-orange-200 focus:border-red-700"
              />
            </div>
            {error && (
              <div className="text-red-600 text-center text-sm font-medium bg-red-50 border border-red-200 rounded p-2">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded shadow"
              disabled={loading}
            >
              {loading ? (language === "hi" ? "प्रसंस्करण..." : "Processing...") : t[language].login}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 