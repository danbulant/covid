# Documentation

## Setting it up

* Clone (either using git or **hub**) this repository
* Install dependencies (`npm i`)
* Run it! (`npm start`)

## Format

Every response is in JSON and contains at least these fields:

* `code` - HTTP status code
* `type` - Type of response, see [types](TYPES.md)
* `data` - Might be missing, depends of `type`.
