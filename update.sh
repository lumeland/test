#!/usr/bin/env sh

deno run --unstable -A lume/cli.js --dest ./_expected -- hello one two three
deno run --unstable -A lume/cli.js run log --dest ./_expected -- extra four five six
sh test.sh