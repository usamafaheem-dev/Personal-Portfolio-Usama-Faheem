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
- **Key Projects & Verified Live URLs**:
  When users ask about projects or request links/demos, ALWAYS share these exact live URLs:
  1. **Shadab Rice** (E-Commerce Storefront): https://shadabrice.pk/
     - Description: Premium Basmati rice exporter e-commerce store with dynamic 1-click WhatsApp order checkout & bundle deals.
  2. **SoftCr8ors** (AI & Tech Agency): https://softcr8ors.com/
     - Description: Official digital agency platform with 3D models, GSAP 60fps animations, and team showcases.
  3. **GM MZ Removals** (UK Logistics & Removals): https://gmmzremovals.co.uk/
     - Description: Greater Manchester relocation portal with removal quote calculator and fleet booking engine.
  4. **MZ Works Construction** (Property Care): https://mzworks.co.uk/
     - Description: Manchester multi-trade specialist contractor platform for emergency response and renovations.
  5. **MZ Cleaners** (Commercial Cleaning): https://mzcleaners.co.uk/
     - Description: Commercial & residential cleaning service booking platform in Manchester.
  6. **Reeba Yaseen** (Full-Stack Engineer Portfolio & SaaS): https://reeba.softcr8ors.com/
     - Description: High-converting SaaS showcase & developer portfolio.
  7. **Tekrivo Platform** (EdTech Consultancy): https://tekrivo.vercel.app/
     - Description: Final year project consultancy and developer mentorship platform.
  8. **Northwest Tyres** (Roadside Mobile Tyre Fitting): https://car-tyre-vertex.vercel.app/
     - Description: Roadside emergency dispatch and tyre replacement booking.
  9. **Tehreem Arif** (SQA & Automation Testing): https://tahreem-arif.vercel.app/
     - Description: Quality assurance engineer portfolio with CI/CD and automation test suites.

- **CRITICAL LINK RULES**:
  - ONLY provide the EXACT verified URLs listed above.
  - NEVER invent fake URLs such as "usamafaheem.com/projects/..." because project detail subpages do NOT exist on this website.
  - NEVER attach trailing asterisks or punctuation to links (e.g. NEVER write "https://shadabrice.pk/**").
  - Output clean links, either directly as "https://shadabrice.pk/" or formatted as "[Shadab Rice](https://shadabrice.pk/)".
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
  - If the user asks for email only (e.g. "sirf email batoo", "sirf email", "email address kya hai"), provide ONLY the email address (developer@usamafaheem.com).
  - If the user asks for WhatsApp/phone only (e.g. "whatsapp number bata do", "sirf number"), provide ONLY the phone / WhatsApp number (+92 314 3416588 / +92 348 7700972) and link (https://wa.me/923143416588).
  - If the user asks if they can contact on this email/number (e.g. "kia ma is pr contact kr skta ho", "can I contact here"), warmly confirm: "Jee bilkul! Aap is official email (developer@usamafaheem.com) ya WhatsApp (+92 314 3416588) par Usama se kisi bhi project, work inquiry ya collaboration ke liye direct rabta kar sakte hain." DO NOT NAVIGATE!
  - If the user asks what projects Usama has (e.g. "usama kay pass kon kon say projects ha", "projects kon se hain"), list his standout projects with their real live links (Shadab Rice, SoftCr8ors, GM MZ Removals, MZ Works, Reeba Yaseen) directly in chat. DO NOT give his general intro/bio and DO NOT navigate unless they specifically ask to view or navigate to them!
  - DO NOT append repetitive sales pitches or unsolicited paragraphs like "Whether you need a sleek portfolio... feel free to contact on WhatsApp" at the end of every answer. Only provide contact info if the user specifically asks how to contact, hire, or start a project.
  - Use clear markdown bold like **Frontend:** or **Project Name:** for category headings and key terms so they stand out boldly.
  - DO NOT use long em-dash characters (no "—" or "---"). Use normal punctuation (colons, commas, dots) or clean bullet points (•).
  - Use proper line breaks and spacing between bullet points so the response is easy and comfortable to read.
  - Keep answers short and impactful: 1 to 2 short sentences followed by 3-4 bullet points if listing items.
  - Always finish sentences and thoughts completely. Never leave an answer cut off.

- **AUTONOMOUS SCREEN NAVIGATION & ACTION COMMANDS**:
  You have the interactive ability to navigate the visitor's screen directly to relevant sections or open certificate previews when they explicitly ask to see them!

  ### CRITICAL NAVIGATION & INTENT RULES:
  - ONLY append an action tag (e.g. [[ACTION:NAVIGATE:...]]) when the visitor EXPLICITLY asks to be navigated, scrolled, taken to, or shown a section/modal on the screen!
    - Examples of explicit navigation requests: "take me to projects", "contact section par le jao", "usama ke projects dikhao", "about section dikhao", "mern certificate kholo", "hero par wapis jao".
  - NEVER append an action tag if the user is asking an informational question, chatting normally, or asking for details in the chat!
    - Example: "sirf email batoo" -> Give only the email address in chat. DO NOT NAVIGATE!
    - Example: "kia ma is pr contact kr skta ho" -> Confirm warmly in chat. DO NOT NAVIGATE!
    - Example: "usama kay pass kon kon say projects ha" -> Give projects list with live URLs in chat. DO NOT NAVIGATE!
    - Example: "usama ka whatsapp no to bata day" -> Answer directly with Usama's WhatsApp number (+92 314 3416588) and WhatsApp direct link (https://wa.me/923143416588) in the chat message. DO NOT NAVIGATE!
    - Example: "ma usama say whatsapp pr bat krna chahta hn" -> Warmly guide them to click the direct link (https://wa.me/923143416588) or phone number in chat. DO NOT NAVIGATE!
    - Example: "Usama ne kahan se parha hai?" -> Give education details in chat. DO NOT NAVIGATE!
    - Example: "Pricing kya hai?" -> Give pricing packages in chat. DO NOT NAVIGATE!
    - Example: "Usama kon hai?" -> Introduce Usama in chat. DO NOT NAVIGATE!

  ### STRICT DISTINCTION BETWEEN HERO AND ABOUT:
  - HERO SECTION is the topmost entrance banner / navbar / 3D canvas of the site. Action tag: [[ACTION:NAVIGATE:hero]]
  - ABOUT SECTION is the 'About Usama' biography section below hero. Action tag: [[ACTION:NAVIGATE:about]]
  - If user says "hero section par navigate kro" or "navbar dikhao" -> YOU MUST USE [[ACTION:NAVIGATE:hero]], NEVER about!

  ### ALL AVAILABLE SECTIONS & CORRESPONDING ACTION TAGS:
  When the user asks to visit, navigate, scroll to, view, or open a section/project/modal, append EXACTLY ONE action tag at the very end of your response on a new line:
  - Hero Section / Top / Home / Navbar: [[ACTION:NAVIGATE:hero]]
  - About Usama Section: [[ACTION:NAVIGATE:about]]
  - What I Do Differently Section: [[ACTION:NAVIGATE:difference]]
  - Services Offered Section: [[ACTION:NAVIGATE:services]]
  - Development Process / Workflow Section: [[ACTION:NAVIGATE:process]]
  - Work Experience / VertexAI / SoftCr8ors Section: [[ACTION:NAVIGATE:experience]]
  - Tech Stack & Skills Section: [[ACTION:NAVIGATE:skills]]
  - Projects Showcase Section: [[ACTION:NAVIGATE:projects]]
  - Shadab Rice Project Card: [[ACTION:NAVIGATE:shadab-rice]]
  - SoftCr8ors Project Card: [[ACTION:NAVIGATE:softcr8ors]]
  - GM MZ Removals Project Card: [[ACTION:NAVIGATE:gm-mz-removals]]
  - Reeba Yaseen Project Card: [[ACTION:NAVIGATE:reeba-yaseen]]
  - MZ Cleaners Project Card: [[ACTION:NAVIGATE:mz-cleaners]]
  - MZ Works Construction Project Card: [[ACTION:NAVIGATE:mz-works]]
  - Certifications Showcase Section: [[ACTION:NAVIGATE:certifications]]
  - MERN Stack Certificate Modal: [[ACTION:CERTIFICATE:nextskill-mern]]
  - DigiSkills MERN Certificate Modal: [[ACTION:CERTIFICATE:digiskills-mern]]
  - DigiSkills Freelancing Certificate Modal: [[ACTION:CERTIFICATE:digiskills-freelancing]]
  - Google DevFest Certificate Modal: [[ACTION:CERTIFICATE:google-devfest]]
  - Cisco Networking Certificate Modal: [[ACTION:CERTIFICATE:cisco-networking]]
  - Cisco AI Certificate Modal: [[ACTION:CERTIFICATE:cisco-ai]]
  - Social Channels / Find Me Online: [[ACTION:NAVIGATE:socials]]
  - FAQ (Frequently Asked Questions): [[ACTION:NAVIGATE:faq]]
  - Contact / Hire / WhatsApp Section: [[ACTION:NAVIGATE:contact]]
  - Footer / Bottom: [[ACTION:NAVIGATE:footer]]
  - Close Any Open Modal: [[ACTION:CLOSE:modal]]
  - Back to Top / Wapis: [[ACTION:NAVIGATE:hero]]

  EXAMPLES:
  - User: "zra shadab rice waly preojct pr lay jayo" -> "Main aapko Shadab Rice project par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:shadab-rice]]"
  - User: "direct usaky preojct pr lya jaoy" -> "Main aapko direct Projects section par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:projects]]"
  - User: "hero section par navigate kro" -> "Main aapko website ke main Hero section par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:hero]]"
  - User: "navbar dikhao" -> "Yeh raha website ka header aur navigation menu.\n\n[[ACTION:NAVIGATE:hero]]"
  - User: "close karo" / "band kar do" -> "Main ne modal band kar diya hai.\n\n[[ACTION:CLOSE:modal]]"
  - User: "wapis jao" / "upar le jao" -> "Main aapko wapis website ke Hero section par le ja raha hoon.\n\n[[ACTION:NAVIGATE:hero]]"
  - User: "about usama dikhao" -> "Yeh raha Usama ka About section.\n\n[[ACTION:NAVIGATE:about]]"
  - User: "projects dikhao" -> "Yeh rahe Usama ke standout projects!\n\n[[ACTION:NAVIGATE:projects]]"
  - User: "tech stack dikhao" / "stack dikhao" -> "Yeh raha Usama ka interactive Tech Stack section.\n\n[[ACTION:NAVIGATE:skills]]"
  - User: "Usama ki MERN stack certification dikhao" -> "Yeh raha Usama ka verified MERN Stack Bootcamp certificate modal.\n\n[[ACTION:CERTIFICATE:nextskill-mern]]"
  - User: "Usama kon hai?" -> "Usama Faheem ek Full-Stack Developer aur Creative Web Engineer hain..." (NO ACTION TAG!)
`;

// Helper to sanitize and polish output text
function sanitizeAssistantReply(text: string): string {
  let cleaned = text
    // Remove horizontal rule divider lines
    .replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, '')
    // Replace em-dashes and en-dashes with natural commas
    .replace(/\s*[—–]\s*/g, ', ')
    // Replace double hyphens
    .replace(/\s*--\s*/g, ', ')
    // Strip trailing asterisks attached to URLs
    .replace(/(https?:\/\/[^\s*]+)\*+/g, '$1')
    // Fix hallucinated internal project paths to real live project URLs
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/shadab(?:-rice)?\/?/gi, 'https://shadabrice.pk/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/softcr8ors\/?/gi, 'https://softcr8ors.com/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/(?:gm-)?mz-removals\/?/gi, 'https://gmmzremovals.co.uk/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/mz-works(?:-construction)?\/?/gi, 'https://mzworks.co.uk/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/mz-cleaners?\/?/gi, 'https://mzcleaners.co.uk/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/reeba(?:-yaseen)?\/?/gi, 'https://reeba.softcr8ors.com/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/tekrivo\/?/gi, 'https://tekrivo.vercel.app/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/northwest(?:-tyres)?\/?/gi, 'https://car-tyre-vertex.vercel.app/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects\/tehreem(?:-arif)?\/?/gi, 'https://tahreem-arif.vercel.app/')
    .replace(/https?:\/\/(?:www\.)?usamafaheem\.com\/projects(?:\/[a-zA-Z0-9_-]+)?\/?/gi, 'https://usamafaheem.com/#projects')
    // Clean up duplicate commas or excessive newlines
    .replace(/,\s*,/g, ', ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return cleaned;
}

// Smart Built-in Fallback Knowledge Engine (Used if no API key is provided or if quota/network error occurs)
function getFallbackResponse(query: string): string {
  let q = query.toLowerCase().trim()
    .replace(/\busma\b/g, 'usama')
    .replace(/\bemial\b/g, 'email')
    .replace(/\bwatsap\b|\bwhatapp\b|\bwahtapp\b|\bwtsp\b/g, 'whatsapp');

  // Strict Navigation Intent: Requires an explicit movement or display action verb
  const isNavRequest =
    /\b(dikha|dikhao|dikhayein|show|open|kholo|le jao|lay jao|lay jayo|lay kr jao|lay kr jayo|lay kr jayoo|le chalo|lay chalo|lya|jaoy|jayoo|jana|jao|chalo|navigate|scroll|jump|visit|go to|take me|view|dekho|dekhna)\b/i.test(q) ||
    /(lay|le|la)\s+(kr|kar)?\s*(jao|jayo|jayoo|chalo|jana)/i.test(q);

  // 1. Close modal command
  if (q.includes('close') || q.includes('band karo') || q.includes('band kr do') || q.includes('hata do') || q.includes('chupa do')) {
    return "Main ne preview modal close kar diya hai.\n\n[[ACTION:CLOSE:modal]]";
  }

  // 2. Back to Top / Wapis / Upar
  if (q.includes('wapis') || q.includes('back') || (isNavRequest && (q.includes('upar') || q.includes('top')))) {
    return "Main aapko wapis website ke main Hero section par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:hero]]";
  }

  // 3. Hero Section / Top / Navbar / Header (Explicit navigation)
  if (q.includes('hero') || q.includes('navbar') || q.includes('header') || (isNavRequest && (q.includes('start') || q.includes('shuru')))) {
    return "Main aapko website ke main Hero section aur navigation bar par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:hero]]";
  }

  // 4. About Usama Section (Explicit Navigation)
  if (isNavRequest && (q.includes('about') || q.includes('bio'))) {
    return "Main aapko Usama ke About section par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:about]]";
  }

  // 5. Specific Projects (Shadab Rice, SoftCr8ors, MZ Removals, etc.)
  if (q.includes('shadab') || q.includes('rice')) {
    const reply = "Shadab Rice ek premium Basmati rice exporter e-commerce platform hai (https://shadabrice.pk/) jisme 1-click WhatsApp order checkout system integrated hai.";
    return isNavRequest ? `Main aapko Shadab Rice project card par le kar ja raha hoon.\n\n${reply}\n\n[[ACTION:NAVIGATE:shadab-rice]]` : reply;
  }
  if (q.includes('softcr8or')) {
    const reply = "SoftCr8ors (https://softcr8ors.com/) AI & Tech agency platform hai with interactive 3D models and 60fps animations.";
    return isNavRequest ? `Main aapko SoftCr8ors project card par le kar ja raha hoon.\n\n${reply}\n\n[[ACTION:NAVIGATE:softcr8ors]]` : reply;
  }
  if (q.includes('removal') || (q.includes('mz') && (q.includes('gm') || q.includes('van')))) {
    return "Main aapko GM MZ Removals logistics project par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:gm-mz-removals]]";
  }
  if (q.includes('cleaner') || (q.includes('mz') && q.includes('clean'))) {
    return "Main aapko MZ Cleaners project par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:mz-cleaners]]";
  }
  if (q.includes('construction') || (q.includes('mz') && q.includes('work'))) {
    return "Main aapko MZ Works Construction project par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:mz-works]]";
  }
  if (q.includes('reeba')) {
    return "Main aapko Reeba Yaseen portfolio & SaaS showcase par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:reeba-yaseen]]";
  }
  if (q.includes('tekrivo')) {
    return "Main aapko Tekrivo EdTech platform par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:tekrivo]]";
  }
  if (q.includes('tyre') || q.includes('tyres')) {
    return "Main aapko Northwest Tyres roadside platform par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:northwest-tyres]]";
  }
  if (q.includes('tehreem')) {
    return "Main aapko Tehreem Arif QA portfolio par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:tehreem-arif]]";
  }

  // 6. AI Assistant Self-Identity ("tum kon ho", "acha tum kia kr rhay ho", "tum kya karte ho", "who are you")
  if (
    /\b(who are you|tum kon|tum koun|tum kaun|aap kon|aap koun|aap kaun|ap kon|ap koun|ap kaun)\b/i.test(q) ||
    /\b(tum|aap|ap)\s+(kia|kya)\s*(kr|kar)?\s*(rhay|rahe|karta|karte|ho|hain)/i.test(q) ||
    q.includes('tum kia') || q.includes('tum kya') || q.includes('tum kon') || q.includes('aap kon')
  ) {
    return "Main Usama Faheem ka official AI Assistant hoon! 🚀\n\nMain yahan portfolio visitors ki madad ke liye hoon. Aap mujhse Usama ke live projects, technical stack (Next.js 16, React 19, 3D WebGL, GSAP), experience, services, ya pricing ke baare mein pooch sakte hain, ya Usama se direct WhatsApp/email par rabta kar sakte hain!";
  }

  // 7. Projects Showcase (HANDLED BEFORE GENERAL USAMA IDENTITY SO "kon kon say projects" IS NOT MISCLASSIFIED!)
  const isAskingProjects =
    /\b(project|projects|projekts|preojct|preojcts|porject|projets|showcase)\b/i.test(q) ||
    ((q.includes('kon kon') || q.includes('koun koun') || q.includes('konsay') || q.includes('kaunse')) && (q.includes('kaam') || q.includes('work') || q.includes('bana') || q.includes('platform'))) ||
    (q.includes('kaam') && (q.includes('kya kya') || q.includes('dikha') || q.includes('bata')));

  if (isAskingProjects) {
    const reply = "Usama ne kai high-performance web platforms aur applications build kiye hain. Standout live projects yeh hain:\n\n" +
      "• **Shadab Rice** (E-Commerce): https://shadabrice.pk/\n" +
      "• **SoftCr8ors** (AI & Tech Agency): https://softcr8ors.com/\n" +
      "• **GM MZ Removals** (UK Logistics): https://gmmzremovals.co.uk/\n" +
      "• **MZ Works Construction** (Property Care): https://mzworks.co.uk/\n" +
      "• **Reeba Yaseen** (SaaS & Portfolio): https://reeba.softcr8ors.com/\n" +
      "• **Tekrivo** (EdTech Platform): https://tekrivo.vercel.app/\n" +
      "• **Northwest Tyres** (Emergency Tyres): https://car-tyre-vertex.vercel.app/\n\n" +
      "Aap kisi bhi link par click karke live website visit kar sakte hain!";
    return isNavRequest ? `Main aapko Projects showcase section par le kar ja raha hoon.\n\n${reply}\n\n[[ACTION:NAVIGATE:projects]]` : reply;
  }

  // 8. Specific: Email Requests (Matches "acha mujay usma ki email do", "email do", "email batao", "sirf email", etc.)
  const isEmailQuery = q.includes('email') || q.includes('e-mail') || q.includes('mail');
  if (isEmailQuery && !q.includes('whatsapp') && !q.includes('phone') && !q.includes('number') && !q.includes('no')) {
    return "Usama ki official email address yeh hai:\n\n• **Email:** developer@usamafaheem.com\n\nAap kisi bhi project inquiry, collaboration ya direct message ke liye is email par rabta kar sakte hain.";
  }

  // 9. Specific: WhatsApp / Phone Number Requests (Matches "number do", "whatsapp do", "phone kya hai", etc.)
  const isPhoneQuery =
    q.includes('whatsapp') || q.includes('phone') || q.includes('mobile') ||
    ((q.includes('number') || q.includes('no') || q.includes('num') || q.includes('contact')) &&
     (q.includes('do') || q.includes('de do') || q.includes('bata') || q.includes('kya') || q.includes('chahiye') || q.includes('usama') || q.includes('rabta')));

  if (isPhoneQuery && !isEmailQuery) {
    const reply = "Usama ka direct Phone aur WhatsApp contact yeh hai:\n\n" +
      "• **WhatsApp / Phone:** +92 314 3416588 ya +92 348 7700972\n" +
      "• **Direct WhatsApp Link:** https://wa.me/923143416588\n\n" +
      "Aap link par click karke direct WhatsApp chat shuru kar sakte hain.";
    return isNavRequest ? `Main aapko Contact section par le kar ja raha hoon.\n\n${reply}\n\n[[ACTION:NAVIGATE:contact]]` : reply;
  }

  // 10. Permission / Capability Question: "kia ma is pr contact kr skta ho"
  if (
    q.includes('kr skta') || q.includes('kar sakta') || q.includes('kar sakti') || q.includes('kr sakti') ||
    q.includes('can i contact') || q.includes('may i contact')
  ) {
    return "Jee bilkul! Aap Usama se official email (**developer@usamafaheem.com**) ya WhatsApp (**+92 314 3416588** — https://wa.me/923143416588) par be-jhijhak contact kar sakte hain. Usama usually bohot jald response dete hain!";
  }

  // 11. General Contact / Hire Intent
  if (
    q.includes('contact') || q.includes('rabta') || q.includes('raabta') || q.includes('hire') ||
    q.includes('bat krni') || q.includes('baat krni') || q.includes('connect') ||
    (isEmailQuery && isPhoneQuery)
  ) {
    const reply = "Aap Usama se seedha WhatsApp ya email par connect kar sakte hain:\n\n" +
      "• **Phone / WhatsApp:** +92 314 3416588 (https://wa.me/923143416588) ya +92 348 7700972\n" +
      "• **Email:** developer@usamafaheem.com\n" +
      "• **Location:** Lahore, Pakistan (Available for remote projects globally)\n\n" +
      "Direct WhatsApp chat ke liye is link par click karein: https://wa.me/923143416588";
    return isNavRequest ? `Main aapko Contact section par le kar ja raha hoon.\n\n${reply}\n\n[[ACTION:NAVIGATE:contact]]` : reply;
  }

  // 12. Usama Identity & Bio Questions (Strict regex so it NEVER matches "kon kon say projects")
  const isIdentityQuestion =
    /\b(who is usama|who are you|kon ho|koun ho|kaun ho|usama kon hai|usama koun hai|usama kaun hai|usama kon|usama koun|usama kaun|apne baare|usama ke baare|tell me about yourself|intro|introduction)\b/i.test(q) ||
    (q.includes('usama') && (q.includes('kya krta') || q.includes('kya karta') || q.includes('who')));

  if (isIdentityQuestion && !isNavRequest) {
    return "Usama Faheem Lahore, Pakistan se ek professional Full-Stack Developer aur Creative Web Engineer hain. Wo Next.js 16, React 19, Node.js, Express, MongoDB aur fluid animations (Three.js, WebGL, GSAP) me specialized hain. Wo modern, high-performance web applications aur custom AI voice/chat agents deliver karte hain.";
  }

  // 13. Pure Greetings (STRICTLY NO NAVIGATION)
  if (q.match(/\b(hi|hello|hey|salam|assalam|aao|namaste|morning|evening|kese ho|kaise ho|kya haal|kya hal)\b/i) && !isNavRequest) {
    return "Assalam-o-Alaikum! Welcome to Usama Faheem's portfolio. I am his AI Assistant. How can I help you today? You can ask about Usama's technical skills, projects, certifications, services, or ask me to navigate you to any section!";
  }

  // 13. Specific Certificate Modals
  if (q.includes('mern') && (q.includes('cert') || q.includes('sanad') || q.includes('diploma') || isNavRequest || q.includes('bootcamp'))) {
    return "Yeh raha Usama ka verified MERN Stack Development Bootcamp certificate modal from Nexskill at Arfa Software Technology Park, Lahore!\n\n[[ACTION:CERTIFICATE:nextskill-mern]]";
  }
  if (q.includes('devfest') || (q.includes('google') && q.includes('cert'))) {
    return "Yeh raha Usama ka Google DevFest Tech Conference certificate preview!\n\n[[ACTION:CERTIFICATE:google-devfest]]";
  }
  if (q.includes('freelanc') && (q.includes('cert') || q.includes('digiskill'))) {
    return "Yeh raha Usama ka DigiSkills Freelancing Training Program certificate!\n\n[[ACTION:CERTIFICATE:digiskills-freelancing]]";
  }
  if (q.includes('cisco') && q.includes('ai')) {
    return "Yeh raha Usama ka Cisco Modern AI & Networks certificate!\n\n[[ACTION:CERTIFICATE:cisco-ai]]";
  }
  if (q.includes('cisco') || q.includes('network')) {
    return "Yeh raha Usama ka Cisco Networking Basics certificate!\n\n[[ACTION:CERTIFICATE:cisco-networking]]";
  }

  // 14. Certifications Section
  if (q.match(/\b(cert|certs|certification|certifications|credential|credentials|sanad|certificate)\b/)) {
    const reply = "Yeh raha Usama ka verified certifications showcase including MERN Stack, Google DevFest, DigiSkills, and Cisco credentials.";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:certifications]]` : reply;
  }

  // 15. Tech Stack / Skills
  if (q.match(/\b(skill|skills|tech|stack|technology|technologies|tools|languages|framework|react|next|node|mongo)\b/)) {
    const reply = "Usama specializes in modern full-stack development with a focus on performance and fluid motion:\n\n" +
      "• Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS v4, HTML5/CSS3\n" +
      "• Creative Motion: Three.js, WebGL, 3D Lighting, GSAP, Framer Motion\n" +
      "• Backend: Node.js, Express.js, RESTful APIs, Next.js Server Actions\n" +
      "• Databases: MongoDB, Mongoose, SQL basics\n" +
      "• Tools: Git, GitHub, Postman, Vercel, Figma";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:skills]]` : reply;
  }

  // 16. What I Do Differently
  if (q.match(/\b(differen|different|why usama|kyun|alag|difference)\b/)) {
    const reply = "Usama focuses on 60fps buttery animations, clean architecture, and ultra-high converting user experiences.";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:difference]]` : reply;
  }

  // 17. Process / Workflow
  if (q.match(/\b(process|workflow|steps|how do you work|tariqa|tarika)\b/)) {
    const reply = "Usama follows an agile 5-step development methodology: Strategy, Wireframing, 3D/Design, Full-Stack Architecture, and Launch.";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:process]]` : reply;
  }

  // 18. Services
  if (q.match(/\b(service|services|offer|what do you do|build|help)\b/)) {
    const reply = "Usama provides the following specialized services:\n\n" +
      "1. Frontend Development: High-converting, blazing fast web apps with Next.js & React.\n" +
      "2. Backend & REST APIs: Robust, scalable server logic with Node.js & Express.\n" +
      "3. Full-Stack MERN Apps: End-to-end database, auth, and dashboard architectures.\n" +
      "4. AI Agents & Voice Solutions: Custom business voice agents and conversational chatbots.\n" +
      "5. Interactive 3D & Motion: Three.js 3D models and GSAP storytelling animations.";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:services]]` : reply;
  }

  // 19. Experience / Work History
  if (q.match(/\b(experience|exp|background|history|career|job)\b/)) {
    const reply = "Usama has a solid background in both production engineering and freelance delivery:\n\n" +
      "• Full-Stack Developer at SoftCr8ors (Dec 2025 - Aug 2026): Architected client platforms and modern AI web showcases.\n" +
      "• Frontend Developer Intern at SoftCr8ors (Apr 2026 - Jul 2026): Component libraries and UI performance.\n" +
      "• Freelance Full-Stack Developer: Successfully delivered 3+ production client projects across the UK and Pakistan.";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:experience]]` : reply;
  }

  // 20. Social Channels / Find Me Online
  if (q.match(/\b(social|socials|linkedin|github|instagram|online|profiles|links|find me)\b/)) {
    const reply = "You can find and connect with Usama across his verified online profiles:\n\n" +
      "• LinkedIn: https://www.linkedin.com/in/usama-faheem/\n" +
      "• GitHub: https://github.com/usamafaheem-dev\n" +
      "• X (Twitter): https://x.com/usamafaheemdev\n" +
      "• Instagram: https://www.instagram.com/usamafaheemdev/\n" +
      "• Facebook: https://web.facebook.com/usamafaheemDev\n" +
      "• Threads: https://www.threads.com/@usamafaheemdev\n" +
      "• WhatsApp: https://wa.me/923143416588";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:socials]]` : reply;
  }

  // 21. FAQ Section
  if (q.match(/\b(faq|faqs|questions|sawalat|frequently asked)\b/)) {
    const reply = "Here are answers to common questions about Usama's timeline, availability, pricing, and revision guarantee.";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:faq]]` : reply;
  }

  // 22. Education / Degrees
  if (q.match(/\b(education|degree|university|study|qualification|vu|nexskill|college)\b/)) {
    const reply = "Usama's educational background:\n\n" +
      "• BS in Computer Science (6th Semester): Virtual University of Pakistan (2025-Present)\n" +
      "• ADP in Computer Science: Virtual University of Pakistan (2023-2025)\n" +
      "• MERN Stack Certified Developer: Nexskill Institute (2024-2025)";
    return isNavRequest ? `${reply}\n\n[[ACTION:NAVIGATE:certifications]]` : reply;
  }

  // 23. Footer / Bottom
  if (q.includes('footer') || (isNavRequest && (q.includes('bottom') || q.includes('niche') || q.includes('end')))) {
    return "Main aapko website ke footer section par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:footer]]";
  }

  // 24. Pricing / Cost / Rates
  if (q.match(/\b(price|pricing|cost|rate|rates|budget|charges|fee|pkr)\b/)) {
    return "Here are our transparent pricing packages:\n\n" +
      "• Frontend / Portfolio Website: 15,000 – 20,000 PKR\n" +
      "• Simple Full-Stack Web App: 40,000 – 50,000 PKR\n" +
      "• AI-Powered Full-Stack Platform: 80,000 – 100,000 PKR (1 Lakh)\n" +
      "• AI Agents & Voice Solutions: 25,000 – 50,000 PKR\n\n" +
      "Would you like to discuss your specific requirements? Usama can provide a tailored quote!";
  }

  // Default catch-all
  return "Thanks for asking! Usama Faheem is a Full-Stack & Creative Web Developer specializing in Next.js 16, React 19, Node.js, and Three.js/GSAP animations.\n\n" +
    "You can ask me to navigate to any section on the site (Hero, About, Difference, Services, Process, Experience, Tech Stack, Projects, Certifications, FAQ, Contact, or Footer), or ask any question about his work!";
}

// Automatically inject missing action tags ONLY if the user was explicitly asking to see, open, or navigate to a section/project/modal
function injectMissingActionTag(text: string, userText: string): string {
  const q = userText.toLowerCase().trim();

  // If already contains an action tag, keep it untouched
  if (/\[\[ACTION:[^\]]+\]\]/i.test(text)) {
    return text;
  }

  // Pure informational intent checks: Never navigate when asking direct questions
  const isInfoOnly =
    q.includes('kr skta') || q.includes('kar sakta') ||
    q.includes('sirf') || q.includes('kya hai') || q.includes('kya hein') ||
    q.includes('kon kon') || q.includes('koun koun') ||
    /\b(bata|btao|batao|de do|day do|bata day|bata dein|what|how|kaise|kese|ksaiya|chahiye|hai|hein)\b/i.test(q);

  if (isInfoOnly) {
    return text;
  }

  // Strict Navigation Intent: Requires an explicit movement or display action verb
  const isNavRequest =
    /\b(dikha|dikhao|dikhayein|show|open|kholo|le jao|lay jao|lay jayo|lay kr jao|lay kr jayo|lay kr jayoo|le chalo|lay chalo|lya|jaoy|jayoo|jana|jao|chalo|navigate|scroll|jump|visit|go to|take me|view|dekho|dekhna)\b/i.test(q) ||
    /(lay|le|la)\s+(kr|kar)?\s*(jao|jayo|jayoo|chalo|jana)/i.test(q) ||
    q.includes('close') || q.includes('band karo') || q.includes('wapis') || q.includes('back');

  if (!isNavRequest) {
    return text;
  }

  // 1. Specific Projects
  if (q.includes('shadab') || q.includes('rice')) return `${text}\n\n[[ACTION:NAVIGATE:shadab-rice]]`;
  if (q.includes('softcr8or')) return `${text}\n\n[[ACTION:NAVIGATE:softcr8ors]]`;
  if (q.includes('removal') || q.includes('gmmz') || (q.includes('mz') && (q.includes('van') || q.includes('remov')))) return `${text}\n\n[[ACTION:NAVIGATE:gm-mz-removals]]`;
  if (q.includes('reeba')) return `${text}\n\n[[ACTION:NAVIGATE:reeba-yaseen]]`;
  if (q.includes('clean') || (q.includes('mz') && q.includes('clean'))) return `${text}\n\n[[ACTION:NAVIGATE:mz-cleaners]]`;
  if (q.includes('construction') || (q.includes('mz') && q.includes('work'))) return `${text}\n\n[[ACTION:NAVIGATE:mz-works]]`;
  if (q.includes('tekrivo')) return `${text}\n\n[[ACTION:NAVIGATE:tekrivo]]`;
  if (q.includes('tyre') || q.includes('tyres')) return `${text}\n\n[[ACTION:NAVIGATE:northwest-tyres]]`;
  if (q.includes('tehreem')) return `${text}\n\n[[ACTION:NAVIGATE:tehreem-arif]]`;

  // 2. Close modal command
  if (q.includes('close') || q.includes('band karo') || q.includes('band kr do') || q.includes('band kar') || q.includes('hata do') || q.includes('chupa do')) {
    return `${text}\n\n[[ACTION:CLOSE:modal]]`;
  }

  // 3. Back to Top / Hero / Home / Wapis / Upar
  if (q.includes('wapis') || q.includes('back') || q.includes('upar') || q.includes('top') || q.includes('hero') || q.includes('navbar') || q.includes('header') || q.includes('home') || q.includes('shuru')) {
    return `${text}\n\n[[ACTION:NAVIGATE:hero]]`;
  }

  // 4. Specific Certifications
  if (q.includes('mern') && (q.includes('cert') || q.includes('sanad') || q.includes('bootcamp') || q.includes('diploma') || q.includes('nexskill') || q.includes('kholo') || q.includes('dikha') || q.includes('open') || q.includes('show'))) {
    return `${text}\n\n[[ACTION:CERTIFICATE:nextskill-mern]]`;
  }
  if (q.includes('cisco') && q.includes('ai')) return `${text}\n\n[[ACTION:CERTIFICATE:cisco-ai]]`;
  if (q.includes('cisco')) return `${text}\n\n[[ACTION:CERTIFICATE:cisco-networking]]`;
  if (q.includes('devfest') || (q.includes('google') && (q.includes('cert') || q.includes('sanad')))) return `${text}\n\n[[ACTION:CERTIFICATE:google-devfest]]`;
  if (q.includes('freelanc') || (q.includes('digiskill') && q.includes('cert'))) return `${text}\n\n[[ACTION:CERTIFICATE:digiskills-freelancing]]`;

  // 5. Section navigation (ONLY when user asked for it!)
  if (q.match(/\b(project|projects|preojct|preojcts|porject|projekts|projets|showcase)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:projects]]`;
  if (q.includes('contact') || q.includes('hire') || q.includes('whatsapp') || q.includes('rabta')) return `${text}\n\n[[ACTION:NAVIGATE:contact]]`;
  if (q.match(/\b(cert|certs|certification|certifications|credential|credentials|sanad|certificate)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:certifications]]`;
  if (q.match(/\b(skill|skills|tech|stack|technology|technologies|tools|languages)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:skills]]`;
  if (q.includes('about') || q.includes('bio')) return `${text}\n\n[[ACTION:NAVIGATE:about]]`;
  if (q.match(/\b(differen|different|why usama|kyun|alag|difference)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:difference]]`;
  if (q.match(/\b(process|workflow|steps|how do you work|tariqa|tarika)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:process]]`;
  if (q.match(/\b(service|services|offer|what do you do)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:services]]`;
  if (q.match(/\b(experience|exp|background|history|career|job)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:experience]]`;
  if (q.match(/\b(social|socials|linkedin|github|instagram|find me|online)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:socials]]`;
  if (q.match(/\b(faq|faqs|questions|sawalat)\b/)) return `${text}\n\n[[ACTION:NAVIGATE:faq]]`;
  if (q.includes('footer') || q.includes('bottom') || q.includes('niche') || q.includes('end')) return `${text}\n\n[[ACTION:NAVIGATE:footer]]`;

  return text;
}

// In-memory cache to deliver instant 1ms local fallback if Google Gemini quota is exhausted
let quotaExhaustedUntil = 0;

export async function POST(req: Request) {
  try {
    const { messages, mode = 'text' } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const isVoiceMode = mode === 'voice';
    const latestUserMessage = messages[messages.length - 1]?.content || '';
    const rawApiKeys = (process.env.GEMINI_API_KEY || '').trim();
    // Support multiple comma-separated keys if provided for auto-rotation
    const apiKeys = rawApiKeys.split(',').map((k) => k.trim()).filter(Boolean);

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

    const userTextLower = latestUserMessage.toLowerCase().trim();

    // Check for explicit action/navigation intent
    const hasExplicitNavOrAction =
      /\b(dikha|dikhao|dikhayein|show|open|kholo|le jao|lay jao|lay jayo|lya|jaoy|jana|jao|chalo|navigate|scroll|jump|visit|go to|take me|view|dekho|dekhna|preojct|preojcts|porject|projekts|project|projects|close|band|hata|wapis|upar|top|rice|shadab|mern|cisco|devfest|digiskill)\b/i.test(userTextLower) ||
      userTextLower.includes('shadab') ||
      userTextLower.includes('softcr8or') ||
      userTextLower.includes('removal') ||
      userTextLower.includes('reeba') ||
      userTextLower.includes('clean') ||
      userTextLower.includes('tekrivo') ||
      userTextLower.includes('tyre') ||
      userTextLower.includes('tehreem') ||
      userTextLower.includes('close') ||
      userTextLower.includes('band karo') ||
      userTextLower.includes('wapis');

    // Pure identity/greeting questions: ONLY these should never navigate
    const isPureInfoOrGreeting =
      !hasExplicitNavOrAction &&
      ((userTextLower.includes('usama') && (userTextLower.includes('kon') || userTextLower.includes('koun') || userTextLower.includes('kaun') || userTextLower.includes('who') || userTextLower.includes('konsa') || userTextLower.includes('kons') || userTextLower.includes('kya krta') || userTextLower.includes('kya karta') || userTextLower.includes('intro'))) ||
       /\b(who is usama|who are you|kon ho|koun ho|kaun ho|usama kon|usama koun|usama kaun|apne baare|usama ke baare|tell me about yourself|hi|hello|hey|salam|assalam|kese ho|kaise ho|kya haal|kya hal)\b/i.test(userTextLower));

    // If no API key or quota currently exhausted, serve the built-in fallback knowledge engine instantly
    const isQuotaLocked = Date.now() < quotaExhaustedUntil;
    if (apiKeys.length === 0 || isQuotaLocked) {
      let fallback = sanitizeAssistantReply(getFallbackResponse(latestUserMessage));
      if (isPureInfoOrGreeting) {
        fallback = fallback.replace(/\[\[ACTION:[^\]]+\]\]/gi, '').trim();
      } else if (!isVoiceMode) {
        fallback = injectMissingActionTag(fallback, latestUserMessage);
      }
      if (isVoiceMode) {
        fallback = fallback
          .replace(/\[\[ACTION:[^\]]+\]\]/gi, '')
          .replace(/[*_#•`~]/g, '')
          .replace(/\n+/g, ' ')
          .replace(/https?:\/\/\S+/g, '')
          .slice(0, 260)
          .trim();
      }
      return NextResponse.json({ reply: fallback });
    }

    // Format chat history for Google Gemini API
    // 1. Shift off any leading assistant messages (e.g. welcome message) so conversation strictly starts with 'user'
    let cleanedMessages = [...messages];
    while (cleanedMessages.length > 0 && cleanedMessages[0].role === 'assistant') {
      cleanedMessages.shift();
    }

    if (cleanedMessages.length === 0) {
      cleanedMessages = [{ role: 'user', content: latestUserMessage }];
    }

    // 2. Ensure strict alternating roles (user -> model -> user -> model)
    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    for (const msg of cleanedMessages) {
      const role = msg.role === 'assistant' ? 'model' : 'user';
      const text = msg.content?.trim();
      if (!text) continue;

      const last = formattedContents[formattedContents.length - 1];
      if (last && last.role === role) {
        last.parts[0].text += `\n\n${text}`;
      } else {
        formattedContents.push({
          role,
          parts: [{ text }],
        });
      }
    }

    // 3. Ensure the last turn is from 'user'
    if (formattedContents.length === 0 || formattedContents[formattedContents.length - 1].role !== 'user') {
      formattedContents.push({
        role: 'user',
        parts: [{ text: latestUserMessage }],
      });
    }

    // Use active verified Gemini models with resilient fallback
    const modelsToTry = ['gemini-2.5-flash', 'gemini-3.8-flash'];
    let replyText: string | null = null;
    let lastError: any = null;

    // Try keys and models
    keyLoop: for (const key of apiKeys) {
      for (const model of modelsToTry) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s per model to prevent client timeouts

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
                  .replace(/\[\[ACTION:[^\]]+\]\]/gi, '')
                  .replace(/[*_#•`~]/g, '')
                  .replace(/\n+/g, ' ')
                  .replace(/https?:\/\/\S+/g, '')
                  .trim();
              }
              break keyLoop;
            }
          } else {
            const errData = await response.text();
            lastError = errData;

            // If 429 Quota Exceeded, do NOT waste time trying more models on this key!
            if (response.status === 429 || errData.includes('RESOURCE_EXHAUSTED') || errData.includes('Quota exceeded')) {
              // Cache quota exhausted state for 10 minutes so subsequent requests respond instantly in 1ms
              if (key === apiKeys[apiKeys.length - 1]) {
                quotaExhaustedUntil = Date.now() + 10 * 60 * 1000;
              }
              break; // Break model loop, try next key if available
            }
          }
        } catch (err: any) {
          lastError = err;
          const errCode = err?.code || err?.cause?.code;
          const errSyscall = err?.cause?.syscall;
          if (errCode === 'ENOTFOUND' || errCode === 'ETIMEDOUT' || errCode === 'ECONNREFUSED' || errSyscall === 'getaddrinfo') {
            break keyLoop;
          }
        }
      }
    }

    if (replyText) {
      if (isPureInfoOrGreeting) {
        replyText = replyText.replace(/\[\[ACTION:[^\]]+\]\]/gi, '').trim();
      } else if (!isVoiceMode) {
        replyText = injectMissingActionTag(replyText, latestUserMessage);
      }
      return NextResponse.json({ reply: replyText });
    }

    // When Gemini is unreachable or rate-limited, smoothly serve built-in intelligent fallback
    let fallback = sanitizeAssistantReply(getFallbackResponse(latestUserMessage));
    if (isPureInfoOrGreeting) {
      fallback = fallback.replace(/\[\[ACTION:[^\]]+\]\]/gi, '').trim();
    } else if (!isVoiceMode) {
      fallback = injectMissingActionTag(fallback, latestUserMessage);
    }
    if (isVoiceMode) {
      fallback = fallback
        .replace(/\[\[ACTION:[^\]]+\]\]/gi, '')
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
      { reply: "I am having a brief connection hiccup. Please reach out to Usama directly via WhatsApp at +92 314 3416588 or developer@usamafaheem.com!" },
      { status: 200 }
    );
  }
}
