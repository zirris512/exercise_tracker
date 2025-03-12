import "dotenv/config";
import * as exercises from "./exercises_model.mjs";
import asyncHandler from "express-async-handler";
import express from "express";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.listen(PORT, async () => {
	await exercises.connect(false);
	console.log(`Server listening on port: ${PORT}`);
});

app.post(
	"/exercises",
	asyncHandler(async (req, res) => {
		const newExercise = req.body;
		const result = await exercises.createExercise(newExercise);
		if ("Error" in result) {
			res.status(400).json(result);
		} else {
			res.status(201).json(result);
		}
	})
);

app.get(
	"/exercises",
	asyncHandler(async (req, res) => {
		const result = await exercises.getExercises();
		res.json(result);
	})
);
