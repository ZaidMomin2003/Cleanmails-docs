/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/docs',
  async headers() {
    const isVercelPreview = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_URL?.includes('.vercel.app')
    if (isVercelPreview) {
      return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]
    }
    return []
  },
}
module.exports = nextConfig
