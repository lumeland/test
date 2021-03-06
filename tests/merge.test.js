import { assertEquals } from "./deps.js";
import { merge } from "../lume/core/utils.ts";

Deno.test("Merge options", () => {
  const defaults = {
    foo: "bar",
  };
  const user = {
    foo: "baz",
  };
  const expected = {
    foo: "baz",
  };

  assertEquals(expected, merge(defaults, user));
});

Deno.test("Merge options 2", () => {
  const defaults = {
    foo: "bar",
  };
  const user = {
    foo2: "bar2",
  };
  const expected = {
    foo: "bar",
    foo2: "bar2",
  };

  assertEquals(expected, merge(defaults, user));
});

Deno.test("Merge inner options", () => {
  const defaults = {
    foo: "bar",
    foo2: {
      bar1: "bar1",
      bar2: "bar2",
    },
  };
  const user = {
    foo: "new bar",
    foo2: {
      bar1: "new bar1",
      bar3: "bar3",
    },
  };
  const expected = {
    foo: "new bar",
    foo2: {
      bar1: "new bar1",
      bar2: "bar2",
      bar3: "bar3",
    },
  };

  assertEquals(expected, merge(defaults, user));
});
