import { FaX, FaPencil } from "react-icons/fa6";

export default function ExerciseRow({ _id, name, reps, weight, unit, date, setExercises }) {
	const deleteExercise = async (id) => {
		const response = await fetch(`http://localhost:3000/exercises/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			setExercises((prevExercises) => prevExercises.filter((exercise) => exercise._id !== id));
		} else {
			const err = await response.json();
			alert(err.Error);
		}
	};
	return (
		<tr>
			<td>{name}</td>
			<td>{reps}</td>
			<td>{weight}</td>
			<td>{unit}</td>
			<td>{date}</td>
			<td>
				<button onClick={() => deleteExercise(_id)}>
					<FaX color="red" />
				</button>
			</td>
			<td>
				<button>
					<FaPencil />
				</button>
			</td>
		</tr>
	);
}
