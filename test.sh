deno run --unstable -A lume/cli.js
DIFF="$(git diff --no-index _expected _site)"

if ["$DIFF" != ""]; then
  echo 'Test failed' >&2  # write error message to stderr
  exit 1                  # or exit $test_result
fi

deno run --unstable -A lume/cli.js --run multi
