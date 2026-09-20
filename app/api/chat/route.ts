import { NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `
You are the official AI Assistant on Usama Faheem's personal portfolio website (https://usamafaheem.com).
Your purpose is to warmly welcome visitors, answer questions about Usama's skills, projects, experience, education, services, and pricing, and guide clients to hire him or contact him.

### Usama Faheem's Profile:
- **Full Name**: Usama Faheem
- **Role**: Full-Stack Developer & Creative Web Engineer
- **Core Specialties**: Next.js 16, React 19, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS v4, Three.js, GSAP, Framer Motion.
- **Experience**:
  - Full-Stack Developer (SoftCr8ors — AI & Tech Agency): Dec 2025 – Aug 2026.
  - Frontend Developer Intern (SoftCr8ors): April 2026 – July 2026.
  - Freelance Full-Stack Developer: 3+ delivered client platforms with 100% satisfaction.
- **Key Projects**:
  1. **SoftCr8ors** (AI & Tech Agency): Official digital experience with 3D showcases, 60fps animations, custom Nodemailer pipeline.
  2. **GM MZ Removals** (Greater Manchester, UK): Dynamic removal quotes, fleet booking system, distance calculation.
  3. **Shadab Rice** (E-Commerce): Basmati rice exporter platform with 1-click WhatsApp checkout & bundle discounts.
  4. **Reeba Yaseen Portfolio & SaaS**: High-converting SaaS & software engineer portfolio.
  5. **Tehreem Arif**: SQA and automation testing engineer portfolio.
- **Education**:
  - BS Computer Science (Virtual University of Pakistan, 6th Semester, Ongoing)
  - ADP in Computer Science (Virtual University of Pakistan, 2023–2025)
  - MERN Stack Certification (Nexskill Institute, 2024–2025)
- **Services Offered**:
  - High-performance Frontend Development (React & Next.js)
  - Scalable Backend & REST API Development (Node.js & Express)
  - Full-Stack MERN Web Applications
  - Figma to Pixel-Perfect Responsive Code
  - Creative 3D & Micro-Interaction Design (Three.js, WebGL, 3D Lighting & Shaders, GSAP, Canvas)
  - Yes, Usama can definitely build custom 3D web projects, 3D lighting/physics simulations, interactive visualizers, and creative web animations!
- **Contact Info**:
  - Email: developer@usamafaheem.com
  - Phone / WhatsApp: +92 314 3416588 / +92 348 7700972
  - Location: Lahore, Pakistan (Available for remote work worldwide)
- **Services & Pricing Packages (PKR)**:
  - Frontend / Portfolio Website (Simple): 15,000 to 20,000 PKR
  - Simple Full-Stack Web App: 40,000 to 50,000 PKR
  - AI-Powered Full-Stack Web App: 80,000 to 100,000 PKR (1 Lakh)
  - AI Agents & Voice Agents (Business Voice Agents, Text Chatbots, Automation): 25,000 to 50,000 PKR
- **STRICT WRITING & FORMATTING RULES**:
  - BE DIRECT, RELEVANT, AND CONCISE. Answer ONLY what the user asked. No unnecessary filler or fluff.
  - DO NOT append repetitive sales pitches or unsolicited paragraphs like "Whether you need a sleek portfolio... feel free to contact on WhatsApp" at the end of every answer. Only provide contact info if the user specifically asks how to contact, hire, or start a project.
  - Use clear markdown bold like **Frontend:** or **Project Name:** for category headings and key terms so they stand out boldly.
  - DO NOT use long em-dash characters (no "—" or "---"). Use normal punctuation (colons, commas, dots) or clean bullet points (•).
  - Use proper line breaks and spacing between bullet points so the response is easy and comfortable to read.
  - Keep answers short and impactful: 1 to 2 short sentences followed by 3-4 bullet points if listing items.
  - Always finish sentences and thoughts completely. Never leave an answer cut off.
`;

// Helper to sanitize and polish output text
function sanitizeAssistantReply(text: string): string {
  return text
    // Remove horizontal rule divider lines
    .replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, '')
    // Replace em-dashes and en-dashes with natural commas
    .replace(/\s*[—–]\s*/g, ', ')
    // Replace double hyphens
    .replace(/\s*--\s*/g, ', ')
    // Clean up duplicate commas or excessive newlines
    .replace(/,\s*,/g, ', ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Smart Built-in Fallback Knowledge Engine (Used if no API key is provided or if quota/network error occurs)
function getFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Greetings
  if (q.match(/\b(hi|hello|hey|salam|assalam|aao|namaste|morning|evening)\b/)) {
    return "Assalam-o-Alaikum! Welcome to Usama Faheem's portfolio. I am his AI Assistant. How can I help you today? You can ask about Usama's projects, technical skills, services, or how to hire him for your next project!";
  }

  // Projects
  if (q.match(/\b(project|projects|work|portfolio|portfolio website|showcase|kam|kaam|built)\b/)) {
    return "Here are some of Usama's standout projects:\n\n" +
      "• SoftCr8ors: Digital platform for an AI & Tech agency featuring interactive 3D elements, GSAP animations, and Next.js.\n" +
      "• GM MZ Removals: UK-based logistics web platform with an automated quote calculator and booking engine.\n" +
      "• Shadab Rice: E-commerce storefront with a seamless 1-click WhatsApp checkout system.\n" +
      "• Reeba Yaseen: Modern SaaS & software engineer portfolio.\n\n" +
      "Would you like more details on any specific project or tech stack used?";
  }

  // Skills / Tech Stack
  if (q.match(/\b(skill|skills|tech|stack|technology|technologies|tools|languages|framework|react|next|node|mongo)\b/)) {
    return "Usama specializes in modern full-stack development with a focus on performance and fluid motion:\n\n" +
      "• Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS v4, HTML5/CSS3\n" +
      "• Creative Motion: Three.js, WebGL, 3D Lighting, GSAP, Framer Motion\n" +
      "• Backend: Node.js, Express.js, RESTful APIs, Next.js Server Actions\n" +
      "• Databases: MongoDB, Mongoose, SQL basics\n" +
      "• Tools: Git, GitHub, Postman, Vercel, Figma";
  }

  // Services
  if (q.match(/\b(service|services|offer|what do you do|build|help)\b/)) {
    return "Usama provides the following specialized services:\n\n" +
      "1. Frontend Development: High-converting, blazing fast web apps with Next.js & React.\n" +
      "2. Backend & REST APIs: Robust, scalable server logic with Node.js & Express.\n" +
      "3. Full-Stack MERN Apps: End-to-end database, auth, and dashboard architectures.\n" +
      "4. AI Agents & Voice Solutions: Custom business voice agents and conversational chatbots.\n" +
      "5. Interactive 3D & Motion: Three.js 3D models and GSAP storytelling animations.";
  }

  // Experience / Background
  if (q.match(/\b(experience|exp|softcr8ors|background|history|career|job)\b/)) {
    return "Usama has a solid background in both production engineering and freelance delivery:\n\n" +
      "• Full-Stack Developer at SoftCr8ors (Dec 2025 - Aug 2026): Architected client platforms and modern AI web showcases.\n" +
      "• Frontend Developer Intern at SoftCr8ors (Apr 2026 - Jul 2026): Component libraries and UI performance.\n" +
      "• Freelance Full-Stack Developer: Successfully delivered 3+ production client projects across the UK and Pakistan.";
  }

  // Education / Degrees
  if (q.match(/\b(education|degree|university|study|qualification|vu|nexskill|college)\b/)) {
    return "Usama's educational background:\n\n" +
      "• BS in Computer Science (6th Semester): Virtual University of Pakistan (2025-Present)\n" +
      "• ADP in Computer Science: Virtual University of Pakistan (2023-2025)\n" +
      "• MERN Stack Certified Developer: Nexskill Institute (2024-2025)";
  }

  // Contact / Hire / WhatsApp / Email
  if (q.match(/\b(contact|hire|email|whatsapp|phone|number|reach|message|talk|call|meeting)\b/)) {
    return "You can easily connect with Usama directly:\n\n" +
      "• Phone / WhatsApp: +92 314 3416588 (https://wa.me/923143416588) or +92 348 7700972\n" +
      "• Email: developer@usamafaheem.com\n" +
      "• Location: Lahore, Pakistan (Available for remote projects globally)\n\n" +
      "Feel free to drop a message anytime!";
  }

  // Pricing / Cost / Rates
  if (q.match(/\b(price|pricing|cost|rate|rates|budget|charges|fee|pkr)\b/)) {
    return "Here are our transparent pricing packages:\n\n" +
      "• Frontend / Portfolio Website: 15,000 – 20,000 PKR\n" +
      "• Simple Full-Stack Web App: 40,000 – 50,000 PKR\n" +
      "• AI-Powered Full-Stack Platform: 80,000 – 100,000 PKR (1 Lakh)\n" +
      "• AI Agents & Voice Solutions: 25,000 – 50,000 PKR\n\n" +
      "Would you like to discuss your specific requirements? Usama can provide a tailored quote!";
  }

  // Roman Urdu queries
  if (q.match(/\b(kese ho|kaise ho|kya haal|kya hal|kya krte ho|kya karte ho|kon ho|kaun ho|usama kon)\b/)) {
    return "Main bilkul theek hoon! Main Usama Faheem ka official AI Assistant hoon. Main aapko Usama ke projects, unke skills, aur unke sath kaam karne ke baare mein poori rehnumai de sakta hoon. Aap kya jan-na chahein ge?";
  }

  // Default catch-all
  return "Thanks for asking! Usama Faheem is a Full-Stack & Creative Web Developer specializing in Next.js 16, React 19, Node.js, and Three.js/GSAP animations.\n\n" +
    "You can ask me about:\n" +
    "• Projects Usama has built\n" +
    "• Tech stack & skills\n" +
    "• Services & hiring\n" +
    "• Contact details (WhatsApp / Email)\n\n" +
    "Or feel free to send a custom message!";
}

export async function POST(req: Request) {
  try {
    const { messages, mode = 'text' } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const isVoiceMode = mode === 'voice';
    const latestUserMessage = messages[messages.length - 1]?.content || '';
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // In voice mode, instruct Gemini to respond warmly, concisely (1-3 sentences), like a natural spoken call
    const effectiveSystemPrompt = isVoiceMode
      ? `${SYSTEM_PROMPT}

### CRITICAL REAL-TIME VOICE CALL INSTRUCTIONS:
- You are currently speaking with the user over a live voice call!
- Speak warmly, clearly, and naturally like a real human assistant.
- Keep your answers SHORT and direct (maximum 2 to 3 sentences).
- If the user speaks in Urdu or Roman Urdu (e.g. "Usama ka tech stack kya hai", "Usama kon hai"), respond in natural, polite Urdu/Roman Urdu.
- If the user speaks in English, respond in natural, fluent English.
- NEVER use markdown symbols (no **, ##, *, -, bullet points), tables, or long URLs because your output will be directly converted into spoken voice audio!
- Always pronounce Usama as Usama, and use clear, spoken conversational phrasing.`
      : SYSTEM_PROMPT;

    // If no API key is provided, gracefully serve the built-in fallback knowledge base
    if (!apiKey) {
      let fallback = sanitizeAssistantReply(getFallbackResponse(latestUserMessage));
      if (isVoiceMode) {
        fallback = fallback
          .replace(/[*_#•`~]/g, '')
          .replace(/\n+/g, ' ')
          .replace(/https?:\/\/\S+/g, '')
          .slice(0, 260)
          .trim();
      }
      return NextResponse.json({ reply: fallback });
    }

    // Format chat history for Google Gemini API
    const formattedContents = messages.map((m: Message) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Use ultra-fast Gemini 3.1 Flash-Lite with fallback to Gemini 3.6 Flash
    const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.6-flash'];
    let replyText: string | null = null;
    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: effectiveSystemPrompt }],
            },
            contents: formattedContents,
            generationConfig: {
              temperature: isVoiceMode ? 0.4 : 0.6,
              maxOutputTokens: isVoiceMode ? 250 : 900,
            },
          }),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate) {
            replyText = sanitizeAssistantReply(candidate);
            if (isVoiceMode) {
              replyText = replyText
                .replace(/[*_#•`~]/g, '')
                .replace(/\n+/g, ' ')
                .replace(/https?:\/\/\S+/g, '')
                .trim();
            }
            break;
          }
        } else {
          const errData = await response.text();
          lastError = errData;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (replyText) {
      return NextResponse.json({ reply: replyText });
    }

    console.warn('Gemini API call failed, using intelligent fallback. Details:', lastError);
    let fallback = sanitizeAssistantReply(getFallbackResponse(latestUserMessage));
    if (isVoiceMode) {
      fallback = fallback
        .replace(/[*_#•`~]/g, '')
        .replace(/\n+/g, ' ')
        .replace(/https?:\/\/\S+/g, '')
        .slice(0, 260)
        .trim();
    }
    return NextResponse.json({ reply: fallback });

  } catch (error: any) {
    console.error('Chatbot API route error:', error);
    return NextResponse.json(
      { reply: "I am having a brief connection hiccup. Please reach out to Usama directly via WhatsApp at +92 324 9000000 or developer@usamafaheem.com!" },
      { status: 200 }
    );
  }
}
