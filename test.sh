#!/bin/bash
webpack-dev-server "mocha!./test/test.js" --output-file test.js --options webpack.config.js &
open http://localhost:8080/webpack-dev-server/test
