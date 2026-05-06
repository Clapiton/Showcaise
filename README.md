# 🎨 Showcaise

**Turn your app into a masterpiece with a multi-agent AI pipeline.**

Showcaise is an intelligent case study generator that moves beyond templates. It uses a specialized trio of AI agents to analyze your app's visual language, write compelling STAR-format copy, and build a unique, responsive editorial page from scratch.

---

## 🧠 Core Philosophy: "No Fixed Templates"

Unlike traditional builders, Showcaise doesn't just fill in blanks. Our AI agents decide the layout, color theme, and structure based on your app's personality:

- **App feels dark + minimal?** AI generates obsidian backgrounds with emerald accents.
- **App feels bright + playful?** AI builds bold color blocks and rounded grid layouts.
- **App feels corporate + trust?** AI creates clean, data-forward timeline views.

---

## 🏗️ The Multi-Agent Pipeline

We use a sequence of state-of-the-art models, each picked for what it does best:

1.  **Design Agent (GPT-4o Vision)**: Analyzes your screenshots to extract brand colors, typography pairings, and a visual mood.
2.  **Copy Agent (Claude Sonnet)**: Writes a structured case study in STAR format (Situation, Task, Action, Result), tone-matched to your design.
3.  **HTML Agent (Gemini 1.5 Pro)**: Takes the design JSON and copy, and generates a **complete, self-contained HTML file** with custom CSS and animations.

---

## ✨ Features

- **🚀 Multi-Model Fallback**: Smart routing across OpenAI, Anthropic, Google, and DeepSeek ensures your generation never fails.
- **🔐 Secure Access**: Integrated with **Auth.js** for secure user accounts and session management.
- **📱 Responsive Preview**: Live iframe preview of your generated case study.
- **📦 High-Res Exports**: Export your work as a PDF, high-res hero banners, or a ZIP bundle of individual screen mockups.
- **⚡ Built with Next.js 16**: Utilizing the latest App Router patterns and Server Actions.

---

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js 20+
- API Keys for OpenAI, Anthropic, Google (Gemini), and DeepSeek.

### 2. Environment Setup

Create a `.env` file in the root:

```env
# AI API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
DEEPSEEK_API_KEY=

# NextAuth Configuration
AUTH_SECRET= # Generate with 'npx auth secret'
```

### 3. Installation

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating.

---

## 📁 Project Structure

- `/app`: Next.js App Router (Pages, API Routes, Actions)
- `/components`: Reusable UI components
- `/lib`: Core logic (AI Agents, Model Router, Export Engine)
- `/auth.ts`: Auth.js configuration

---

## 📄 License

MIT © 2024 Showcaise. Built with ❤️ by Antigravity.
