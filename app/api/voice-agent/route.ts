import { NextResponse } from 'next/server';

const AGENT_IDS = [
  'agent_7201m2zwkz4gf0gb1jefce2ac6wp',
  'agent_7601m2zv2rayfxnr3q0mj1s3xwq1',
  'agent_5701m2zvfkwpf6tbcwxd2gbr3d56',
  'agent_9401m2zt1218fee9vf15j6ykam2y',
  'agent_6101m2zvqra0e6ebkbzennsyak2d',
  'agent_9701m2zt455hemjbp84p9yk89dnk',
  'agent_3601m2w6eyzjeyybxv6a6yva3mk0',
  'agent_3901m344jcyjfq4bjqbp0635z595',
];

const INITIAL_EXHAUSTED = [
  'agent_3901m344jcyjfq4bjqbp0635z595',
  'agent_3401m2ztp1svfz7r8b4ejrzf823w',
];

// In-memory server-side cache for current active healthy agent
let currentActiveAgent = AGENT_IDS[0];
let lastCheckTime = 0;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache
const exhaustedSet = new Set<string>(INITIAL_EXHAUSTED);

async function verifyAgentHealth(agentId: string): Promise<boolean> {
  if (exhaustedSet.has(agentId)) return false;

  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}/widget`, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 404 || res.status === 401) {
        exhaustedSet.add(agentId);
      }
      return false;
    }
    const data = await res.json();
    return Boolean(data?.agent_id || data?.widget_config);
  } catch {
    return false;
  }
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

  // Fallback if all check failed
  return AGENT_IDS[0];
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
