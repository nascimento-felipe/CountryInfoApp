# Countries Info App

## Introduction

This App shows a list of available countries and, once you select one, you can see information about the country, such as population, flag and countries that are next to this country.

## Running the project

### Dotenv

they are the URLs that i received in during the project. I will put them here for simplicity and to help you see the project faster, but I know that in a real project we shouldn't do this.

```dotenv
FLAG_URL="https://countriesnow.space/api/v0.1/countries/flag/images"
BORDER_URL="https://date.nager.at/api/v3/CountryInfo"
POPULATION_URL="https://countriesnow.space/api/v0.1/countries/population"
AVAILABLE_COUNTRIES="https://date.nager.at/api/v3/AvailableCountries"
```

### Backend

1. Enter the backend folder in your terminal

```bash
$ cd backend
```

2. Run the "npm install" (or npm i)

```bash
$ npm install
```

3. Run the project

```bash
$ npm run start:dev
```

### Frontend

1. Enter the frontend folder in your terminal

```bash
$ cd frontend
```

2. Run the "npm install" (or npm i)

```bash
$ npm install
```

3. Run the project

```bash
$ npm run dev
```

### Additional Info

The frontend is running in the port 3000 and server is running in 3333.

I didn't make the link in each border of a country because my time was running out, so I just did a list of borders
