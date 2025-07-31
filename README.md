# 🎓 AI Course Generator

An AI-powered personalized course generator that creates structured learning paths based on user input. This platform integrates **YouTube API** to supplement courses with curated video content, offering a rich and engaging educational experience.

## ScreenShots
## 🚀 Features

- ✨ **AI-Powered Course Generation** using **Gemini API**
- 📺 **YouTube Video Integration** via YouTube Data API
- 🧑‍💻 Built with **Next.js** & **React**
- 💅 Modern UI with **Tailwind CSS** and **ShadCN UI**
- 🔐 **Authentication** using **Clerk**
- 💳 **Payment Support** via Clerk billing (or Stripe integration ready)
- 📚 Dynamic multi-chapter course structure
- 🧠 Smart difficulty level & category tagging

---

## 🧠 How It Works

1. **User Input**: Learners enter their topic, level, and preferences.
2. **Gemini AI**: Generates a tailored course outline.
3. **YouTube API**: Fetches the most relevant videos for each chapter.
4. **Dynamic UI**: Course layout displayed with clean, interactive UI components.
5. **Authentication**: Users can sign in, save, and revisit generated courses.
6. **Optional Payment**: Monetize course generation or premium features.

---

## 🛠️ Tech Stack

| Tech            | Description                                 |
|-----------------|---------------------------------------------|
| **Next.js**     | Full-stack React framework                  |
| **React**       | UI Library                                  |
| **Tailwind CSS**| Utility-first CSS for styling               |
| **ShadCN UI**   | Prebuilt accessible components              |
| **Gemini API**  | Used to generate course outlines            |
| **YouTube API** | To embed relevant video resources           |
| **Clerk**       | Authentication & optional billing integration |
| **JavaScript**  | Programming Language                        |

---

## 🔐 Authentication

- Sign-up & Sign-in via **Clerk**
- JWT-protected API routes
- User-specific course history

---

## 💳 Payments

> Payments are handled through Clerk or can be extended using **Stripe** for managing subscriptions or pay-per-course models.

---

## 🧪 Setup Instructions

```bash
git clone https://github.com/your-username/ai-course-generator.git
cd ai-course-generator
```
# Install dependencies
```
npm install
```
# Environment variables
cp .env.example .env.local
# Fill in required API keys for:
# - GEMINI_API_KEY
# - YOUTUBE_API_KEY
# - CLERK_API_KEYS

# Run locally
```
npm run dev
```
