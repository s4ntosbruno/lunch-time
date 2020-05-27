const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const users = await connection("users").select("*");

    return response.json(users);
  },

  async create(request, response) {
    const { name } = request.body;
    const hasVoted = false;
    const id = crypto.randomBytes(4).toString("HEX");

    await connection("users").insert({
      id,
      name,
      hasVoted,
    });

    return response.json({ id });
  },

  async vote(request, response) {
    const user_id = request.headers.authorization;
    await connection("users")
      .where({ id: user_id })
      .update({ hasVoted: true, thisKeyIsSkipped: undefined });

    return response.json({ user_id });
  },

  async resetAllVotes(request, response) {
    await connection("users").update({ hasVoted: false });

    return response.json();
  },

  async delete(request, response) {
    const { id } = request.params;
    await connection("users").where("id", id).delete();

    return response.json(id);
  },
};
