"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Book, MessageSquare, Sparkles, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import FloatingHearts from "@/components/landing-page/FloatingHearts";

export const HeroSection = () => {
  const router = useRouter();
  return (
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 overflow-hidden bg-background text-foreground ">
      <FloatingHearts />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Badge className="inline-flex items-center px-3 py-1 rounded-full bg-transparent border-[#8E7AF4] text-sm font-medium text-violet-500">
                 ♡ 24/7 Mental Health Support
              </Badge>
            </motion.div>

            <motion.h1
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="text-4xl lg:text-6xl font-bold tracking-tight leading-15 text-foreground"
>
  Your Safe Space when it's{" "}
  <span
    className="bg-clip-text text-transparent"
    style={{ backgroundImage: "linear-gradient(to right, #C7B4F9, #8E7AF4)" }}
  >
    hard to speak
  </span>{" "}
  to anyone else
</motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-lg"
            >
              A 24/7 emotional support with our empathetic
              AI companion. Get personalized coping strategies, mood tracking,
              and a safe space to express yourself.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => router.push("/chat")}
                size="lg"
                className=" pulse-glow shadow-glow bg-gradient-to-r from-violet-400 to via-violet-500 to-violet-400 rounded-xl p-6 text-white px-8 py-6 text-lg group hover:scale-105 cursor-pointer"
              >
                Start a conversation
                <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>

              <Button
              variant="ghost" 
              size="lg"
              onClick={() => router.push("/self-help")}
              className="flex items-center gap-2 px-8 py-6 p-6 text-lg rounded-xl border border-[#8064F2] text-foreground bg-transparent hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.5)] hover:text-[#8064F2] transition-all duration-300"
              >
              <Book className="ml-2 w-6 h-6 transition-transform" />
              Find What Helps
              </Button>

            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center space-x-6 pt-2"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#8064F2]" />
                <span className="text-sm text-gray-600">
                  Get results in minutes
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#8064F2]" />
                <span className="text-sm text-gray-600">Instant assurance</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Chat Preview */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="backdrop-blur-sm rounded-3xl shadow-dreamy border border-primary/20 p-6 max-w-md mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Image
                    src="/serene-logo.png"
                    alt="logo"
                    height={20}
                    width={20}
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Serene.AI</h3>
                  <p className="text-sm text-green-500">● Online</p>
                </div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="bg-[#8064F2] rounded-2xl rounded-br-none p-4 ml-4"
                >
                  <p className="text-white text-sm">
                    I don’t know... I just feel really overwhelmed today.
                    Everything feels too much.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="bg-[#EEEDF2] rounded-2xl rounded-bl-none p-4 mr-10"
                >
                  <p className="text-sm text-black">
                    I'm really sorry you're feeling this way. You're not alone,
                    and I'm here for you. Would you like to talk about what’s
                    been overwhelming you?
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="bg-[#8064F2] rounded-2xl rounded-br-none p-4 ml-4"
                >
                  <p className="text-white text-sm">
                    It’s mostly work and family. No matter what I do, it’s never
                    enough.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100"
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#8064F2] rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-[#8064F2] rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#8064F2] rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  Serene is typing...
                </span>
              </motion.div>
            </div>

            {/* Floating elements around chat */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#8064F2] to-[#C7B4F9] rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        .gradient-text {
          background-image: linear-gradient(to right, #C7B4F9, #8E7AF4);
        }
      `}</style>
    </section>
  );
};
