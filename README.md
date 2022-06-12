# Roman Numeral Conversion Service


## Description
This service provides an endpoint that converts integers in the range `[0 - 3,999,999,999]` to Roman numeral form using
[Vinculum notation](https://en.wikipedia.org/wiki/Roman_numerals#Vinculum). 


## Prerequisites
- node v14 or higher
- npm v8 or higher


## Installation

```bash
$ npm install
```

## Running the Service

```bash
# start server
$ npm run start

# start server in live-reload mode
$ npm run start:dev
```

## Running Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# unit test coverage
$ npm run test:cov
```


## Usage
Once the server is running locally, numbers can be converted to Roman numerals using the following GET endpoint:
- `http://localhost:8080/romannumeral?query={number}`


## Methodology

### Development
- The service was developed with [NestJS](https://nestjs.com/) based on a
Controller-Service pattern, separating concerns between endpoint serving and conversion logic.
- [Babel](https://babeljs.io/) transpiler is used to support new JS features (such as decorators).
- [Jest](https://jestjs.io/) is used to setup and run all tests.
- e2e queries are performed with [supertest](https://www.npmjs.com/package/supertest).

### Testing Strategy
- Unit tests ensure the conversion logic quality remains high and improve maintainability 
by not focusing on specific implementation details.
- End-to-end tests are used to verify the endpoint's correct functionality, and also ensure error
handling is performed correctly.
- Unit test coverage reports are also available in directory `coverage/` after performing `npm run test:cov`

### Layout
````
├── src
│   ├── common
│   │   └── service.exception.js
│   ├── services
│   │   ├── roman-numeral-converter.service.js
│   │   └── roman-numeral-converter.service.spec.js
│   ├── app.controller.js
│   ├── app.module.js
│   └── main.js
├── test
│   └── app.e2e-spec.js
├── .babelrc
├── .gitignore
├── README.md
├── index.js
├── jsconfig.json
├── nest-cli.json
├── nodemon.json
└── package.json
````