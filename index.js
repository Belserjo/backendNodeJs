const express = require("express");
const {
  addNote,
  getNotes,
  removeNote,
  editeNote,
} = require("./notes.controller");
const path = require("path");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    create: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    create: true,
  });
});

app.delete("/:id", async (req, res) => {
  console.log("id", req.params.id);
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    create: false,
  });
});

app.put("/:id/:data", async (req, res) => {
  console.log("id", req.params.id, "data", req.params.data);
  await editeNote(req.params.id, req.params.data);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    create: false,
  });
});

app.listen(port, () => {
  console.log(`Server start on ${port} port`);
});
