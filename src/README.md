# GPU Price Stats Source Code

This directory contains the source code for the lambda functions.

Modules:

* `main.ts` is the entry point for the code.
* `config.ts` contains common values used in the other modules.
* `gumtree.ts` queries the gumtree.com.au website to get GPU pricing data.
* `dynamodb.ts` contains functions to work with DynamoDB such as inserting rows etc.

It is written in TypeScript and needs compiling to run.

Before attempting to execute the code, install the Node.js dependencies:

* `npm install`

Build and execute commands:

* `npm run build` to build the JS code into the `dist` directory.
* `npm run watch` to compile on file changes.
* `npm start` to execute the JS code in the `dist` directory.

Docker commands:

* `docker build -t <tag> .` to create the docker image.
* `docker run <tag>` to execute the code in the docker image.