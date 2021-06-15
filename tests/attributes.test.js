import { assert, assertEquals } from "./deps.js";
import lume from "../lume/mod.js";

Deno.test("attributes filter", () => {
  const site = lume();
  const [attributes] = site.helpers.get("attr");

  assert(site.helpers.has("attr"));

  assertEquals("one two", attributes(["one", "two"]));
  assertEquals('one="two"', attributes({ one: "two" }));
  assertEquals("one", attributes({ one: true }));
  assertEquals("two", attributes({ one: null, two: true }));
  assertEquals(
    "one two",
    attributes([{ one: null, two: true }, { one: true }]),
  );
  assertEquals('foo="&#34;bar&#34;"', attributes({ foo: '"bar"' }));
  assertEquals('class="foo bar"', attributes({ class: "foo bar" }));
  assertEquals('class="foo bar"', attributes({ class: ["foo bar"] }));
  assertEquals('class="foo"', attributes({ class: ["foo", { bar: false }] }));
  assertEquals(
    'class="foo bar"',
    attributes({ class: ["foo", { bar: true }] }),
  );
  assertEquals(
    'required class="foo bar"',
    attributes(["required", { class: ["foo", { bar: true }] }]),
  );
  assertEquals(
    'required class="foo bar"',
    attributes(["required", { class: ["foo", { bar: true }] }]),
  );
  assertEquals(
    'required class="foo bar"',
    attributes([{ required: true }, { class: ["foo", { bar: true }] }]),
  );
  assertEquals(
    'required class="foo bar"',
    attributes([{ required: true, class: ["foo", { bar: true }] }]),
  );
  assertEquals(
    'required class="foo bar"',
    attributes(
      ["required", { class: "foo" }, { class: ["bar", { other: false }] }],
    ),
  );
  assertEquals(
    'required class="foo" title="bar"',
    attributes(
      ["required", { class: "foo" }, { id: "one", title: "bar" }],
      "required",
      "class",
      "title",
    ),
  );
  assertEquals(
    'id="one"',
    attributes(
      ["required", { class: "foo" }, { id: "one", title: "bar" }],
      "id",
    ),
  );
});
