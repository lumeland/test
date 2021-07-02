import lume from "./lume/mod.ts";
import pug from "./lume/plugins/pug.ts";
import eta from "./lume/plugins/eta.ts";
import postcss from "./lume/plugins/postcss.ts";
import terser from "./lume/plugins/terser.ts";
import bundler from "./lume/plugins/bundler.ts";
import inline from "./lume/plugins/inline.ts";
import svg from "./lume/plugins/svgo.ts";
import date from "./lume/plugins/date.ts";
import code from "./lume/plugins/code_highlight.ts";
import slugify from "./lume/plugins/slugify_urls.ts";
import attributes from "./lume/plugins/attributes.ts";

Deno.env.set("TZ", "Z");

const site = lume({
  prettyUrls: false,
  location: new URL("https://example-site.com/subdirectory"),
});

site
  .use(date())
  .use(pug())
  .use(eta())
  .use(bundler())
  .use(svg())
  .use(postcss({
    sourceMap: true,
    includes: ["_includes/css"],
  }))
  .use(terser({ sourceMap: true }))
  .use(inline())
  .use(slugify())
  .use(attributes())
  .use(code());

site.ignore("lume", "tests");

site.filter("returnAsync", (text) => Promise.resolve(`${text} (async)`), true);

site.helper("upperCase", (text) => `<strong>${text.toUpperCase()}</strong>`, { type: "tag" });
site.helper("upperCaseBody", (text) => `<strong>${text.toUpperCase()}</strong>`, { type: "tag", body: true });
site.helper("upperCaseAsync", async (text) => `<strong>${text.toUpperCase()}</strong>`, { type: "tag", async: true });
site.helper("upperCaseBodyAsync", async (text) => `<strong>${text.toUpperCase()}</strong>`, { type: "tag", body: true, async: true });

site.script(
  "multi",
  "mkdir newdir && cd newdir && touch newfile && ls -al && cd .. && rm -rf newdir",
);

site.copy("/assets/robots_config", "/robots.txt");
site.copy("/assets/img", "/pictures");

site.script("log", function (site) {
  const flags = site.flags;
  const name = flags.shift();

  Deno.writeTextFile(
    site.dest(`${name}.txt`),
    `Hello world\n${site.flags.join(", ")}`,
  );
});

site.addEventListener("afterBuild", "log");

export default site;
