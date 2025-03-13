import ExerciseRow from "./ExerciseRow";

export default function ExerciseTable({ exercises, setExercises }) {
	return (
		<table className="exercise-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Reps</th>
					<th>Weight</th>
					<th>Unit</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{exercises.map((exercise) => (
					<ExerciseRow key={exercise._id} {...exercise} setExercises={setExercises} />
				))}
			</tbody>
		</table>
	);
}
