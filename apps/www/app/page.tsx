import { cn } from '@/utils/ui.util';
import Link from 'next/link';

import DisabledCalendar from '@/components/DisabledCalendar';
import GitHubIcon from '@/components/icons/github';
import LogoIcon from '@/components/icons/logo';
import MultipleDatesSelectionCalendar from '@/components/MultipleDatesSelectionCalendar';
import MultipleMonthsCalendar from '@/components/MultipleMonthsCalendar';
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header';
import RangeSelectionCalendar from '@/components/RangeSelectionCalendar';
import SimpleDatePicker from '@/components/SimpleDatePicker';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const Home = () => {
	return (
		<div className="container relative">
			<PageHeader>
				{ /* <Announcement /> */ }
				<LogoIcon size={ 64 } />
				<PageHeaderHeading>Compose your calendar</PageHeaderHeading>
				<PageHeaderDescription>
					Flexible date picker for React. Composable. Customizable. Open Source.
				</PageHeaderDescription>
				<PageActions>
					<Link
						className={ cn(buttonVariants()) }
						href="/docs"
					>
						Get Started
					</Link>
					<Link
						className={ cn(buttonVariants({ variant: 'outline' })) }
						href={ siteConfig.links.github }
						rel="noreferrer"
						target="_blank"
					>
						<GitHubIcon className="mr-2 h-4 w-4" />
						GitHub
					</Link>
				</PageActions>
			</PageHeader>
			<section className="flex flex-wrap justify-center pt-8 pb-4 w-full gap-8">
				<SimpleDatePicker />
				<MultipleMonthsCalendar />
			</section>
			<section className="flex flex-wrap justify-center pb-8 w-full gap-8">
				<MultipleDatesSelectionCalendar />
				<RangeSelectionCalendar />
				<DisabledCalendar />
			</section>
		</div>
	);
};

export default Home;