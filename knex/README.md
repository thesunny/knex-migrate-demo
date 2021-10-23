# Knex ReadMe

Before starting, probably should delete the sample `migrations/...ts` file

## Setup

### Install dependencies

```sh
# add dev dependencies
yarn add --dev knex npm-run-all pg ts-node tsconfig-paths typescript @types/node @types/jest
# add dependencies
yarn add dotenv
```

### Setup files

- Copy `knexfile.ts` to root
- Copy `knex` dir
- Delete sample `migrations` and `seeds` most likely
- Make sure `.env/dev.env` has a `DATABASE_URL` or modify `knextfile.ts` to reference the db
- Copy the `package.json` scripts section related to `knex`

## IMPORTANT! Design decisions.

- `knexfile.ts` needs to be in root or the working directory changes and adding `--cwd` to change it doesn't work.
- `knex/tsconfig.json` has to be above `migrations` so that the migration files see the correct tsconfig file.

## IMPORTANT! Database/schema naming

- For some reason, Datagrip doesn't play well unless we give the `database` a unique name and then make the `schema=public` when specifying the URL. Just make `schema=public` when we first create the db using DataGrip and then we don't need to specify it in the `DATABASE_URL` as it defaults to that.

## Migrations

- Create a `.env/dev.env` file and seed it with a `DATABASE_URL` that looks something like `postgresql://postgres:password@db-name.cluster-xxxxxxxxxxxx.us-east-1.rds.amazonaws.com:5432/name-of-db`

- `yarn migrate:make name_of_migration` to create a new migration using the stub at `knex/migration.stub`
- `yarn migrate:list` to list all migrations including which ones have and have not yet been run
- `yarn migrate:up` to migrate up one migration
- `yarn migrate:down` to migrate down one migration
- `yarn migrate:latest` to migrate all migrations up to most recent
- `yarn migrate:down` to migrate back all the migrations in the previous run
- `yarn migrate:zero` to migrate back all the migrations
- `yarn migrate:remigrate` to migrate back to zero and then up to latest
