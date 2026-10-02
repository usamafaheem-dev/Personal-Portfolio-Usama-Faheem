import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const AGENT_IDS = [
  'agent_5701m2zvfkwpf6tbcwxd2gbr3d56', // Verified Healthy
  'agent_9401m2zt1218fee9vf15j6ykam2y', // Verified Healthy
  'agent_6101m2zvqra0e6ebkbzennsyak2d', // Verified Healthy
  'agent_3901m344jcyjfq4bjqbp0635z595', // Verified Healthy
  'agent_7201m2zwkz4gf0gb1jefce2ac6wp', // Quota Exceeded
  'agent_7601m2zv2rayfxnr3q0mj1s3xwq1', // Quota Exceeded
  'agent_9701m2zt455hemjbp84p9yk89dnk', // Quota Exceeded
  'agent_3601m2w6eyzjeyybxv6a6yva3mk0', // Quota Exceeded
  'agent_3401m2ztp1svfz7r8b4ejrzf823w', // Quota Exceeded
];

const INITIAL_EXHAUSTED = [
  'agent_7201m2zwkz4gf0gb1jefce2ac6wp',
  'agent_7601m2zv2rayfxnr3q0mj1s3xwq1',
  'agent_9701m2zt455hemjbp84p9yk89dnk',
  'agent_3601m2w6eyzjeyybxv6a6yva3mk0',
  'agent_3401m2ztp1svfz7r8b4ejrzf823w',
];

// In-memory server-side state for verified healthy agent
let currentActiveAgent = AGENT_IDS[0];
let lastCheckTime = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes cache
const exhaustedSet = new Set<string>(INITIAL_EXHAUSTED);
const healthCache = new Map<string, { healthy: boolean; timestamp: number }>();

async function verifyAgentHealth(agentId: string): Promise<boolean> {
  if (exhaustedSet.has(agentId)) return false;

  const cached = healthCache.get(agentId);
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_DURATION_MS) {
    return cached.healthy;
  }

  // Real-time WebSocket verification of active conversation token pool
  if (typeof WebSocket !== 'undefined') {
    const isHealthy = await new Promise<boolean>((resolve) => {
      let resolved = false;
      const url = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;
      try {
        const ws = new WebSocket(url);
        const timer = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            try { ws.close(); } catch {}
            // If connection opened without error, consider healthy
            resolve(true);
          }
        }, 3000);

        ws.onmessage = (event) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            try { ws.close(); } catch {}
            const data = String(event.data || '');
            if (data.includes('quota_exceeded') || data.includes('credits') || data.includes('out of credits')) {
              exhaustedSet.add(agentId);
              resolve(false);
            } else {
              resolve(true);
            }
          }
        };

        ws.onerror = () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            resolve(false);
          }
        };

        ws.onclose = (event) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            const reason = event.reason || '';
            if (
              reason.includes('quota_exceeded') ||
              reason.includes('credits') ||
              reason.includes('out of credits') ||
              event.code === 1008 ||
              event.code === 3000
            ) {
              exhaustedSet.add(agentId);
              resolve(false);
            } else {
              resolve(false);
            }
          }
        };
      } catch {
        resolve(false);
      }
    });

    healthCache.set(agentId, { healthy: isHealthy, timestamp: now });
    if (!isHealthy) {
      exhaustedSet.add(agentId);
    }
    return isHealthy;
  }

  return true;
}

async function getNextHealthyAgent(startAfterId?: string): Promise<string> {
  const startIndex = startAfterId ? (AGENT_IDS.indexOf(startAfterId) + 1) % AGENT_IDS.length : 0;

  for (let i = 0; i < AGENT_IDS.length; i++) {
    const idx = (startIndex + i) % AGENT_IDS.length;
    const candidate = AGENT_IDS[idx];
    if (exhaustedSet.has(candidate)) continue;

    const isHealthy = await verifyAgentHealth(candidate);
    if (isHealthy) {
      currentActiveAgent = candidate;
      lastCheckTime = Date.now();
      return candidate;
    }
  }

  // Fallback to first non-exhausted or first agent
  const fallback = AGENT_IDS.find((id) => !exhaustedSet.has(id)) || AGENT_IDS[0];
  currentActiveAgent = fallback;
  return fallback;
}

export async function GET() {
  const now = Date.now();
  if (now - lastCheckTime < CACHE_DURATION_MS && !exhaustedSet.has(currentActiveAgent)) {
    return NextResponse.json({
      agentId: currentActiveAgent,
      poolSize: AGENT_IDS.length,
      cached: true,
    });
  }

  const healthyAgent = await getNextHealthyAgent();
  return NextResponse.json({
    agentId: healthyAgent,
    poolSize: AGENT_IDS.length,
    cached: false,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const reportedId = body?.reportExhausted;
    if (reportedId && typeof reportedId === 'string') {
      exhaustedSet.add(reportedId);
      healthCache.set(reportedId, { healthy: false, timestamp: Date.now() });
      const nextAgent = await getNextHealthyAgent(reportedId);
      return NextResponse.json({
        agentId: nextAgent,
        previousExhausted: reportedId,
        success: true,
      });
    }
  } catch {}

  const nextAgent = await getNextHealthyAgent();
  return NextResponse.json({ agentId: nextAgent });
}
