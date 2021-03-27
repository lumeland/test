import lume from "./lume/mod.js";
import pug from "./lume/plugins/pug.js";
import eta from "./lume/plugins/eta.js";
import postcss from "./lume/plugins/postcss.js";
import terser from "./lume/plugins/terser.js";
import bundler from "./lume/plugins/bundler.js";
import inline from "./lume/plugins/inline.js";
import svg from "./lume/plugins/svg.js";

const site = lume({
  prettyUrls: false,
  location: new URL("https://example-site.com/subdirectory"),
});

site
  .use(pug())
  .use(eta())
  .use(bundler())
  .use(svg())
  .use(postcss({ sourceMap: true }))
  .use(terser({ sourceMap: true }))
  .use(inline());

site.ignore("lume", "tests");

site.filter("returnAsync", (text) => Promise.resolve(`${text} (async)`), true);

site.script(
  "multi",
  "mkdir newdir",
  "cd newdir",
  "touch newfile",
  "ls -al",
  "cd ..",
  "rm -rf newdir",
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
