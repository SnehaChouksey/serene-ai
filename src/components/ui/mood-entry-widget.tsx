"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const moods = [
  { emoji: "😔", label: "Sad", value: 1 },
  { emoji: "😐", label: "Neutral", value: 2 },
  { emoji: "🙂", label: "Okay", value: 3 },
  { emoji: "😄", label: "Happy", value: 4 },
  { emoji: "🤩", label: "Great", value: 5 }
]

export function MoodEntryWidget() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 4000)
  }

  return (
    <section className="relative bg-background  wave-bg  py-16 px-4 z-0">
      <div className="container mx-auto max-w-2xl ">
        <Card className="  relative block bg-card border border-primary/40 z-100 rounded-2xl p-6 shadow-dreamy" >
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">How are you feeling right now?</h3>
              <p className="text-muted-foreground">
                Take a moment to check in with yourself
              </p>
            </div>

            <div className="flex justify-center gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`
                    w-16 h-16 rounded-full text-3xl transition-all duration-300 
                    hover:scale-110 hover:shadow-gentle active:scale-95
                    ${selectedMood === mood.value 
                      ? 'bg-violet-100 ring-2 ring-violet-500 shadow-magical scale-110' 
                      : 'bg-violet-50 hover:bg-violet-200'
                    }
                  `}
                  aria-label={mood.label}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>

            {showMessage && (
              <div className="animate-fade-in bg-violet-50 border border-violet-400 rounded-xl p-4 text-primary">
                <p className="font-medium">Nice to meet you.</p>
                <p className="text-sm mt-1">You and Your feelings are secured with Serene.AI</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}