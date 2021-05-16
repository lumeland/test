import { assertEquals } from "./deps.js";
import lume from "../lume/mod.js";

Deno.test("url filter (without options)", () => {
  const site = lume();

  assertEquals("http://example.com/", site.url("http://example.com"));
  assertEquals("/bar", site.url("/bar"));
  assertEquals("/foo", site.url("foo"));
  assertEquals("./foo", site.url("./foo"));
  assertEquals("../foo", site.url("../foo"));
  assertEquals("http://localhost/foo", site.url("foo", true));
});

Deno.test("url filter (with options)", () => {
  const site = lume({
    location: new URL("https://example.com/bar"),
  });

  assertEquals("http://example2.com/", site.url("http://example2.com"));
  assertEquals("/bar/bar", site.url("/bar"));
  assertEquals("/bar/foo", site.url("foo"));
  assertEquals("./foo", site.url("./foo"));
  assertEquals("../foo", site.url("../foo"));
  assertEquals("#foo", site.url("#foo"));
  assertEquals("?foo=bar", site.url("?foo=bar"));
  assertEquals("https://example.com/bar/foo", site.url("foo", true));
});
