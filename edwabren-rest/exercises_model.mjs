import { connect, createModel } from "./db.mjs";

const Exercises = createModel();

const ERROR_INVALID_REQUEST = { Error: "Invalid request", status: 400 };
const ERROR_NOT_FOUND = { Error: "Not found", status: 404 };

function checkValidity(exercises) {
	const { name, reps, weight, unit, date } = exercises;
	if (typeof name !== "string" || name.length === 0) {
		return false;
	}
	if (typeof reps !== "number" || reps < 1) {
		return false;
	}
	if (typeof weight !== "number" || weight < 1) {
		return false;
	}
	if (unit !== "lbs" && unit !== "kgs") {
		return false;
	}
	const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{2}$/;
	if (!dateRegex.test(date)) {
		return false;
	}
	const dateArray = date.split("-");
	const month = parseInt(dateArray[0]);
	const day = parseInt(dateArray[1]);
	const year = parseInt(dateArray[2]) + 2000;

	if (month == 2) {
		const isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
		if (isLeapYear) {
			return day <= 29;
		} else {
			return day <= 28;
		}
	}
	return true;
}

async function createExercise(exercises) {
	if (!checkValidity(exercises)) {
		return ERROR_INVALID_REQUEST;
	}
	const newExercise = new Exercises(exercises);
	try {
		const response = await newExercise.save();
		return response;
	} catch (err) {
		console.error(err._message);
		return ERROR_INVALID_REQUEST;
	}
}

function getExercises() {
	return Exercises.find({});
}

async function getExercise(id) {
	const foundExercise = await Exercises.findById(id);
	if (foundExercise === null) {
		return ERROR_NOT_FOUND;
	}
	return foundExercise;
}

async function updateExercise(id, exercises) {
	if (!checkValidity(exercises)) {
		return ERROR_INVALID_REQUEST;
	}
	const updatedExercise = await Exercises.findByIdAndUpdate(id, exercises, { new: true });
	if (updatedExercise === null) {
		return ERROR_NOT_FOUND;
	}
	return updatedExercise;
}

async function deleteExercise(id) {
	const deletedExercise = await Exercises.findByIdAndDelete(id);
	if (deletedExercise === null) {
		return ERROR_NOT_FOUND;
	}
	return deletedExercise;
}

export { createExercise, getExercises, getExercise, updateExercise, deleteExercise };
