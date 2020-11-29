# Execute a command
deno run --unstable -A lume/cli.js --run multi

# Build a site
deno run --unstable -A lume/cli.js
DIFF="$(git diff --no-index _expected _site)"
echo "Diff:"
echo "$DIFF"
