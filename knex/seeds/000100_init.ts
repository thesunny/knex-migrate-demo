import { Knex } from "knex";
export async function seed(knex: Knex) {
  await knex("things").del();
  // do stuff, probably with Prisma which is what we are using for the ORM
}
