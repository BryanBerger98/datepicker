import '@/app/mdx.css';

import { cn } from '@/utils/ui.util';
import { ChevronRightIcon, ExternalLinkIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

import { allDocs } from '@/.contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { badgeVariants } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardTableOfContents } from '@/components/ui/toc';
import { siteConfig } from '@/config/site';
import { getTableOfContents } from '@/lib/toc';
import { absoluteUrl } from '@/utils';

interface DocPageProps {
  params: {
    slug: string[]
  }
}

const getDocFromParams = async ({ params }: DocPageProps) => {
	const slug = params.slug?.join('/') || '';
	const doc = allDocs.find((doc) => doc.slugAsParams === slug);

	if (!doc) {
		return null;
	}

	return doc;
};

export const generateMetadata = async ({ params }: DocPageProps): Promise<Metadata> => {
	const doc = await getDocFromParams({ params });

	if (!doc) {
		return {};
	}

	return {
		title: doc.title,
		description: doc.description,
		authors: {
			name: 'Bryan Berger',
			url: 'https://bryanberger.dev', 
		},
		creator: 'Bryan Berger',
		openGraph: {
			title: doc.title,
			description: doc.description,
			type: 'article',
			url: absoluteUrl(doc.slug),
			images: [
				{
					url: siteConfig.ogImage,
					width: 1200,
					height: 630,
					alt: siteConfig.name,
				},
			],
		},
	};
};

export const generateStaticParams = async (): Promise<DocPageProps['params'][]> => {
	return allDocs.map((doc) => ({ slug: doc.slugAsParams.split('/') }));
};

const DocPage = async ({ params }: DocPageProps) => {
	const doc = await getDocFromParams({ params });

	if (!doc) {
		notFound();
	}

	const toc = await getTableOfContents(doc.body.raw);

	return (
		<main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
			<div className="mx-auto w-full min-w-0">
				<div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
					<div className="overflow-hidden text-ellipsis whitespace-nowrap">
						Docs
					</div>
					<ChevronRightIcon className="h-4 w-4" />
					<div className="font-medium text-foreground">{ doc.title }</div>
				</div>
				<div className="space-y-2">
					<h1 className={ cn('scroll-m-20 text-4xl font-bold tracking-tight') }>
						{ doc.title }
					</h1>
					{ 
						doc.description ? 
							<p className="text-lg text-muted-foreground">
								<Balancer>{ doc.description }</Balancer>
							</p> 
							: null 
					}
				</div>
				{ doc.links ? (
					<div className="flex items-center space-x-2 pt-4">
						{
							doc.links?.doc ?
								<Link
									className={ cn(badgeVariants({ variant: 'secondary' }), 'gap-1') }
									href={ doc.links.doc }
									rel="noreferrer"
									target="_blank"
								>
									Docs
									<ExternalLinkIcon className="h-3 w-3" />
								</Link>
								: null
						}
						{
							doc.links?.api ?
								<Link
									className={ cn(badgeVariants({ variant: 'secondary' }), 'gap-1') }
									href={ doc.links.api }
									rel="noreferrer"
									target="_blank"
								>
									API Reference
									<ExternalLinkIcon className="h-3 w-3" />
								</Link>
								: null
						}
					</div>
				) : null }
				<div className="pb-12 pt-8">
					<Mdx code={ doc.body.code } />
				</div>
			</div>
			{
				doc.toc ?
					<div className="hidden text-sm xl:block">
						<div className="sticky top-16 -mt-10 pt-4">
							<ScrollArea className="pb-10">
								<div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
									<DashboardTableOfContents toc={ toc } />
								</div>
							</ScrollArea>
						</div>
					</div>
					: null
			}
		</main>
	);
};

export default DocPage;