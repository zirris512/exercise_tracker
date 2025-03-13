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
			res.status(result.status).json({ Error: result.Error });
		} else {
			res.status(201).json(result);
		}
	})
);

app.get(
	"/exercises",
	asyncHandler(async (_, res) => {
		const result = await exercises.getExercises();
		res.json(result);
	})
);

app.get(
	"/exercises/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const result = await exercises.getExercise(id);
		if ("Error" in result) {
			res.status(result.status).json({ Error: result.Error });
		} else {
			res.json(result);
		}
	})
);

app.put(
	"/exercises/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const updatedExercise = req.body;
		const result = await exercises.updateExercise(id, updatedExercise);
		if ("Error" in result) {
			res.status(result.status).json({ Error: result.Error });
		} else {
			res.json(result);
		}
	})
);

app.delete(
	"/exercises/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const result = await exercises.deleteExercise(id);
		if ("Error" in result) {
			res.status(result.status).json({ Error: result.Error });
		} else {
			res.status(204).json(result);
		}
	})
);
