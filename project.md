Now that's a proper system. Here's the upgraded spec:

---

## 🧠 Core Philosophy Shift

```
No fixed template.
AI reads the app → decides the layout, 
color theme, structure, and style → 
generates unique HTML every time.
```

---

## 🏗️ Upgraded System Design

```
User inputs → AI Router picks best model 
→ Design AI analyzes app + chooses theme/layout 
→ Copy AI writes all content 
→ HTML AI generates complete unique page 
→ Puppeteer → PDF
```

---

## 🤖 Multi-Model Architecture

Each model is used for what it's best at:

```
┌─────────────────────────────────────────────────┐
│                  AI ROUTER                       │
│  Picks which models to use based on task type   │
└────────┬──────────────┬───────────────┬─────────┘
         │              │               │
    DESIGN AGENT   COPY AGENT     HTML AGENT
    (GPT-4o)       (Claude)       (Gemini 1.5)
         │              │               │
   Analyzes app    Writes STAR     Generates full
   screenshots,    case study,     unique HTML/CSS
   picks colors,   headings,       from scratch —
   layout style,   bullets,        no template,
   mood, fonts,    stats, CTAs     just the brief
   section order
```

### **Why each model:**
| Model | Role | Why |
|---|---|---|
| **GPT-4o Vision** | Design Agent | Best at analyzing images, extracting colors/mood |
| **Claude Sonnet** | Copy Agent | Best long-form structured writing, STAR format |
| **Gemini 1.5 Pro** | HTML Agent | Massive context window — holds entire design brief + generates full unique HTML |
| **Fallbacks** | Any role | If one API is down, router swaps to next best |

---

## 🎨 What "No Fixed Template" Means

The Design Agent looks at your screenshots and decides:

```
App feels dark + minimal →  obsidian bg, emerald accents, 
                            large typography, sparse layout

App feels bright + playful → white bg, bold color blocks,
                             rounded cards, grid-heavy

App feels corporate + clean → navy/white, serif headings,
                              timeline-heavy, data-forward

App feels luxury/premium →  black + gold, full-bleed images,
                            editorial magazine layout
```

It also decides **section order** — not every case study needs the same structure:

```
Option A: Hero → Stats → Problem/Solution → Features → Process → Result
Option B: Hero → Problem → Features → Process → Stats → Result  
Option C: Hero → Story (narrative) → Features → Metrics
```

---

## 📋 Full Spec for Claude Code

```
Build a Next.js 14 web app called "Showcaise" — 
an intelligent app portfolio case study generator.

═══════════════════════════════════════
FORM INPUTS
═══════════════════════════════════════
- App name (text)
- Tagline (text)
- Description (textarea — user can be brief, AI expands)
- Category (dropdown: Marketplace, Health, Finance, 
  Social, Productivity, IoT, Education, Other)
- Platform (Mobile / Web / Both)
- Tech stack (multi-select tag input)
- Up to 8 screenshot uploads (PNG/JPG)
- Author name (optional)
- Contact / portfolio link (optional)
- Preferred AI model (dropdown: Auto / Claude / 
  GPT-4o / Gemini — default Auto)

═══════════════════════════════════════
AI PIPELINE — 3 AGENTS IN SEQUENCE
═══════════════════════════════════════

AGENT 1 — DESIGN AGENT (GPT-4o Vision)
  Input:  All uploaded screenshots + app name + category
  Task:   Analyze the visual language of the app and return JSON:
  Output: {
    "primary_color": "#hex",
    "secondary_color": "#hex", 
    "accent_color": "#hex",
    "bg_color": "#hex",
    "text_color": "#hex",
    "mood": "dark-luxury | minimal-clean | bold-playful | 
             corporate-trust | vibrant-energetic",
    "font_pairing": {
      "display": "Syne | Playfair Display | Cabinet Grotesk | 
                  Bebas Neue | Fraunces",
      "body": "DM Sans | Lato | Source Serif | Nunito"
    },
    "layout_style": "editorial | dashboard-heavy | 
                     story-narrative | feature-forward | 
                     minimal-impact",
    "section_order": ["hero", "problem", "features", 
                      "process", "stats", "result"],
    "hero_style": "fullbleed-mockup | split-layout | 
                   centered-minimal | asymmetric",
    "mockup_count": 3 | 4 | 5,
    "color_reasoning": "why these choices were made"
  }

AGENT 2 — COPY AGENT (Claude Sonnet)
  Input:  App details + Design Agent output (mood, style)
  Task:   Write all case study content, tone-matched to mood
  Output: {
    "hero_headline": "...",
    "hero_sub": "...",
    "problem": {
      "heading": "...",
      "narrative": "...",  
      "bullets": ["...", "...", "..."]
    },
    "solution": {
      "heading": "...",
      "bullets": ["...", "...", "..."]
    },
    "result": {
      "heading": "...",
      "bullets": ["...", "...", "..."]
    },
    "stats": [{"number":"...","label":"..."}], // 4 items
    "features": [{"icon":"...","title":"...","desc":"..."}], // 6
    "process": {
      "phase1": {"title":"...","items":["..."]},
      "phase2": {"title":"...","items":["..."]},
      "phase3": {"title":"...","items":["..."]}
    },
    "impact": [{"number":"...","label":"..."}], // 3 items
    "tech_badges": [{"name":"...","color":"..."}]
  }

AGENT 3 — HTML AGENT (Gemini 1.5 Pro)
  Input:  Design JSON + Copy JSON + base64 screenshots
  Task:   Generate a COMPLETE, UNIQUE, self-contained HTML file.
          Rules:
          - NO pre-written template — generate fresh HTML/CSS/JS
          - Use the exact colors, fonts, layout from Design Agent
          - Use the exact copy from Copy Agent
          - Embed screenshots as base64 in iPhone/device mockups
          - Section order must match design JSON section_order
          - Must be fully responsive (mobile/tablet/desktop)
          - Include subtle animations (CSS only)
          - Must be printable as PDF (print media query)
          - Single file, no external dependencies except 
            Google Fonts

═══════════════════════════════════════
API ROUTES
═══════════════════════════════════════
POST /api/analyze     → Agent 1 (design analysis)
POST /api/generate    → Agent 2 (copy generation)  
POST /api/build-html  → Agent 3 (HTML generation)
POST /api/export-pdf  → Puppeteer → PDF download
GET  /api/models      → returns available models + status

═══════════════════════════════════════
MODEL FALLBACK SYSTEM
═══════════════════════════════════════
lib/model-router.ts:
  - Checks API key availability on startup
  - For each agent role, defines primary + 2 fallbacks
  - If primary fails (timeout/error), auto-retries with fallback
  - Logs which model was used per generation

Design Agent:   GPT-4o Vision → Claude → Gemini Vision
Copy Agent:     Claude Sonnet → GPT-4o → Gemini Pro  
HTML Agent:     Gemini 1.5 Pro → Claude → GPT-4o

═══════════════════════════════════════
UI SCREENS
═══════════════════════════════════════
/ (Home)
  - Clean input form
  - Drag & drop screenshot upload with previews
  - "Generate" button
  - Shows which AI models will be used

/generating
  - Live progress: 
    "Analyzing your app design..." (Agent 1)
    "Writing your case study..." (Agent 2)  
    "Building your portfolio page..." (Agent 3)
  - Shows which model is active
  - Streaming output if possible

/preview/[id]
  - Full iframe preview of generated HTML
  - Sidebar: regenerate section, swap model, edit copy
  - "Download PDF" button
  - "Download HTML" button
  - "Regenerate" button (reruns full pipeline)

═══════════════════════════════════════
ENV VARIABLES NEEDED
═══════════════════════════════════════
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
DATABASE_URL= (optional — for saving generations)

═══════════════════════════════════════
TECH STACK
═══════════════════════════════════════
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- @anthropic-ai/sdk
- openai
- @google/generative-ai
- puppeteer
- sharp (image resizing before base64)
- react-dropzone (upload UI)
- zustand (state between steps)
- prisma + sqlite (save past generations, optional)
```

---

## ⚡ How You Use It Day-to-Day

```
1. Open localhost:3000 (or deployed URL)
2. Type app name + paste description
3. Drag in screenshots
4. Hit Generate
5. Watch 3 AIs work in sequence (~30 seconds)
6. Preview → tweak if needed → Download PDF
```


Good addition. Here's the updated multi-model roster and the upgraded fallback system:

---

## 🤖 Updated Full Model Roster

```
┌─────────────────────────────────────────────────────────┐
│                    MODEL REGISTRY                        │
├──────────────────┬──────────────────┬───────────────────┤
│  DESIGN AGENT    │   COPY AGENT     │   HTML AGENT      │
├──────────────────┼──────────────────┼───────────────────┤
│ 1. GPT-4o Vision │ 1. Claude Sonnet │ 1. Gemini 1.5 Pro │
│ 2. Gemini Vision │ 2. GPT-4o        │ 2. Claude Sonnet  │
│ 3. Claude Sonnet │ 3. Gemini Pro    │ 3. GPT-4o         │
│ 4. DeepSeek V3   │ 4. DeepSeek V3   │ 4. DeepSeek V3    │
└──────────────────┴──────────────────┴───────────────────┘
```

Every model can do every job. Priority order just reflects who's best at each role.

---

## 🔄 Upgraded Fallback System

The key upgrade: it's not just "try next if error" — it's a **full capability matrix** where every model knows every role:

```typescript
// lib/model-router.ts

export const MODEL_REGISTRY = {
  "gpt-4o": {
    provider: "openai",
    capabilities: ["design", "copy", "html"],
    supportsVision: true,
    contextWindow: 128_000,
    priority: { design: 1, copy: 2, html: 3 }
  },
  "claude-sonnet-4-20250514": {
    provider: "anthropic", 
    capabilities: ["design", "copy", "html"],
    supportsVision: true,
    contextWindow: 200_000,
    priority: { design: 3, copy: 1, html: 2 }
  },
  "gemini-1.5-pro": {
    provider: "google",
    capabilities: ["design", "copy", "html"],
    supportsVision: true,
    contextWindow: 1_000_000,
    priority: { design: 2, copy: 3, html: 1 }
  },
  "deepseek-chat": {  // DeepSeek V3 / R1
    provider: "deepseek",
    capabilities: ["copy", "html"],  // no vision yet
    supportsVision: false,
    contextWindow: 64_000,
    priority: { design: 4, copy: 4, html: 4 }
  }
}

// On startup — ping all APIs, mark which are live
export async function buildAvailabilityMap(): Promise<AvailabilityMap> {
  const checks = await Promise.allSettled([
    pingOpenAI(),
    pingAnthropic(),
    pingGoogle(),
    pingDeepSeek(),
  ])
  return {
    openai:    checks[0].status === "fulfilled",
    anthropic: checks[1].status === "fulfilled",
    google:    checks[2].status === "fulfilled",
    deepseek:  checks[3].status === "fulfilled",
  }
}

// Pick best available model for a given role
export function pickModel(
  role: "design" | "copy" | "html",
  availability: AvailabilityMap,
  userPreference?: string
): ModelConfig {
  
  // If user picked a specific model, try it first
  if (userPreference && availability[getProvider(userPreference)]) {
    return MODEL_REGISTRY[userPreference]
  }

  // Sort all models by their priority for this role
  // Filter to only available ones
  // For design role, also require vision support if screenshots provided
  return Object.entries(MODEL_REGISTRY)
    .filter(([_, config]) => {
      const providerUp = availability[config.provider]
      const canDoRole = config.capabilities.includes(role)
      const hasVision = role === "design" ? config.supportsVision : true
      return providerUp && canDoRole && hasVision
    })
    .sort(([_, a], [__, b]) => a.priority[role] - b.priority[role])
    [0][1]  // first = highest priority available
}
```

---

## ⚡ Runtime Fallback — During Generation

Not just startup checks — fallback happens **mid-generation** too:

```typescript
// lib/agent-runner.ts

export async function runWithFallback<T>(
  role: "design" | "copy" | "html",
  task: (model: ModelConfig) => Promise<T>,
  availability: AvailabilityMap,
  onModelSwitch?: (from: string, to: string, reason: string) => void
): Promise<T> {

  // Get all capable models sorted by priority
  const candidates = getModelsByPriority(role, availability)

  for (const model of candidates) {
    try {
      console.log(`[${role}] Trying ${model.id}...`)
      const result = await Promise.race([
        task(model),
        timeout(30_000)  // 30s timeout per model
      ])
      return result

    } catch (err) {
      const reason = classifyError(err)
      // → "rate_limit" | "timeout" | "api_down" | "bad_output"

      console.warn(`[${role}] ${model.id} failed: ${reason}`)
      
      // Tell the UI which model we're switching to
      const next = candidates[candidates.indexOf(model) + 1]
      if (next && onModelSwitch) {
        onModelSwitch(model.id, next.id, reason)
      }

      // If it was a bad output (not API error), log for review
      if (reason === "bad_output") {
        logBadOutput(model.id, role, err)
      }

      continue  // try next model
    }
  }

  throw new Error(`All models failed for role: ${role}`)
}
```

---

## 📡 Live Status in the UI

The `/generating` screen shows real-time model switching:

```
┌─────────────────────────────────────────────┐
│  Analyzing your app design...               │
│                                             │
│  ✅ GPT-4o Vision  →  Design complete       │
│  ⟳  Claude Sonnet  →  Writing copy...       │
│  ○  Gemini 1.5 Pro →  Waiting               │
│                                             │
│  ⚠️  Claude rate limited — switching to     │
│     GPT-4o for copy generation             │
└─────────────────────────────────────────────┘
```

---

## 📋 Updated Prompt for Claude Code

Add this to the spec from before:

```
═══════════════════════════════════════
ADD: DEEPSEEK INTEGRATION
═══════════════════════════════════════
Add DeepSeek V3 as a 4th model option.
DeepSeek uses an OpenAI-compatible API:

  Base URL: https://api.deepseek.com
  Model:    deepseek-chat  (DeepSeek V3)
            deepseek-reasoner (DeepSeek R1 — for copy)
  SDK:      Use the openai package with custom baseURL

  const deepseek = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.DEEPSEEK_API_KEY,
  })

DeepSeek roles: copy (primary), html (fallback)
Note: No vision support — skip for design agent 
if screenshots are provided. Use for design only 
if no screenshots uploaded (text-only mode).

═══════════════════════════════════════
ADD: FULL FALLBACK SYSTEM
═══════════════════════════════════════
Build lib/model-router.ts with:

1. STARTUP HEALTH CHECK
   - On app start, ping all 4 providers
   - Cache availability for 5 minutes
   - Re-check if any model fails mid-run

2. CAPABILITY MATRIX
   Every model is registered with:
   - Which roles it can perform
   - Whether it supports vision
   - Its priority per role (1 = best)
   - Its provider name (for API key lookup)

3. RUNTIME FALLBACK
   - Each agent wraps its call in runWithFallback()
   - 30 second timeout per model attempt
   - On failure: classify error type, pick next 
     best available model, retry automatically
   - Emit Server-Sent Events (SSE) to frontend 
     so UI updates in real time when switching

4. ERROR CLASSIFICATION
   - "rate_limit" → switch model immediately
   - "timeout"    → switch model immediately  
   - "api_down"   → mark provider unavailable 
                    for 10 min, switch model
   - "bad_output" → retry same model once, 
                    then switch

5. UI STATUS FEED
   GET /api/status/stream → SSE endpoint
   Emits events:
   { type: "model_start",  role, modelId }
   { type: "model_switch", role, from, to, reason }
   { type: "model_done",   role, modelId, duration }
   { type: "pipeline_done", totalDuration }

═══════════════════════════════════════
UPDATED ENV VARIABLES
═══════════════════════════════════════
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
DEEPSEEK_API_KEY=
```

---

## 🗂️ Updated Folder Structure

```
portfolio-gen/
├── app/
│   ├── page.tsx
│   ├── generating/page.tsx
│   ├── preview/[id]/page.tsx
│   └── api/
│       ├── analyze/route.ts       ← Agent 1
│       ├── generate/route.ts      ← Agent 2
│       ├── build-html/route.ts    ← Agent 3
│       ├── export-pdf/route.ts    ← Puppeteer
│       ├── health/route.ts        ← Model ping
│       └── status/stream/route.ts ← SSE feed
├── lib/
│   ├── model-router.ts    ← Capability matrix + picker
│   ├── agent-runner.ts    ← runWithFallback()
│   ├── agents/
│   │   ├── design.ts      ← Agent 1 logic
│   │   ├── copy.ts        ← Agent 2 logic
│   │   └── html.ts        ← Agent 3 logic
│   ├── providers/
│   │   ├── anthropic.ts
│   │   ├── openai.ts
│   │   ├── google.ts
│   │   └── deepseek.ts    ← openai SDK + custom baseURL
│   └── pdf.ts             ← Puppeteer wrapper
├── components/
│   ├── UploadForm.tsx
│   ├── ModelStatusFeed.tsx  ← live SSE display
│   ├── PreviewFrame.tsx
│   └── ExportButton.tsx
└── .env.example
```

---

This is now a **production-grade spec**. Hand the full thing to Claude Code and it can build it end to end. Want me to also write the actual `model-router.ts` and `agent-runner.ts` files in full so Claude Code has less to figure out?

Good addition. Here's exactly how to add that to the system:

---

## 🖼️ Mockup Image Export — How It Works

```
Rendered HTML mockup section
        ↓
Puppeteer screenshots specific DOM elements
        ↓
Returns individual PNG files
        ↓
User downloads as single images or ZIP
```

---

## What Gets Exported

```
┌─────────────────────────────────────────────┐
│  Export Options                             │
│                                             │
│  📱 Individual Screens                      │
│     ○ Each phone mockup → separate PNG      │
│     ○ Full resolution (2x for retina)       │
│                                             │
│  🖼️  Hero Banner                            │
│     ○ Full mockup fan/stage → single PNG    │
│     ○ Perfect for Behance cover image       │
│                                             │
│  📦  All as ZIP                             │
│     ○ All mockups + hero banner bundled     │
│     ○ Ready to upload to Upwork/Behance     │
│                                             │
│  📄  Full PDF                               │
│     ○ Complete case study document          │
└─────────────────────────────────────────────┘
```

---

## 📋 Add This to the Claude Code Spec

```
═══════════════════════════════════════
ADD: MOCKUP IMAGE EXPORT
═══════════════════════════════════════

NEW API ROUTES:
  POST /api/export/hero-image
       → Screenshots the full mockup stage section
       → Returns single high-res PNG (1600x900)
       → Used as Behance/Upwork cover image

  POST /api/export/mockup-screens
       → Screenshots each individual phone mockup
       → Returns array of PNGs
       → Each at 400x800px @2x (800x1600 actual)

  POST /api/export/zip
       → Runs both exports above
       → Bundles into ZIP using jszip
       → Files inside:
            /hero-banner.png
            /screens/screen-1-home.png
            /screens/screen-2-bookings.png
            /screens/screen-3-ai-chat.png
            ... etc
            /case-study.pdf
       → Single download

═══════════════════════════════════════
IMPLEMENTATION — lib/export-images.ts
═══════════════════════════════════════

import puppeteer from "puppeteer"
import JSZip from "jszip"

// Screenshot the full hero mockup stage
export async function exportHeroBanner(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // Wide viewport for the hero
  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 })
  await page.setContent(html, { waitUntil: "networkidle0" })
  
  // Only screenshot the mockup stage section
  const element = await page.$(".mockup-stage")
  const screenshot = await element.screenshot({
    type: "png",
    omitBackground: false  // keep dark bg
  })
  
  await browser.close()
  return screenshot
}

// Screenshot each phone individually
export async function exportMockupScreens(
  html: string,
  screenNames: string[]  // ["Home", "Bookings", "AI Chat", ...]
): Promise<{ name: string; buffer: Buffer }[]> {
  
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 })
  await page.setContent(html, { waitUntil: "networkidle0" })
  
  // Select all phone elements
  const phones = await page.$$(".phone")
  const results = []
  
  for (let i = 0; i < phones.length; i++) {
    const screenshot = await phones[i].screenshot({
      type: "png",
      omitBackground: false
    })
    results.push({
      name: screenNames[i] || `screen-${i + 1}`,
      buffer: screenshot
    })
  }
  
  await browser.close()
  return results
}

// Bundle everything into a ZIP
export async function exportZip(
  html: string,
  pdfBuffer: Buffer,
  screenNames: string[]
): Promise<Buffer> {
  
  const zip = new JSZip()
  
  // Add hero banner
  const hero = await exportHeroBanner(html)
  zip.file("hero-banner.png", hero)
  
  // Add individual screens
  const screens = await exportMockupScreens(html, screenNames)
  const screensFolder = zip.folder("screens")
  for (const screen of screens) {
    const safeName = screen.name.toLowerCase().replace(/\s+/g, "-")
    screensFolder.file(`${safeName}.png`, screen.buffer)
  }
  
  // Add full PDF
  zip.file("case-study.pdf", pdfBuffer)
  
  return zip.generateAsync({ type: "nodebuffer" })
}

═══════════════════════════════════════
ADD TO UI — preview/[id]/page.tsx
═══════════════════════════════════════

Export panel on the preview screen:

  ┌──────────────────────────────────┐
  │  Export                          │
  │                                  │
  │  [📄 Download PDF          ]     │
  │  [🖼️  Download Hero Banner  ]     │
  │  [📱 Download All Screens   ]     │
  │  [📦 Download Everything ZIP]    │
  └──────────────────────────────────┘

Each button calls its respective API route.
Show loading spinner while Puppeteer runs.
Hero banner and screens export in ~5 seconds.
ZIP export in ~10 seconds.

═══════════════════════════════════════
ADD TO PACKAGE.JSON DEPENDENCIES
═══════════════════════════════════════
  "jszip": "^3.10.1"

(puppeteer already included from PDF export)

═══════════════════════════════════════
SCREEN NAMING
═══════════════════════════════════════
The HTML Agent should add data attributes 
to each phone mockup when generating HTML:

  <div class="phone phone-c" 
       data-screen-name="Home"
       data-screen-index="0">

These are read by Puppeteer to auto-name 
the exported PNG files.
```

---

## 📁 What a ZIP Download Looks Like

```
serviceconnect-portfolio.zip
├── case-study.pdf
├── hero-banner.png          ← all 5 phones fanned, dark bg
└── screens/
    ├── home.png             ← clean phone mockup, no bg
    ├── bookings.png
    ├── ai-chat.png
    ├── provider-profile.png
    └── map.png
```

---

## Updated Full Dependency List

```bash
npm install \
  @anthropic-ai/sdk \
  openai \
  @google/generative-ai \
  puppeteer \
  jszip \
  sharp \
  react-dropzone \
  zustand
```

---

You now have a complete, handoff-ready spec. The full system does:

- ✅ Form input → 3 AI agents in sequence
- ✅ 4 models (Claude, GPT-4o, Gemini, DeepSeek)
- ✅ Smart fallback if any model is down
- ✅ Unique HTML generated every time — no fixed template
- ✅ Colors/fonts/layout extracted from your app screenshots
- ✅ Export as PDF, hero banner PNG, individual screen PNGs, or ZIP