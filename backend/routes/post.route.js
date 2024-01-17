const Router = require("express").Router;
const postModel = require("../models/post.model");
const post = Router();

const bodyNotEmpty = (obj) => {
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === "string" &&
      obj[key].trim() === ""
    ) {
      return false;
    }
  }
  return true;
};

post.get("/", async (req, res) => {
  const result = await postModel.findAll();
  res.json(result);
});

post.get("/:id", async (req, res) => {
  const result = await postModel.findById(req.params.id);
  res.json(result);
});

post.post("/", async (req, res) => {
  if (!bodyNotEmpty(req.body)) {
    res.status(401).send("Body is missing parameters");
  }
  const result = await postModel.create(req.body);
  res.json(result);
});

post.put("/:id", async (req, res) => {
  if (!bodyNotEmpty(req.body)) {
    res.status(401).send("Body is missing parameters");
  }
  const result = await postModel.findByIdAndUpdate(req.params.id, req.body);
  res.json(result);
});

post.delete("/:id", async (req, res) => {
  const result = await postModel.findByIdAndDelete(req.params.id);
  res.json(result);
});

module.exports = post;
