#!/usr/bin/env sh

# Run tests
deno test --unstable --allow-read

# Execute a command
deno run --unstable -A lume/cli.js run multi

# Build a site
deno run --unstable -A lume/cli.js -- hello one two three
deno run --unstable -A lume/cli.js run log -- extra four five six
DIFF="$(git diff --no-index _expected _site)"
echo "Diff:"
echo "$DIFF"
