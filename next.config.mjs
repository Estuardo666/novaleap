/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
		],
	},
	async headers() {
		return [
			{
				// Prevent CDN from caching HTML pages for a year after deploys
				source: "/((?!_next/static|_next/image|icon\\.png|favicon\\.ico).*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=0, s-maxage=60, stale-while-revalidate=30",
					},
				],
			},
		];
	},
};

export default nextConfig;
