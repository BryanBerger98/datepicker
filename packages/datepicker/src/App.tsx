import DisabledCalendarDemo from './components/Demo/DisabledCalendarDemo';
import MultiMonthsCalendarDemo from './components/Demo/MultiMonthsCalendarDemo';
import MultiSelectCalendarDemo from './components/Demo/MultiSelectCalendarDemo';
import RangeCalendarDemo from './components/Demo/RangeCalendarDemo';
import SimpleCalendarDemo from './components/Demo/SimpleCalendarDemo';

const App = () => {

	return (
		<>
			<div className="flex flex-col gap-8 p-8 w-screen">
				<h1 className="text-2xl font-bold text-center">Datepicker</h1>
				<div className="flex gap-8 mx-auto flex-wrap">
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
				</div>
				<div className="flex flex-wrap mx-auto gap-8">
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
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-semibold">Disabled calendar</h2>
						<div className="flex">
							<DisabledCalendarDemo />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
