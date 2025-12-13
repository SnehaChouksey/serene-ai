"use client";

import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FeatureNavbar from "@/components/ui/feature-navbar";
import { EmotionTrendChart } from "@/components/EmotionTrendChart";
import { useEffect } from "react";
import FloatingHearts from "@/components/landing-page/FloatingHearts";

export default function UserDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  // 🔐 AUTH GUARD (THIS IS THE KEY FIX)
  useEffect(() => {
    if (status === "unauthenticated") {
      localStorage.setItem("postLoginRedirect", "/user/me");
      router.replace("/?loginRequired=true");
    }
  }, [status, router]);

  if (status === "loading" || !user) {
    return null; // prevents flash + redirect race
  }

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
            {/* Left */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2">
              <Image
                src={user.avatarUrl ?? "/default-avatar.png"}
                height={80}
                width={80}
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-2 border-white bg-indigo-100 object-cover"
              />
              <div className="text-lg font-semibold text-foreground">
                {user.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {user.email}
              </div>
              <Button
                onClick={() => router.push("/daily-emotion")}
                size="sm"
                className="mt-3 bg-gradient-to-r from-violet-400 to-violet-500 text-white"
              >
                Submit daily report
              </Button>
            </div>

            {/* Right */}
            <div className="flex-1 flex items-center justify-center">
              <EmotionTrendChart />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
