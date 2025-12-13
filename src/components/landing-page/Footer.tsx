"use client";
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
               <img src="/serene-logo.png" alt="Serene Logo" className="h-6 w-6" />
              </div>
              <span className="font-semibold text-lg">Serene.AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your compassionate AI companion for mental wellness. Safe and available whenever you need support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/chat" className="hover:text-foreground transition-colors">Start Chatting</a></li>
              <li><a href="/user/me" className="hover:text-foreground transition-colors">Mood Tracker</a></li>
              <li><a href="/self-help" className="hover:text-foreground transition-colors">Resources</a></li>
          
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Crisis Resources</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Emergency */}
          <div className="space-y-4">
            <h4 className="font-semibold text-orange-300">Crisis Support</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>If you're in crisis, please reach out:</p>
              <p className="font-medium">988 Suicide & Crisis Lifeline</p>
              <p>Text "HELLO" to 741741</p>
              <p className="text-xs">Emergency services: 911</p>
            </div>
          </div>
        </div>

        {/* Trust & Privacy Section */}
        <div className="border-t border-border/60 mt-8 pt-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-violet-400" />
                <span className="font-medium text-sm">Built with mental wellness experts</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Developed in collaboration with licensed therapists and mental health professionals.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="font-medium text-sm">Your data stays private — always.</span>
              </div>
              <p className="text-xs text-muted-foreground">
                End-to-end encryption ensures your conversations remain completely confidential.
              </p>
            </div>
          </div>

          {/* Anonymous Testimonials */}
          
        </div>

        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 Serene AI. All rights reserved.</p>
          <p className="flex items-center gap-2 mt-4 md:mt-0">
            Built with <Heart className="h-4 w-4 text-red-500" fill="currentColor" /> for you.
          </p>
        </div>
      </div>
    </footer>
  )
}