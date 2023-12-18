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
                hostname: "https://hippomarket-2pb0yka2j-muvias.vercel.app"
            }
        ]
    }
}

module.exports = nextConfig
