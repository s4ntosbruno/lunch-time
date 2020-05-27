const express = require("express");
const UserController = require("./controllers/UserController");
const PlaceController = require("./controllers/PlaceController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.create);

routes.get("/users", UserController.index);
routes.post("/users", UserController.create);
routes.delete("users/:id", UserController.delete);
routes.post("/vote", UserController.vote);
routes.post("/resetvotes", UserController.resetAllVotes);

routes.post("/place", PlaceController.create);
routes.get("/place", PlaceController.index);
routes.post("/increasevote", PlaceController.increaseVote);
routes.post("/winner", PlaceController.setWeekWinner);
routes.post("/resetplaces", PlaceController.resetAllWeekWinners);

module.exports = routes;
