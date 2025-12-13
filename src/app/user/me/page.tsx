"use client";

import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FeatureNavbar from "@/components/ui/feature-navbar";
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
import FloatingHearts from "@/components/landing-page/FloatingHearts";



// Map moods to numeric values for graph
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
      {/* heading stays inside the card, left-aligned with chart */}
      <h2 className="text-base md:text-lg font-semibold mb-3 text-foreground">
        Emotional analytics
      </h2>

      <div className="p-3 md:p-4 border rounded-2xl bg-card/80 shadow-dreamy">
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

export default function UserDashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <FeatureNavbar />
      <div className="min-h-screen w-full bg-background flex flex-col items-center pt-20 pb-6 px-4 relative overflow-hidden">
        <FloatingHearts />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600 bg-clip-text text-transparent mb-6 text-center"
        >
          Your weekly insights
        </motion.h1>

        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-primary/40 rounded-2xl p-5 md:p-6 shadow-dreamy flex flex-col md:flex-row gap-6 items-stretch"
          >
            {/* Left: user info */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2">
              <Image
                src={user?.avatarUrl ?? "/default-avatar.png"}
                height={80}
                width={80}
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-2 border-white bg-indigo-100 object-cover"
              />
              <div className="text-lg font-semibold text-foreground text-center">
                {user?.name ?? "Anonymous"}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground text-center">
                {user?.email ?? "No email"}
              </div>
              <Button
                onClick={() => router.push("/daily-emotion")}
                size="sm"
                className="mt-3 bg-gradient-to-r from-violet-400 to-violet-500 text-white hover:from-violet-500 hover:to-violet-600"
              >
                Submit daily report
              </Button>
            </div>

            {/* Right: chart card, same color as parent (bg-card), size adjusted */}
            <div className="flex-1 flex flex-col justify-center">
              <EmotionTrendChart />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
