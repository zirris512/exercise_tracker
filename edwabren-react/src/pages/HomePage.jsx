import { useEffect } from "react";
import { Link } from "react-router-dom";
import ExerciseTable from "../components/ExerciseTable";

function HomePage({ exercises, setExercises }) {
	return (
		<>
			<h2>List of Exercises</h2>
			<Link to={"/add_exercise"}>Create Exercise</Link>
			<ExerciseTable exercises={exercises} setExercises={setExercises} />
		</>
	);
}

export default HomePage;
