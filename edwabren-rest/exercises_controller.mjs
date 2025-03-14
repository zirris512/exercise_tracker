import "dotenv/config";
import cors from "cors";
import { connect } from "./db.mjs";
import express from "express";
import router from "./exercises_routes.mjs";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/exercises", router);

app.listen(PORT, async () => {
	await connect();
	console.log(`Server listening on port: ${PORT}`);
});
