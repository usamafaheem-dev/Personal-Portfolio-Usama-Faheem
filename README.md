# Usama Faheem Portfolio

Modern personal portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.  
It showcases projects, services, certifications, and contact channels, with built-in AI chat and voice-assistant experiences.

## Live Site

- https://usamafaheem.com

## Highlights

- App Router architecture with dynamic/lazy-loaded sections for performance
- Animated UI and transitions powered by Framer Motion
- SEO metadata, Open Graph, JSON-LD structured data, robots, and sitemap
- Integrated contact form API with SMTP delivery and client auto-reply
- AI chatbot API with Gemini key rotation and graceful fallback responses
- Voice assistant flow with ElevenLabs TTS + agent health/failover routing
- Additional internal showcase routes (`/loaders`, `/voice-test`)

## Tech Stack

- **Framework:** Next.js 16.2.9
- **UI:** React 19.2.4, Tailwind CSS v4, Framer Motion, Lucide React, React Icons
- **Backend APIs:** Next.js Route Handlers
- **Email:** Nodemailer
- **Language:** TypeScript

## Project Structure

```text
app/
  api/
    chat/route.ts         # Chatbot response engine (Gemini + fallback)
    contact/route.ts      # Contact form email delivery
    tts/route.ts          # ElevenLabs text-to-speech proxy
    voice-agent/route.ts  # Voice agent health and failover selection
  loaders/page.tsx        # Internal loader animation showcase
  voice-test/page.tsx     # Internal voice/chat testing page
  layout.tsx              # Global layout, fonts, metadata, JSON-LD
  page.tsx                # Main portfolio composition
components/               # UI sections and assistant components
public/                   # Static assets (media, CV, images, certificates)
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root:

```env
# Gemini (required for live AI responses)
# Supports one or multiple keys separated by commas
GEMINI_API_KEY=your_gemini_key_or_comma_separated_keys

# SMTP for contact form delivery (required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
CONTACT_RECEIVER_EMAIL=developer@usamafaheem.com

# ElevenLabs text-to-speech (required for /api/tts)
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Optional: override default frontend voice agent IDs
NEXT_PUBLIC_ELEVENLABS_AGENT_IDS=agent_id_1,agent_id_2
```

### 3) Run development server

```bash
npm run dev
```

Open http://localhost:3000.

## Available Scripts

- `npm run dev` — start local development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## API Endpoints

### `POST /api/contact`
Sends inquiry email to portfolio owner and auto-confirmation email to the client.

### `POST /api/chat`
Processes chat/voice-mode messages via Gemini model fallback chain and local knowledge fallback.

### `POST /api/tts`
Converts text to speech through ElevenLabs and returns `audio/mpeg`.

### `GET /api/voice-agent`
Returns the currently healthy voice agent from a server-side pool.

### `POST /api/voice-agent`
Marks an exhausted agent and rotates to the next healthy candidate.

## Deployment

This app can be deployed on any Node-compatible platform (Vercel recommended for Next.js App Router).

Production checklist:
- Set all required environment variables
- Run `npm run build`
- Verify contact, chat, and voice flows in production

## Notes

- `/api/chat` gracefully falls back to built-in responses when Gemini is unavailable or quota-limited.
- `/api/contact` returns a 503 response when SMTP credentials are missing.
- `/api/tts` requires a valid ElevenLabs API key.
