const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const pokemon = require("./models/pokemon");

const reactViewsEngine = require("jsx-view-engine").createEngine();
app.engine("jsx", reactViewsEngine);
app.set("view engine", "jsx");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log("Middlware is running...");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.get("/pokemon", (req, res) => {
  res.render("Index", { pokemon });
});

app.get("/pokemon/new", (req, res) => {
  res.render("New");
});

app.post("/pokemon", (req, res) => {
  pokemon.push(req.body);
  res.redirect("pokemon");
});

app.get("/pokemon/:id", (req, res) => {
  // res.send(req.params.id);
  res.render("Show", {
    pokemon: pokemon[req.params.id],
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
