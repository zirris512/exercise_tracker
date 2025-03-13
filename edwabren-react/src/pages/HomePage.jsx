import { useEffect, useState } from "react";
import ExerciseTable from "../components/ExerciseTable";

function HomePage() {
	const [exercises, setExercises] = useState([]);

	const fetchExercises = async () => {
		const response = await fetch("http://localhost:3000/exercises");
		const data = await response.json();
		setExercises(data);
	};

	useEffect(() => {
		fetchExercises();
	}, [exercises]);

	return (
		<>
			<h2>List of Exercises</h2>
			<ExerciseTable exercises={exercises} />
		</>
	);
}

export default HomePage;
