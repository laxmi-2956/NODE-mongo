const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/Todolist").then(() => {
  console.log("connected");
}).catch((err) => {
  console.error("errorr:", err);
});

const TaskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});
const Task = mongoose.model("Task", TaskSchema);

app.get("/product", async (req, res) => {
  const products = await Task.find();
  res.json(products);
});

app.post("/product", async (req, res) => {
  const { text } = req.body;
  const productnew = new Task({ text, completed: false });
  await productnew.save();
  res.json(productnew);
});

app.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  const productid = await Task.findById(id);
  productid.completed = !productid.completed;
  await productid.save();
  res.json(productid);
});

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  await productsave.findByIdAndDelete(id);
  res.json({ message: "Task deleted" });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));