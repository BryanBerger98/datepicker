import './App.css'
import MultiMonthsCalendarDemo from './components/Demo/MultiMonthsCalendarDemo';
import MultiSelectCalendarDemo from './components/Demo/MultiSelectCalendarDemo';
import RangeCalendarDemo from './components/Demo/RangeCalendarDemo';
import SimpleCalendarDemo from './components/Demo/SimpleCalendarDemo';

function App() {

  return (
	<>
		<div className="flex flex-col gap-8 p-8">
			<h1 className="text-2xl font-bold">Datepicker</h1>
			<div className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Simple calendar</h2>
				<div className="flex">
					<SimpleCalendarDemo />
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Multi months calendar</h2>
				<div className="flex">
					<MultiMonthsCalendarDemo />
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Multi dates selection calendar</h2>
				<div className="flex">
					<MultiSelectCalendarDemo />
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Range selection calendar</h2>
				<div className="flex">
					<RangeCalendarDemo />
				</div>
			</div>
		</div>
	</>
  )
}

export default App
