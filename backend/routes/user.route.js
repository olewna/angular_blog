const Router = require("express").Router;
const userModel = require("../models/user.model");
const user = Router();

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

user.get("/", async (req, res) => {
  const result = await userModel.findAll();
  res.json(result);
});

user.get("/:id", async (req, res) => {
  const result = await userModel.findById(req.params.id);
  res.json(result);
});

user.post("/", async (req, res) => {
  if (!bodyNotEmpty(req.body)) {
    res.status(401).send("Body is missing parameters");
  } else {
    const resu = await userModel.findByLoginOrEmail(
      req.body.login,
      req.body.email
    );
    if (resu.records.length > 0) {
      res.status(401).send("Login lub email zajęty.");
    } else {
      const result = await userModel.create(req.body);
      res.json(result);
    }
  }
});

user.put("/:id", async (req, res) => {
  if (!bodyNotEmpty(req.body)) {
    res.status(401).send("Body is missing parameters");
  } else {
    const result = await userModel.findByLoginOrEmail(
      req.body.login,
      req.body.email
    );
    if (
      result.records.length > 0 &&
      req.body.id !== result.records[0].get("u").properties.id
    ) {
      res.status(401).send("Login lub email zajęty.");
    } else {
      const finalResult = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.json(finalResult);
    }
  }
});

user.delete("/:id", async (req, res) => {
  const result = await userModel.findByIdAndDeleteWithPosts(req.params.id);
  res.json(result);
});

module.exports = user;
