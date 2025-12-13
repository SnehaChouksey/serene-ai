import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Heart, TrendingUp, MessageCircle, Calendar, Sparkles } from "lucide-react"


const testimonials = [
  {
    quote: "I finally found a safe space to check in with myself. No judgment, just understanding.",
    mood: "relieved",
    timeframe: "after 2 weeks"
  },
  {
    quote: "The gentle reminders helped me see patterns I never noticed before. It's like having a caring friend.",
    mood: "hopeful", 
    timeframe: "after 1 month"
  },
  {
    quote: "Being able to track my emotions without explaining them to anyone else was exactly what I needed.",
    mood: "grateful",
    timeframe: "after 3 weeks"
  },
  {
    quote: "I love how it feels like I'm talking to a friend who just gets me. It's been a game changer for my mental health.",
    mood: "supported",
    timeframe: "after 2 months"
  }
]


const journeyCards = [
  {
    icon: Heart,
    title: "Week 1: First Steps",
    description: "You shared 4 thoughts and tracked mood 3x",
    progress: "Just getting started",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    icon: MessageCircle,
    title: "Week 2: Opening Up", 
    description: "Had 2 deeper conversations, mood improved",
    progress: "Building trust",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: TrendingUp,
    title: "Week 3: Growth",
    description: "Noticed anxiety patterns, used coping tools",
    progress: "Real progress",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  }
]


export function TestimonialJourneySection() {
  return (
    <section className="py-12 px-4 relative overflow-hidden bg-background text-foreground min-h-screen flex items-center">
      <div className="container mx-auto relative z-10 w-full">
        {/* Section Header - Compact */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-medium">
            <Sparkles className="h-3 w-3 mr-1.5" />
            Real Stories, Real Progress
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
            See How Others Found Their Path
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Stories and sample journeys from our community
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Left: Testimonials - Reduced Height */}
          <div className="lg:col-span-5 space-y-3 h-fit">
            {/* Large Featured Testimonial */}
            <Card className="group relative bg-card/60 border-primary/20 hover:shadow-dreamy transition-all duration-700 hover:scale-[1.02] animate-fade-in">
              <CardContent className="p-3 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <blockquote className="text-sm font-medium leading-relaxed text-foreground">
                      "{testimonials[0].quote}"
                    </blockquote>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-2.5 w-2.5" />
                        <span>{testimonials[0].timeframe}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-2.5 w-2.5 text-pink-500" />
                        <span>{testimonials[0].mood}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />
              </CardContent>
            </Card>

            {/* Smaller testimonials - Compact */}
            <div className="space-y-2">
              {testimonials.slice(1).map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="group bg-card/60 backdrop-blur-sm border-primary/15 hover:shadow-dreamy transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-2">
                      <Quote className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <blockquote className="text-xs leading-snug text-foreground/90">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.timeframe}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Journey Timeline - Reduced Height */}
          <div className="lg:col-span-7 space-y-4 h-fit">
            {/* Header */}
            <div className="text-left mb-3">
              <h3 className="text-xl font-semibold text-foreground mb-1">
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(to right, #9a64f2 , #c564f2)" }}
                >
                  Your Journey Preview
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                See how your path to wellness might unfold
              </p>
            </div>

            {/* Journey Timeline Cards - Compact */}
            <div className="space-y-2 relative">
              {/* Connecting line */}
              <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent" />
              
              {journeyCards.map((card, index) => (
                <Card 
                  key={index} 
                  className="group relative ml-12 bg-gradient-card/60 backdrop-blur-sm border-primary/15 shadow-dreamy hover:shadow-dreamy transition-all duration-500 hover:-translate-y-0.5 animate-fade-in"
                  style={{ animationDelay: `${(index + 3) * 0.2}s` }}
                >
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none z-0" />

                  <CardContent className="p-4 relative z-10">
                    {/* Timeline dot */}
                    <div className={`absolute -left-[2.75rem] top-5 w-2.5 h-2.5 ${card.bgColor} border-1.5 border-primary/30 rounded-full flex items-center justify-center`}>
                      <div className="w-1 h-1 bg-primary rounded-full" />
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className={`flex items-center justify-center w-10 h-10 ${card.bgColor} rounded-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                        <card.icon className={`h-5 w-5 ${card.color}`} />
                      </div>
                      
                      <div className="flex-1 space-y-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground leading-tight">
                          {card.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {card.description}
                        </p>
                        <div className="inline-flex items-center px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {card.progress}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA at bottom - Compact */}
            <div className="pt-3 text-center">
              <Button className="pulse-glow shadow-glow bg-primary rounded-lg px-6 py-2 text-sm text-white hover:bg-primary/80">
                Start Your Journey
              </Button>
              <p className="text-xs text-muted-foreground mt-2 italic">
                *Sample timeline - your journey will be unique
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}