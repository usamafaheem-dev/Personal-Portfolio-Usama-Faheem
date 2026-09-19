import { NextResponse } from 'next/server';

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

const audioCache = new Map<string, Buffer>();
const MAX_CACHE_ITEMS = 60;

function cleanTextForTTS(input: string): string {
  return (
    input
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[*_#•`~]/g, ' ')
      .replace(/\bNext\.js\b/gi, 'Next dot js')
      .replace(/\bNode\.js\b/gi, 'Node dot js')
      .replace(/\bReact\.js\b/gi, 'React')
      .replace(/\bThree\.js\b/gi, 'Three dot js')
      .replace(/\bExpress\.js\b/gi, 'Express dot js')
      .replace(/\bMERN\b/g, 'MERN')
      .replace(/\bAPI\b/g, 'A P I')
      .replace(/\bAPIs\b/g, 'A P I s')
      .replace(/\bUI\/UX\b/gi, 'U I and U X')
      .replace(/\bUI\b/g, 'U I')
      .replace(/\bUX\b/g, 'U X')
      .replace(/\bGSAP\b/gi, 'G-sap')
      .replace(/\bSQA\b/g, 'S Q A')
      .replace(/[—–]/g, ', ')
      .replace(/\s*-\s*/g, ', ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { text, voice = 'nPczCjzI2devNBz1zQrb' } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
    }

    const cleanText = cleanTextForTTS(text);
    if (!cleanText) {
      return NextResponse.json({ error: 'Text is empty after cleaning' }, { status: 400 });
    }

    const cacheKey = `${voice}:::${cleanText}`;
    if (audioCache.has(cacheKey)) {
      const cachedBuffer = audioCache.get(cacheKey)!;
      return new Response(new Uint8Array(cachedBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': cachedBuffer.length.toString(),
          'Cache-Control': 'public, max-age=86400, immutable',
        },
      });
    }

    const ttsResponse = await fetch(`${ELEVENLABS_API_URL}/${voice}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: cleanText,
        model_id: 'eleven_flash_v2_5',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!ttsResponse.ok) {
      const errorData = await ttsResponse.json().catch(() => ({}));
      console.error('ElevenLabs TTS error:', errorData);
      return NextResponse.json(
        { error: 'ElevenLabs TTS failed' },
        { status: ttsResponse.status }
      );
    }

    const arrayBuffer = await ttsResponse.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    if (audioCache.size >= MAX_CACHE_ITEMS) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, audioBuffer);

    return new Response(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (error: any) {
    console.error('TTS generation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to synthesize speech' },
      { status: 500 }
    );
  }
}
