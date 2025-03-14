import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function EditExercisePage({ setExercises }) {
	const location = useLocation();
	const { _id, name, reps, weight, unit, date } = location.state;

	const [formName, setFormName] = useState(name);
	const [formReps, setFormReps] = useState(reps);
	const [formWeight, setFormWeight] = useState(weight);
	const [formUnit, setFormUnit] = useState(unit);
	const [formDate, setFormDate] = useState(date);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`/exercises/${_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: formName,
				reps: formReps,
				weight: formWeight,
				unit: formUnit,
				date: formDate,
			}),
		});
		if (response.ok) {
			const updatedExercise = await response.json();
			setExercises((prevExercises) =>
				prevExercises.map((exercise) => (exercise._id === _id ? updatedExercise : exercise))
			);
			alert("Exercise updated successfully");
		} else {
			const err = await response.json();
			alert(err.Error);
		}
	};

	return (
		<>
			<h2>Edit Exercise</h2>
			<form id="edit-exercise-form" onSubmit={handleSubmit}>
				<fieldset>
					<legend>Exercise</legend>
					<label htmlFor="exercise-name">Name:</label>
					<input
						type="text"
						id="exercise-name"
						value={formName}
						onChange={(e) => setFormName(e.target.value)}
					/>
					<label htmlFor="exercise-reps">Reps:</label>
					<input
						type="number"
						id="exercise-reps"
						value={formReps}
						onChange={(e) => setFormReps(Number(e.target.value))}
					/>
					<label htmlFor="exercise-weight">Weight:</label>
					<input
						type="number"
						id="exercise-weight"
						value={formWeight}
						onChange={(e) => setFormWeight(Number(e.target.value))}
					/>
					<label htmlFor="exercise-unit">Unit:</label>
					<select id="exercise-unit" value={formUnit} onChange={(e) => setFormUnit(e.target.value)}>
						<option value="lbs">lbs</option>
						<option value="kgs">kgs</option>
					</select>
					<label htmlFor="exercise-date">Date:</label>
					<input
						type="text"
						id="exercise-date"
						value={formDate}
						onChange={(e) => setFormDate(e.target.value)}
					/>
					<button>Save</button>
				</fieldset>
			</form>
		</>
	);
}
