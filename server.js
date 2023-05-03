require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { connect, connection } = require("mongoose");
const Pokemon = require("./models/Pokemon");

// Database connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection.once("open", () => {
  console.log("Connected to Mongo");
});

// View Engine Middleware Configure
const reactViewsEngine = require("jsx-view-engine").createEngine();
app.engine("jsx", reactViewsEngine);
app.set("view engine", "jsx");
app.set("views", "./views");

// Custom Middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log("Middlware is running...");
  next();
});

// I.N.D.U.C.E.S

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

// Index
app.get("/pokemon", async (req, res) => {
  try {
    const foundPokemon = await Pokemon.find({});
    res.status(200).render("Index", { pokemon: foundPokemon });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New
app.get("/pokemon/new", (req, res) => {
  res.render("New");
});

// Create
app.post("/pokemon", async (req, res) => {
  try {
    const newPokemon = await Pokemon.create(req.body);
    req.body.img = `http://img.pokemondb.net/artwork/${req.body.name}`;
    // pokemon.push(req.body);

    res.redirect("pokemon");
  } catch (err) {
    res.status(400).send(err);
  }
});

// Show
app.get("/pokemon/:id", async (req, res) => {
  try {
    const foundPokemon = await Pokemon.findById(req.params.id);
    res.render("Show", {
      // pokemon: pokemon[req.params.id],
      pokemon: foundPokemon,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
