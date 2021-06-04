import { assertEquals } from "./deps.js";
import { buildFilter, buildSort } from "../lume/helpers/search.js";

Deno.test("Search by Tags", () => {
  const filter = buildFilter("foo bar");

  assertEquals(
    "(page) => page.data?.tags?.includes(value0) && page.data?.tags?.includes(value1)",
    filter.toString(),
  );
});

Deno.test("Search by Equal", () => {
  const filter = buildFilter("foo=bar");

  assertEquals(
    "(page) => page.data?.foo === value0",
    filter.toString(),
  );
});

Deno.test("Search by Upper than", () => {
  const filter = buildFilter("foo>bar");

  assertEquals(
    "(page) => page.data?.foo > value0",
    filter.toString(),
  );
});

Deno.test("Search by Upper or equals than", () => {
  const filter = buildFilter("foo>=bar");

  assertEquals(
    "(page) => page.data?.foo >= value0",
    filter.toString(),
  );
});

Deno.test("Search by Lower than", () => {
  const filter = buildFilter("foo<bar");

  assertEquals(
    "(page) => page.data?.foo < value0",
    filter.toString(),
  );
});

Deno.test("Search by Lower or equals than", () => {
  const filter = buildFilter("foo<=bar");

  assertEquals(
    "(page) => page.data?.foo <= value0",
    filter.toString(),
  );
});

Deno.test("Search by Not Equal", () => {
  const filter = buildFilter("foo!=bar");

  assertEquals(
    "(page) => page.data?.foo !== value0",
    filter.toString(),
  );
});

Deno.test("Search by Starts With", () => {
  const filter = buildFilter("foo^=bar");

  assertEquals(
    "(page) => page.data?.foo?.startsWith(value0)",
    filter.toString(),
  );
});

Deno.test("Search by Ends With", () => {
  const filter = buildFilter("foo$=bar");

  assertEquals(
    "(page) => page.data?.foo?.endsWith(value0)",
    filter.toString(),
  );
});

Deno.test("Search by Contains", () => {
  const filter = buildFilter("foo*=bar");

  assertEquals(
    "(page) => page.data?.foo?.includes(value0)",
    filter.toString(),
  );
});

Deno.test("Search by Tags with OR", () => {
  const filter = buildFilter("foo|bar");

  assertEquals(
    "(page) => value0.some((i) => page.data?.tags?.includes(i))",
    filter.toString(),
  );
});

Deno.test("Search by Equal with OR", () => {
  const filter = buildFilter("foo=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo === i)",
    filter.toString(),
  );
});

Deno.test("Search by Not Equal with OR", () => {
  const filter = buildFilter("foo!=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo !== i)",
    filter.toString(),
  );
});

Deno.test("Search by Starts With with OR", () => {
  const filter = buildFilter("foo^=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo?.startsWith(i))",
    filter.toString(),
  );
});

Deno.test("Search by Ends With with OR", () => {
  const filter = buildFilter("foo$=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo?.endsWith(i))",
    filter.toString(),
  );
});

Deno.test("Search by Contains with OR", () => {
  const filter = buildFilter("foo*=bar|baz");

  assertEquals(
    "(page) => value0.some((i) => page.data?.foo?.includes(i))",
    filter.toString(),
  );
});

Deno.test("Search Date by Equal", () => {
  const filter = buildFilter("foo=2000-01-02");

  assertEquals(
    "(page) => page.data?.foo?.getTime() === value0.getTime()",
    filter.toString(),
  );
});

Deno.test("Search Date by Not Equal", () => {
  const filter = buildFilter("foo!=2000-01-02");

  assertEquals(
    "(page) => page.data?.foo?.getTime() !== value0.getTime()",
    filter.toString(),
  );
});

Deno.test("Search Date by lower than", () => {
  const filter = buildFilter("foo<2000-01-02T18:00");

  assertEquals(
    "(page) => page.data?.foo?.getTime() < value0.getTime()",
    filter.toString(),
  );
});

Deno.test("Search Date by lower or equals than", () => {
  const filter = buildFilter("foo<=2000-01-02T18:00");

  assertEquals(
    "(page) => page.data?.foo?.getTime() <= value0.getTime()",
    filter.toString(),
  );
});

Deno.test("Search Date by upper than", () => {
  const filter = buildFilter("foo>2000-01-02T18:00");

  assertEquals(
    "(page) => page.data?.foo?.getTime() > value0.getTime()",
    filter.toString(),
  );
});

Deno.test("Search Date by upper or equals than", () => {
  const filter = buildFilter("foo>=2000-01-02T18:00");

  assertEquals(
    "(page) => page.data?.foo?.getTime() >= value0.getTime()",
    filter.toString(),
  );
});

Deno.test("Sort by one field", () => {
  const sort = buildSort("order");

  assertEquals(
    "function anonymous(a,b\n) {\nreturn (a.data?.order == b.data?.order ? 0 : (a.data?.order < b.data?.order ? -1 : 1))\n}",
    sort.toString(),
  );
});

Deno.test("Sort by one field DESC", () => {
  const sort = buildSort("order=desc");

  assertEquals(
    "function anonymous(a,b\n) {\nreturn (a.data?.order == b.data?.order ? 0 : (a.data?.order > b.data?.order ? -1 : 1))\n}",
    sort.toString(),
  );
});

Deno.test("Sort by two fields", () => {
  const sort = buildSort("order title");

  assertEquals(
    "function anonymous(a,b\n) {\nreturn (a.data?.order == b.data?.order ? (a.data?.title == b.data?.title ? 0 : (a.data?.title < b.data?.title ? -1 : 1)) : (a.data?.order < b.data?.order ? -1 : 1))\n}",
    sort.toString(),
  );
});

Deno.test("Sort by two fields, sencod is DESC", () => {
  const sort = buildSort("order title=desc");

  assertEquals(
    "function anonymous(a,b\n) {\nreturn (a.data?.order == b.data?.order ? (a.data?.title == b.data?.title ? 0 : (a.data?.title > b.data?.title ? -1 : 1)) : (a.data?.order < b.data?.order ? -1 : 1))\n}",
    sort.toString(),
  );
});
