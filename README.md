# SubwayLocations

## Project stack:

-   Nest.js
-   GraphQL
-   Prisma

## For running the project

> docker compose up -d
> npx prisma migrate dev
> npm run seed

## For running the tests

> npm test

## Graphql testing:

First open the graphql palyground: http://localhost:3000/graphql

Available functions:
getStores(page: number , perPage: number)
