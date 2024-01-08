'use client';

import { cn } from '@/utils/ui.util';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { docsConfig } from '@/config/docs';
import { siteConfig } from '@/config/site';

import LogoIcon from '../icons/logo';

const DesktopNav = () => {
	const pathname = usePathname();

	return (
		<div className="mr-4 hidden md:flex w-full">
			<Link
				className="mr-6 flex items-center space-x-2"
				href="/"
			>
				<LogoIcon />
				<span className="hidden font-bold sm:inline-block">
					{ siteConfig.name }
				</span>
			</Link>
			<nav className="flex items-center gap-6 text-sm">
				{
					docsConfig.mainNav.filter((item) => !item.external).map((item) => item.href ? (
						<Link
							key={ item.href }
							aria-disabled={ item.disabled }
							className={ cn(
								'transition-colors hover:text-foreground/80 [aria-disabled=true]:text-foreground/50 [aria-disabled=true]:hover:text-foreground/50 [aria-disabled=true]:pointer-events-none',
								pathname?.startsWith(item.href)
									? 'text-foreground'
									: 'text-foreground/60'
							) }
							href={ item.href }
						>
							{ item.title }
						</Link>
					) : null)
				}
			</nav>
		</div>
	);
};

export default DesktopNav;