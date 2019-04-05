#!/usr/bin/env bash
npm run build
build_response=$?
if [[ ${build_response} -ne 0 ]]; then
  exit ${build_response}
fi

rm -rf ./test/test_output
mkdir ./test/test_output

./bin/tarr -d ./test/test_output -r ./test/routes.json

npm run test
test_response=$?

rm -rf ./test/test_output

exit ${test_response}
