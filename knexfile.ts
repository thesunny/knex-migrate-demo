import { Knex } from "knex";
import { config as dotenvConfig } from "dotenv";
import { register as tsConfigPathsRegister } from "tsconfig-paths";

/**
 * NOTE:
 *
 * Do not require local libraries in knex file as the mapping will not work
 * until after this file and `tsconfig-paths` is loaded.
 */

if (!process.env.MYENV) throw new Error(`Expected process.env.MYENV`);

/**
 * Make sure TypeScript can recognize the root paths.
 *
 * NOTE:
 * This might be handled automatically in recent versions of TypeScript
 */

tsConfigPathsRegister({
  baseUrl: "./",
  paths: {
    "~/*": ["*"],
  },
});

/**
 * Load environment using dotenv file at `process.env.MYENV`
 */
dotenvConfig({ path: process.env.MYENV });

if (process.env.DATABASE_URL == null)
  throw new Error("process.env.DATABASE_URL is required");

const knexConfig: Knex.Config = {
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    stub: "knex/migration.stub",
    directory: "knex/migrations",
  },
};

export default knexConfig;
