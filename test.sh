deno run --unstable -A lume/cli.js
git diff --no-index _expected _site > diff
deno run --unstable -A lume/cli.js --run multi
