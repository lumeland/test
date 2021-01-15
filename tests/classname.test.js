import { assert, assertEquals } from "../lume/deps/asserts.js";
import lume from "../lume/mod.js";

Deno.test("classname filter", () => {
  const site = lume();
  const [className] = site.filters.get("class");

  assert(site.filters.has("class"));

  assertEquals("one two", className("one", "two"));
  assertEquals("one", className("one", null));
  assertEquals("one", className("one", undefined));
  assertEquals("one two", className(["one", "two"]));
  assertEquals("one two", className(["one", "two"], "two"));
  assertEquals(
    "one two",
    className(["one", "", false, null, undefined, 0, "two"], "two"),
  );
  assertEquals("one two", className({ one: true, two: 1 }));
  assertEquals("one", className({ one: true, two: false }));
  assertEquals("one two", className({ one: true, two: false }, "two"));
  assertEquals(
    "one two",
    className({ one: true, two: false }, { one: false, two: true }),
  );
  assertEquals("one two", className([{ one: true, two: true }]));
});
