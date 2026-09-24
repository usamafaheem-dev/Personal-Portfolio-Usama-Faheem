import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Usama Faheem — MERN Stack & Frontend Developer in Lahore';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const avatar = await readFile(join(process.cwd(), 'public/usaam_emoji.png'));
  const avatarSrc = `data:image/png;base64,${avatar.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 90px',
          background: '#0f172a',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 700 }}>
          <div style={{ fontSize: 28, color: '#d8ff00', letterSpacing: 4, fontWeight: 700 }}>
            USAMAFAHEEM.COM
          </div>
          <div style={{ fontSize: 88, fontWeight: 800, marginTop: 20, lineHeight: 1 }}>Usama Faheem</div>
          <div style={{ fontSize: 40, marginTop: 28, color: '#e2e8f0' }}>MERN Stack & Frontend Developer</div>
          <div style={{ fontSize: 30, marginTop: 16, color: '#94a3b8' }}>Lahore, Pakistan · React · Next.js · Node.js</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarSrc} width={330} height={398} alt="" />
      </div>
    ),
    { ...size }
  );
}
