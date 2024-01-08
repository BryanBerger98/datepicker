'use client';

import { cn } from '@/utils/ui.util';
import { Menu } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, ReactNode, useState } from 'react';

import { docsConfig } from '@/config/docs';
import { siteConfig } from '@/config/site';

import LogoIcon from '../icons/logo';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void
	children: ReactNode
	className?: string
  }
  
const MobileLink = ({ href, onOpenChange, className, children, ...props }: MobileLinkProps) => {
	const router = useRouter();
	return (
		<Link
			className={ cn(className) }
			href={ href }
			onClick={ () => {
				router.push(href.toString());
				onOpenChange?.(false);
			} }
			{ ...props }
		>
			{ children }
		</Link>
	);
};

export const MobileNav = () => {
	const [ open, setOpen ] = useState(false);

	return (
		<Sheet
			open={ open }
			onOpenChange={ setOpen }
		>
			<SheetTrigger asChild>
				<Button
					className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
					variant="ghost"
				>
					<Menu className="h-4 w-4" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				className="pr-0"
				side="left"
			>
				<MobileLink
					className="flex items-center"
					href="/"
					onOpenChange={ setOpen }
				>
					<LogoIcon className="mr-2 h-4 w-4" />
					<span className="font-bold">{ siteConfig.name }</span>
				</MobileLink>
				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="flex flex-col space-y-3">
						{ docsConfig.mainNav?.map(
							(item) =>
								item.href && (
									<MobileLink
										key={ item.href }
										href={ item.href }
										onOpenChange={ setOpen }
									>
										{ item.title }
									</MobileLink>
								)
						) }
					</div>
					<div className="flex flex-col space-y-2">
						{ docsConfig.sidebarNav.map((item, index) => (
							<div
								key={ index }
								className="flex flex-col space-y-3 pt-6"
							>
								<h4 className="font-medium">{ item.title }</h4>
								{ item?.items?.length ? item.items.map((item) => (
									<Fragment key={ item.href }>
										{
											!item.disabled && ( item.href ? (
												<MobileLink
													className="text-muted-foreground"
													href={ item.href }
													onOpenChange={ setOpen }
												>
													{ item.title }
													{
														item.label ?
															<span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
																{ item.label }
															</span>
															: null
													}
												</MobileLink>
											) : (
												item.title
											))
										}
									</Fragment>
								)) : null }
							</div>
						)) }
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};