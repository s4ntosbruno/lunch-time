const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index(request, response) {
    const places = await connection("places").select("*");

    return response.json(places);
  },

  async create(request, response) {
    const { name } = request.body;
    const votes = 0;
    const weekWinner = false;
    const id = crypto.randomBytes(4).toString("HEX");

    await connection("places").insert({
      id,
      name,
      votes,
      weekWinner,
    });

    return response.json({ id });
  },
  async increaseVote(request, response) {
    const place_id = request.headers.authorization;
    await connection("places").where({ id: place_id }).increment("votes", 1);

    return response.json({ place_id });
  },
  async setWeekWinner(request, response) {
    const place_id = request.headers.authorization;
    await connection("places")
      .where({ id: place_id })
      .update({ weekWinner: true });

    return response.json({ place_id });
  },

  async resetAllWeekWinners(request, response) {
    await connection("places").update({ weekWinner: false });
    return response.json();
  },
};
