"use client";

import { motion } from "motion/react";
import FloatingHearts from "@/components/landing-page/FloatingHearts";
import FeatureNavbar from "@/components/ui/feature-navbar";

const selfHelpMaterials = [
  {
    title: "Mindfulness Meditation",
    description:
      "A guided meditation to help you stay present and reduce stress.",
    link: "https://www.mindful.org/how-to-meditate/",
  },
  {
    title: "Cognitive Behavioral Therapy Basics",
    description:
      "Learn the fundamentals of CBT and how to apply them in daily life.",
    link: "https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt/",
  },
  {
    title: "Building Healthy Habits",
    description:
      "Tips and strategies for creating and maintaining positive habits.",
    link: "https://jamesclear.com/atomic-habits",
  },
  {
    title: "Managing Anxiety",
    description: "Practical exercises and advice for coping with anxiety.",
    link: "https://www.anxietycanada.com/articles/how-to-manage-anxiety/",
  },
  {
    title: "Journaling for Self-Reflection",
    description: "Prompts and techniques to help you reflect and grow.",
    link: "https://positivepsychology.com/benefits-of-journaling/",
  },
];

export default function SelfHelpPage() {
  const firstRow = selfHelpMaterials.slice(0, 3);
  const secondRow = selfHelpMaterials.slice(3);

  return (
    <>
      <FeatureNavbar />

      <div className="relative min-h-screen w-full bg-background pt-24 pb-10">
        <FloatingHearts />

        <div className="flex flex-col items-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-clip-text text-transparent text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{
              backgroundImage: "linear-gradient(to right, #9a64f2 , #7564f2)",
            }}
          >
            Find Your Calm: Self-Help Resources
          </motion.h1>

          {/* Row 1: 3 cards, centered */}
          <div className="w-full max-w-6xl mb-6 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {firstRow.map((item, idx) => (
                <CardLink key={item.title} item={item} delay={idx * 0.08} />
              ))}
            </div>
          </div>

          {/* Row 2: 2 cards, centered */}
          <div className="w-full max-w-4xl flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 pt-4 pb-10 gap-6 w-full">
              {secondRow.map((item, idx) => (
                <CardLink
                  key={item.title}
                  item={item}
                  delay={(idx + 3) * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CardLink({
  item,
  delay,
}: {
  item: (typeof selfHelpMaterials)[number];
  delay: number;
}) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="relative block h-full bg-card/90 border border-primary/35 rounded-2xl p-5 shadow-dreamy hover:shadow-xl hover:bg-card transition-all"
    >
      <div className="text-lg md:text-xl font-semibold text-card-foreground mb-2">
        {item.title}
      </div>
      <div className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {item.description}
      </div>
    </motion.a>
  );
}
