"use client";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import Image from "next/image";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const handleSignIn = async (provider: "google" | "github") => {
    const redirect =
      typeof window !== "undefined"
        ? localStorage.getItem("postLoginRedirect")
        : null;

    // Clear redirect immediately (CRITICAL)
    if (redirect) {
      localStorage.removeItem("postLoginRedirect");
    }

    await signIn(provider, {
      callbackUrl: redirect || "/", // ✅ NO forced chat redirect
    });
  };

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-white/30 z-50 backdrop-blur"
    >
      <div className="bg-primary/10 py-6 px-10 mx-3.5 rounded-2xl w-full h-1/3 lg:w-1/3 lg:h-1/2 relative flex flex-col items-center">
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 bg-transparent"
        >
          <X className="text-foreground" />
        </Button>

        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          Sign in to
        </h2>

        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-br from-violet-600 to-violet-400 bg-clip-text text-transparent">
          Serene.AI
        </h2>

        <div className="flex flex-col gap-4 w-full">
          <Button
            onClick={() => handleSignIn("google")}
            className="w-full bg-violet-600 text-white p-5 rounded-3xl"
          >
            Sign in with Google
          </Button>

          <Button
            onClick={() => handleSignIn("github")}
            className="w-full bg-gray-800 text-white p-5 rounded-3xl"
          >
            <Image
              src="/github-mark-white.png"
              alt="GitHub"
              height={22}
              width={22}
              className="mr-2"
            />
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
