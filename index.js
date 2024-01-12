const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;

const noteDatas = {};
let id = 1;

// create application/json parser
const jsonParser = bodyParser.json();

app.get("/api/note/:id", function (req, res) {
  try {
    const { id } = req.params;
    // check id exist , if not -> throw error
    if (!id) {
      throw new Error("id is required");
    }
    const { title, content } = noteDatas[id];
    res.send({ status: "success", id, title, content });
  } catch (err) {
    res.send({ status: "failure" });
  }
});

app.post("/api/note", jsonParser, function (req, res) {
  try {
    const { title, content } = req.body;
    // check is title empty , if empty -> throw error
    if (!title) {
      throw new Error("title is required");
    }
    noteDatas[id] = req.body;
    res.send({ status: "success", id });
    id++;
  } catch (err) {
    res.send({ status: "failure" });
  }
});

app.put("/api/note/:id", jsonParser, function (req, res) {
  try {
    const { id } = req.params;
    // check id exist , if not -> throw error
    if (!id) {
      throw new Error("id is required");
    }
    const { title, content } = req.body;
    // check is title empty , if empty -> throw error
    if (!title) {
      throw new Error("title is required");
    }
    noteDatas[id] = req.body;
    res.send({ status: "success" });
  } catch (err) {
    res.send({ status: "failure" });
  }
});

app.delete("/api/note/:id", jsonParser, function (req, res) {
  try {
    const { id } = req.params;
    // check id exist , if not -> throw error
    if (!id) {
      throw new Error("id is required");
    }
    delete noteDatas[id];
    res.send({ status: "success" });
  } catch (err) {
    res.send({ status: "failure" });
  }
});

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
