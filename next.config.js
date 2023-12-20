/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                pathname: "**",
                port: "3000",
                protocol: 'http'
            },
            {
                protocol: 'https',
                hostname: "hippomarket-production.up.railway.app"
            }
        ]
    }
}

module.exports = nextConfig
