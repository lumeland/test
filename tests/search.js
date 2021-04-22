import { assertEquals } from "../lume/deps/asserts.js";
import { buildFilter } from "../lume/helpers/search.js";

Deno.test("Search by Tags", () => {
  const filter = buildFilter("foo bar");

  assertEquals(
    "(page) => page.data?.tags?.includes(value0) && page.data?.tags?.includes(value1)",
    filter.toString()
  );
});

Deno.test("Search by Equal", () => {
  const filter = buildFilter("foo=bar");

  assertEquals(
    "(page) => page.data?.foo === value0",
    filter.toString()
  );
});

Deno.test("Search by Not Equal", () => {
  const filter = buildFilter("foo!=bar");

  assertEquals(
    "(page) => page.data?.foo !== value0",
    filter.toString()
  );
});

Deno.test("Search by Starts With", () => {
  const filter = buildFilter("foo^=bar");

  assertEquals(
    "(page) => page.data?.foo?.startsWith(value0)",
    filter.toString()
  );
});

Deno.test("Search by Ends With", () => {
  const filter = buildFilter("foo$=bar");

  assertEquals(
    "(page) => page.data?.foo?.endsWith(value0)",
    filter.toString()
  );
});

Deno.test("Search by Contains", () => {
  const filter = buildFilter("foo*=bar");

  assertEquals(
    "(page) => page.data?.foo?.includes(value0)",
    filter.toString()
  );
});

Deno.test("Search by Tags with OR", () => {
  const filter = buildFilter("foo|bar");

  assertEquals(
    "(page) => value0.some((i) => page.data?.tags?.includes(i))",
    filter.toString()
  );
});

Deno.test("Search by Equal with OR", () => {
  const filter = buildFilter("foo=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo === i)",
    filter.toString()
  );
});

Deno.test("Search by Not Equal with OR", () => {
  const filter = buildFilter("foo!=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo !== i)",
    filter.toString()
  );
});

Deno.test("Search by Starts With with OR", () => {
  const filter = buildFilter("foo^=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo?.startsWith(i))",
    filter.toString()
  );
});

Deno.test("Search by Ends With with OR", () => {
  const filter = buildFilter("foo$=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo?.endsWith(i))",
    filter.toString()
  );
});

Deno.test("Search by Contains with OR", () => {
  const filter = buildFilter("foo*=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo?.includes(i))",
    filter.toString()
  );
});

