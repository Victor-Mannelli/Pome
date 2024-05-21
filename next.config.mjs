/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
		return [
			{
				source: "/",
				destination: "/home",
			},
		];
	},
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
