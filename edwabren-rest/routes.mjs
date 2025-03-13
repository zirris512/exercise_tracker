import express from "express";
import asyncHandler from "express-async-handler";
import * as exercises from "./exercises_model.mjs";

const router = express.Router();

router.post(
	"/",
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

router.get(
	"/",
	asyncHandler(async (_, res) => {
		const result = await exercises.getExercises();
		res.json(result);
	})
);

router.get(
	"//:id",
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

router.put(
	"/:id",
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

router.delete(
	"/:id",
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

export default router;
