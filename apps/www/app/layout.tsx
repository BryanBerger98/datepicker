import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import Footer from '@/components/nav/Footer';
import Header from '@/components/nav/Header';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${ siteConfig.name }`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: [
		'Datepicker',
		'Next.js',
		'React',
		'Tailwind CSS',
		'Composition',
	],
	authors: [
		{
			name: 'Bryan Berger',
			url: 'https://bryanberger.dev',
		},
	],
	creator: 'Bryan Berger',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	manifest: `${ siteConfig.url }/site.webmanifest`,
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<div className="relative flex min-h-screen flex-col bg-background">
					<Header />
					<main className="flex-1">{ children }</main>
					<Footer />
				</div>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
};

export default RootLayout;
