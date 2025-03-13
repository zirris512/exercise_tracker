export default function ExerciseRow({ name, reps, weight, unit, date }) {
	return (
		<tr>
			<td>{name}</td>
			<td>{reps}</td>
			<td>{weight}</td>
			<td>{unit}</td>
			<td>{date}</td>
		</tr>
	);
}
