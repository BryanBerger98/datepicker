import './App.css'
import Calendar from './components/Calendar';

function App() {

  return (
	<>
		<div className="flex p-8">
			<Calendar weekStartDay="monday" />
		</div>
	</>
  )
}

export default App
