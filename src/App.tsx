import './App.css'
import Calendar from './components/Calendar';
import { cn } from './utils/ui.util';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {

  return (
	<>
		<div className="flex p-8">
			<Calendar weekStartDay="monday" className="rounded-md border p-3">
				<Calendar.Header className="relative">
					<Calendar.Title />
					<div className="space-x-1 flex items-center">
						<Calendar.NavButton direction="previous" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1">
							<ChevronLeft className="h-4 w-4" />
						</Calendar.NavButton>
						<Calendar.NavButton direction="next" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1">
							<ChevronRight className="h-4 w-4" />
						</Calendar.NavButton>
					</div>
				</Calendar.Header>
				<Calendar.Content>
					<Calendar.Head />
					<Calendar.Grid
						renderWeeks={ ({ week, index }) => (
							<Calendar.Week
								week={ week }
								key={ index }
								renderWeekDays={ ({ date, index, currentDate, selectedDate }) => (
									<Calendar.WeekDay date={ date } key={ index } buttonClassName={ cn({
										'bg-slate-900': date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate() && date.getFullYear() === selectedDate.getFullYear(),
										'text-slate-300': date.getMonth() !== currentDate.getMonth(),
										'text-white': date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate() && date.getFullYear() === selectedDate.getFullYear(),
									}) } />
								)}
							/>
						) }
					/>
				</Calendar.Content>
			</Calendar>
		</div>
	</>
  )
}

export default App
