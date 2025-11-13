import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Pasan Abeysekara | Software Engineer'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20 }}>
          Pasan Abeysekara
        </div>
        <div style={{ fontSize: 36 }}>
          Software Engineer
        </div>
        <div style={{ fontSize: 24, marginTop: 20 }}>
          Full-Stack Developer | DevOps Enthusiast | Scalable Systems Advocate
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}