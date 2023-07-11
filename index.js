const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3002;
const mongoose = require("mongoose");
const cors = require("cors");
const obj = require("./models/object");

// const URL = `mongodb+srv://${process.env.UID}:${process.env.PASSWORD}@cluster0.vpid4.mongodb.net/?retryWrites=true&w=majority`;

const URL = `mongodb+srv://houserent:houserent@cluster0.vpid4.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(
	URL,
	() => console.log("connected"),
	(err) => console.log(err),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Listining at port ${PORT}`));

app.get("/", async (req, res) => {
	res.json("Welcome to the Object api 🔥");
});

async function createObjData(data) {
	try {
		const res = await obj.create(data);
		return { error: null, response: res };
	} catch (error) {
		console.log(error.message);
		return { error: error?.message, response: null };
	}
}
// app.get("/house/list", async (req, res) => {
// 	const result = await house.find({});
// 	return res.status(200).json(result);
// });

app.get("/obj/list", async (req, res) => {
	try {
		const result = await obj.find({}).sort({ _id: -1 });
		return res.status(200).json(result);
	} catch (error) {
		return res
			.status(500)
			.json({ error: "An error occurred while retrieving the house list." });
	}
});

app.get("/obj/:id", async (req, res) => {
	var result = await obj.findById(req.params.id);
	res.status(200).json(result);
});

app.post("/obj", async (req, res) => {
	const { error, response } = await createObjData(req.body);
	if (error) return res.status(400).json(error);
	return res.status(200).json(response);
});

app.post("/obj/:id", async (req, res) => {
	const { id } = req.params;
	const updateData = req.body;

	try {
		const updatedObj = await obj.findByIdAndUpdate(id, updateData, {
			new: true,
		});

		if (!updatedObj) {
			return res.status(404).json({ error: "Obj not found." });
		}

		return res.status(200).json(updatedObj);
	} catch (error) {
		return res
			.status(500)
			.json({ error: "An error occurred while updating the Obj." });
	}
});
