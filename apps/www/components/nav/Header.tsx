'use client';

import { cn } from '@/utils/ui.util';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { docsConfig } from '@/config/docs';

import Icons from '../icons';

import DesktopNav from './DesktopNav';
import { MobileNav } from './MobileNav';


const Header = () => {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<DesktopNav />
				<MobileNav />
				<nav className="flex items-center ml-auto gap-4">
					{
						docsConfig.mainNav.filter((item) => item.external).map((item) => item.href ? (
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
								{ item.icon ? Icons[ item.icon ] : item.title }
							</Link>
						) : null)
					}
				</nav>
			</div>
		</header>
	);
};

export default Header;