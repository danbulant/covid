# Documentation

## Requirements

* NodeJS, tested on v12 and v13
* CURL (As other ways didn't work when testing)

## Setting it up

* Clone (either using git or **hub**) this repository
* Install dependencies (`npm i`)
* Fetch data (Must be done at least once, but a cron is suggested)
* Run it! (`npm start`)

## Format

Every response is in JSON and contains at least these fields:

* `code` - HTTP status code
* `type` - Type of response, see [types](TYPES.md)
* `data` - Might be missing, depends of `type`.

## Endpoints

For list of endpoints, see [ENDPOINTS.md](ENDPOINTS.md)
