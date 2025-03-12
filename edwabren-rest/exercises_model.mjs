// Get the mongoose object
import mongoose from "mongoose";
import "dotenv/config";

let Exercises;

const EXERCISES_CLASS = "Exercises";
const ERROR_NOT_FOUND = { Error: "Invalid request" };

/**
 * This function connects to the MongoDB server.
 */
async function connect() {
	try {
		await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
			dbName: "exercises",
		});
		Exercises = createModel();
		console.log("Successfully connected to MongoDB using Mongoose!");
	} catch (err) {
		console.log(err);
		throw Error(`Could not connect to MongoDB ${err.message}`);
	}
}

function createModel() {
	const exercisesSchema = new mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
		reps: {
			type: Number,
			required: true,
			min: [1, "Must be greater than 0"],
		},
		weight: {
			type: Number,
			required: true,
			min: [1, "Must be greater than 0"],
		},
		unit: {
			type: String,
			required: true,
			enum: ["lbs", "kgs"],
		},
		date: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{2}$/;
					if (!dateRegex.test(v)) {
						return false;
					}

					const dateArray = v.split("-");
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
				},
				message: (props) => `${props.value} is not a valid date!`,
			},
		},
	});

	return mongoose.model(EXERCISES_CLASS, exercisesSchema);
}

async function createExercise(exercises) {
	const newExercise = new Exercises(exercises);
	try {
		const response = await newExercise.save();
		return response;
	} catch (err) {
		console.error(err._message);
		return ERROR_NOT_FOUND;
	}
}

function getExercises() {
	return Exercises.find({});
}

export { connect, createExercise, getExercises };
