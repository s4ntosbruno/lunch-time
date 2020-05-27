exports.up = function (knex) {
  return knex.schema.createTable("places", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.integer("votes");
    table.boolean("weekWinner").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("places");
};
