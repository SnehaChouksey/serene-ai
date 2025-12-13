Serene.AI 🌿
About the App

Serene.AI is a production-ready mental health–focused web application designed to help users improve emotional well-being through AI-powered conversations, daily self-reflection, and curated self-help resources.

✨ Core Features
🧠 Mental Health Chatbot

AI-powered chatbot for emotional support and guided self-reflection

Built using LangChain integrated with the Groq API for fast, low-latency responses

Session-based chat history for continuity and context

📊 Daily Mood Tracker

Users submit daily emotional reports

Generates weekly insights and emotional trends

Helps users identify long-term patterns in mood and mental health

📚 Self-Help Resource Collection

Curated mental health and self-improvement resources

Includes articles and techniques for:

Stress management

Anxiety reduction

Focus and productivity

Emotional balance

🧠 Tech Stack

Frontend

Next.js (App Router)

React

Tailwind CSS

Framer Motion

Backend

Next.js API Routes

Authentication

NextAuth (Google & GitHub OAuth)

Database

Prisma ORM

PostgreSQL

AI

LangChain

Groq API

Deployment

Vercel

🏗️ Architecture Overview

The frontend (Next.js App Router) handles UI rendering, routing, animations, and user interactions.

API routes act as the backend layer, managing business logic, chatbot interactions, mood tracking, and resource delivery.

NextAuth manages authentication, OAuth flows, and secure session handling.

PostgreSQL, accessed via Prisma, stores user data, mood entries, chat history, and metadata.

The AI chatbot uses LangChain to manage prompts and context, with responses generated via the Groq API for low-latency inference.

All components are deployed and orchestrated using Vercel.

🔐 Authentication Flow

User initiates login using Google or GitHub

NextAuth redirects the user to the OAuth provider

The provider authenticates the user and returns an access token

NextAuth creates or updates the user record in the database

A secure session is established

Authenticated users gain access to protected routes and features

🔑 Environment Variables

Create a .env file in the root directory with the following configuration:

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your_nextauth_secret

DATABASE_URL=postgresql://user:password@localhost:5432/serene_ai

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GROQ_API_KEY=your_groq_api_key

🚀 Local Development Setup
1. Clone the Repository

git clone https://github.com/your-username/serene-ai.git

cd serene-ai

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file

Add all required environment variables

4. Run Database Migrations

npx prisma migrate dev

5. Start the Development Server

npm run dev

The application will be available at http://localhost:3000.

🌍 Deployment

Push the repository to GitHub

Create a new project on Vercel

Import the GitHub repository

Add all environment variables in the Vercel dashboard

Deploy the application

Vercel automatically handles builds, previews, and production deployments.

📁 Project Structure

serene-ai/
├── app/ # Next.js App Router pages
├── components/ # Reusable UI components
├── lib/ # Utilities, AI logic, and auth helpers
├── prisma/ # Prisma schema and migrations
├── public/ # Static assets
├── styles/ # Global styles
├── api/ # API routes
├── .env.example # Environment variable template
├── package.json
└── README.md

🖼️ Screenshots
Chatbot

Placeholder for chatbot UI screenshot

Mood Tracker

Placeholder for mood tracker UI screenshot

Self-Help Resources

Placeholder for self-help resources UI screenshot

🔮 Future Enhancements

Personalized AI responses based on long-term emotional patterns

Advanced mood analytics and visualization dashboards

Push notifications and daily check-in reminders

In-app journaling with sentiment analysis

Multi-language support

Voice-based AI interactions

Therapist and counselor integrations

📄 License

This project is licensed under the MIT License.
