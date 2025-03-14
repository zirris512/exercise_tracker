import { FaX, FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function ExerciseRow({ _id, name, reps, weight, unit, date, setExercises }) {
	const navigate = useNavigate();

	const deleteExercise = async (id) => {
		const response = await fetch(`/exercises/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			setExercises((prevExercises) => prevExercises.filter((exercise) => exercise._id !== id));
		} else {
			const err = await response.json();
			alert(err.Error);
		}
	};

	const navigateToEditPage = () => {
		navigate("/edit_exercise", {
			state: { _id, name, reps, weight, unit, date, setExercises },
		});
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
				<button onClick={navigateToEditPage}>
					<FaPencil />
				</button>
			</td>
		</tr>
	);
}
