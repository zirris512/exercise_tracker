import ExerciseRow from "./ExerciseRow";
import { useState, useEffect } from "react";

export default function ExerciseTable({ exercises }) {
	return (
		<table>
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
					<ExerciseRow key={exercise._id} {...exercise} />
				))}
			</tbody>
		</table>
	);
}
