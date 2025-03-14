import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditExercisePage from "./pages/EditExercisePage";

function App() {
	const [exercises, setExercises] = useState([]);

	const fetchExercises = async () => {
		const response = await fetch("/exercises");
		const data = await response.json();
		setExercises(data);
	};

	const handleSetExercises = (newExercises) => {
		setExercises(newExercises);
	};

	useEffect(() => {
		fetchExercises();
	}, []);

	return (
		<div className="app">
			<Router>
				<Routes>
					<Route
						path="/"
						element={<HomePage exercises={exercises} setExercises={handleSetExercises} />}
					></Route>
					<Route
						path="/edit_exercise"
						element={<EditExercisePage setExercises={handleSetExercises} />}
					></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
