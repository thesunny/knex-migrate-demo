import { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("things", function (table) {
    table.increments();
    table.string("name").notNullable().unique();
    table
      .jsonb("body")
      .notNullable()
      .defaultTo(
        JSON.stringify({
          rev: 1,
          blocks: [{ type: "p", children: [{ text: "" }] }],
        })
      );
    table.integer("created_by").notNullable();
    table.integer("updated_by").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
  // await knex.schema.alterTable("", function (table) {
  // })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable("things");
  // await knex.schema.alterTable("", function (table) {
  // })
}
