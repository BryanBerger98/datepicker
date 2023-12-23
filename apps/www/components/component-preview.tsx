'use client';

import { cn } from '@/utils/ui.util';
import { Loader2 } from 'lucide-react';
import * as React from 'react';


import { CopyButton, CopyWithClassNames } from '@/components/copy-button';
import { Tabs,
	TabsContent,
	TabsList,
	TabsTrigger } from '@/components/ui/tabs';

import { CalendarExamples } from './examples';

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: 'center' | 'start' | 'end'
}

export const ComponentPreview = ({ name,
	children,
	className,
	// extractClassname,
	extractedClassNames,
	align = 'center',
	...props }: ComponentPreviewProps) => {

	const Codes = React.Children.toArray(children) as React.ReactElement[];
	const [ Code ] = Codes;

	const Preview = React.useMemo(() => {
		const Component = CalendarExamples[ name ]?.component;

		if (!Component) {
			return (
				<p className="text-sm text-muted-foreground">
					Component{ ' ' }
					<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
						{ name }
					</code>{ ' ' }
					not found in registry.
				</p>
			);
		}

		return <Component />;
	}, [ name ]);

	const codeString = React.useMemo(() => {
		if (
			typeof Code?.props[ 'data-rehype-pretty-code-fragment' ] !== 'undefined'
		) {
			const [ , Button ] = React.Children.toArray(
				Code.props.children
			) as React.ReactElement[];
			return Button?.props?.value || Button?.props?.__rawString__ || null;
		}
	}, [ Code ]);

	return (
		<div
			className={ cn('group relative my-4 flex flex-col space-y-2', className) }
			{ ...props }
		>
			<Tabs
				className="relative mr-auto w-full"
				defaultValue="preview"
			>
				<div className="flex items-center justify-between pb-3">
					<TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
						<TabsTrigger
							className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
							value="preview"
						>
							Preview
						</TabsTrigger>
						<TabsTrigger
							className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
							value="code"
						>
							Code
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent
					className="relative rounded-md border"
					value="preview"
				>
					<div className="flex items-center justify-between p-4">
						{ extractedClassNames ? (
							<CopyWithClassNames
								classNames={ extractedClassNames }
								value={ codeString }
							/>
						) : (
							codeString && <CopyButton value={ codeString } />
						) }
					</div>
					<div
						className={ cn(
							'preview flex min-h-[350px] w-full justify-center p-10',
							{
								'items-center': align === 'center',
								'items-start': align === 'start',
								'items-end': align === 'end',
							}
						) }
					>
						<React.Suspense
							fallback={
								<div className="flex items-center text-sm text-muted-foreground">
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Loading...
								</div>
							}
						>
							{ Preview }
						</React.Suspense>
					</div>
				</TabsContent>
				<TabsContent value="code">
					<div className="flex flex-col space-y-4">
						<div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
							{ Code }
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};