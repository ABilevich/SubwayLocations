# Subway Store Locations

This project contains a **Nest.js** backend that exposes a **GraphQL** API with various methods for querying a database that contains a list of subway store locations, and US states. The database queries are accomplished by using the **Prisma** module.

## Prerequisites

-   having Docker installed, to verify run:

```
docker ps
```

-   having Node.js installed installed, to verify run:

```
node --version
```

## Project Structure

The most important files for the comprehension of the project flow are explained below

**/src/api/api.resolver.ts**
-> Contains the **GraphQL** endpoint definitions and each method calls the stores.service.

**/src/modules.stores/stores.service.ts**
-> Contains the main service methods that execute the business logic and calls the stores.repository.ts

**/src/modules.stores/stores.repository.ts**
-> Contains the logic necessary for accessing the database using a series of parameters to provide pagination and filtering options. This uses the **Prisma** module.

## Running the project

The project can be run by following these commands:

1. First install the necessary npm packages:

```
npm install
```

2. Then create the Docker container that hosts the database (Make sure to have docker running)

```
docker compose up -d
```

3. Then run the migrations to create tha tables

```
npx prisma migrate dev
```

4. The run the seeds to populate the database using the data from the .csv files.

```
npm run seed
```

After this step the project can be run by executing:

```
npm run start:dev
```

Additionally, the database can be inspected using Prisma's web interface by executing: (Cans be seen in http://localhost:5555)

```
npx prisma studio
```

## Running unit and integration tests

The project contains a suit of both unit and integration tests that can be run by executing the command:

```
npm test
```

The **unit** tests are mainly aimed at testing the **stores.service** and the **stores.repository** methods by mocking the methods from **store.repository** and **prisma.service** respectively.

On the other hand, the **integration** tests, assert the correct execution of the **store** and **stores** endpoints from start to finish by calling the GraphQL endpoints and verifying the return.

## Testing the endpoints on the GraphQL playground

After the project starts, a GraphQL playground can be accessed by following the link: http://localhost:3000/graphql. Here, a variety of endpoints can be tested.

### stores()

The stores endpoint provides access to a paginated list of stores. The parameters can be customized as follows:

-   page (Int): The page number.
-   perPage (Int): The number of elements in each page.
-   onlyOpened (Boolean, optional): If true, only opened stores will be returned.

Below is an example of execution:
(Keep in mind in every endpoint the list of attributes can be customized, this is just an example)

```graphql
query {
	stores(page: 0, perPage: 10, onlyOpened: true) {
		id
		name
		street_address
		city
		state {
			name
			abbreviation
		}
		zip_code
		country
		latitude
		longitude
		is_open
	}
}
```

### store()

The store endpoint returns a single store that matches the provided id. The only parameter can be customized as follows:

-   id (Int): the id of the store.

Below is an example of execution:

```graphql
query {
	store(id: 1) {
		id
		name
		street_address
		city
		state {
			name
			abbreviation
		}
		zip_code
		country
		latitude
		longitude
		is_open
	}
}
```

### findClosestStoreToLocation()

This endpoint finds the closest store to the provided latitude and longitude values. The parameters can be customized as follows:

-   lat (Float): The latitude value
-   lon (Float): The longitude value

Below is an example of execution:

```graphql
query {
	findClosestStoreToLocation(lat: 25.808958, lon: -80.196953) {
		id
		name
		street_address
		city
		state {
			name
			abbreviation
		}
		zip_code
		country
		latitude
		longitude
		is_open
	}
}
```

## closeStoreById()

This enpoint "closes" a store by chaning the is_open attribute to **false**, this prevents it from appearing in the stores list if the onlyOpened paramiter is set to true. The only parameter can be sutomized as follows:

-   id (Int): the id of the store.

Below is an example of execution:

```graphql
mutation {
	closeStoreById(id: 1) {
		id
		is_open
		street_address
	}
}
```

## openStoreById()

This endpoint "opens" a store by changing the is_open attribute to **true**, this allows it to appear in the stores list if the onlyOpened parameter is set to **false** or not provided. The only parameter can be customized as follows:

-   id (Int): the id of the store.

Below is an example of execution:

```graphql
mutation {
	openStoreById(id: 1) {
		id
		is_open
		street_address
	}
}
```

## states

There is an additional realy simple endpoint just for querying the entire list of states just in case. It has no parameters.

Below is an example of execution:

```graphql
query {
	states {
		name
		abbreviation
	}
}
```
