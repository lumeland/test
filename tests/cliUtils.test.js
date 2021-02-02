import { assert, assertThrows } from "../lume/deps/asserts.js";
import { validateArgsCount } from "../lume/cli/utils.js";

Deno.test("valid counts don't throw", () => {
  validateArgsCount("command", ["build"], 1);
  validateArgsCount("command", ["run", "script"], 2);

  assert(true); // just ensure it makes it here without throwing
});

Deno.test("invalid counts throw", () => {
  assertThrows(() => {
    validateArgsCount("command", ["build", "the", "world"], 1);
  });
});
