"use client";

import FloatingHearts from "@/components/landing-page/FloatingHearts";
import { useState, useEffect } from "react";
import FeatureNavbar from "@/components/ui/feature-navbar";  

export default function EmotionForm() {
  const [rating, setRating] = useState(3);
  const [emotion, setEmotion] = useState("happy");
  const [submittedToday, setSubmittedToday] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSubmittedToday = async () => {
      try {
        const res = await fetch("/api/emotion/weekly");
        const data = await res.json();

        const today = new Date().toISOString().split("T")[0];
        const hasToday = data.some((entry: any) => entry.date === today);

        if (hasToday) {
          setSubmittedToday(true);
          setMessage("You already submitted your emotion today 😊");
        }
      } catch (err) {
        console.error("Failed to fetch emotion data:", err);
      }
    };

    checkSubmittedToday();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/emotion/submit", {
      method: "POST",
      body: JSON.stringify({ rating, emotion }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 409) {
      setMessage("You’ve already submitted today 😊");
      setSubmittedToday(true);
    } else if (res.ok) {
      setMessage("Thanks for sharing! ❤️");
      setSubmittedToday(true);
    } else {
      const error = await res.json();
      setMessage(`Error: ${error.error}`);
    }
  };

  return (
    <>
      <FloatingHearts />
      <FeatureNavbar />

      <div className="w-full min-h-[calc(100vh-56px)] flex items-center justify-center wave-bg px-4">
        <div className="space-y-2 p-4 border rounded-lg max-w-md bg-white shadow-dreamy">
          {submittedToday ? (
            <p className="text-green-600 font-medium">{message}</p>
          ) : (
            <>
              <label className="block">
                <span className="text-gray-700">How are you feeling?</span>
                <select
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  className="mt-1 block w-full border rounded p-2"
                >
                  <option value="happy">😊 Happy</option>
                  <option value="sad">😢 Sad</option>
                  <option value="anxious">😰 Anxious</option>
                  <option value="angry">😡 Angry</option>
                  <option value="neutral">😐 Neutral</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Emotion Rating (1 to 5)</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center font-semibold">{rating}</div>
              </label>

              <button
                onClick={handleSubmit}
                className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600"
              >
                Submit
              </button>
            </>
          )}

          {message && !submittedToday && (
            <p className="text-sm text-gray-600">{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
