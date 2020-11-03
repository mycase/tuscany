#!/usr/bin/env bash
readonly MEASURE_COVERAGE=${MEASURE_COVERAGE:-false}
readonly OUTPUT_DIR=./test/test_output
readonly TEST_ROUTES_JSON=./test/routes.json

clean_output_directory() {
  rm -rf ${OUTPUT_DIR}
}

generate_routes() {
  ./bin/tuscany -d ${OUTPUT_DIR} -r ${TEST_ROUTES_JSON}
}

exit_early_if_failure() {
  ec=$?
  if [[ ${ec} -ne 0 ]]; then
    exit ${ec}
  fi
}

clean_output_directory && generate_routes
exit_early_if_failure

./node_modules/.bin/jest --coverage "${MEASURE_COVERAGE}"
test_response=$?

rm -rf ${OUTPUT_DIR}

exit ${test_response}
