const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await loadUsers();
  res.send(await users.find({}).toArray());
});

router.post("/", async (req, res) => {
  const users = await loadUsers();
  await users.insertOne({
    email: req.body.email,
    createdAt: new Date(),
  });
  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  const users = await loadUsers();
  users.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.send(200).send();
});

async function loadUsers() {
  const mongoDbUrl =
    "mongodb+srv://selfstart:selfstart@cluster0-gw7zk.mongodb.net/test?retryWrites=true&w=majority";
  const client = await mongodb.MongoClient.connect(mongoDbUrl, {
    useNewUrlParser: true,
  });
  return client.db("selfstart").collection("users");
}

module.exports = router;
