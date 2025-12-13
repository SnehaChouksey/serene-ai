"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

export function EmotionTrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/emotion/weekly")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error loading emotion data:", err));
  }, []);

  const weeklyAverage = useMemo(() => {
    if (!data.length) return null;
    const total = data.reduce(
      (sum: number, item: any) => sum + item.averageRating,
      0
    );
    return (total / data.length).toFixed(2);
  }, [data]);

  return (
    <div className="w-full">
      <h2 className="text-base md:text-lg font-semibold mb-3 text-foreground">
        Emotional analytics
      </h2>

      <div className="p-3 md:p-4 border rounded-2xl bg-card shadow-dreamy">
        {data.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm">
            No data yet.
          </p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="averageRating"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {weeklyAverage && (
              <p className="text-center mt-2 text-sm font-medium text-purple-300">
                Weekly average rating:{" "}
                <span className="font-bold">{weeklyAverage}</span>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
