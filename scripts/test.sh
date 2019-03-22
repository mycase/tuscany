#!/usr/bin/env bash
npm run build

rm -rf ./test/test_output
mkdir ./test/test_output

./bin/tarr -d ./test/test_output -r ./test/routes.json

npm run test
ex=$?

rm -rf ./test/test_output

exit ${ex}
