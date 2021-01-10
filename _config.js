import lume from "./lume/mod.js";
import pug from "./lume/plugins/pug.js";
import eta from "./lume/plugins/eta.js";
import css from "./lume/plugins/css.js";
import terser from "./lume/plugins/terser.js";
import inline from "./lume/plugins/inline.js";

const site = lume({
  prettyUrls: false,
  location: new URL("https://example-site.com/subdirectory")
});

site.use(pug());
site.use(eta());
site.use(css({ map: true }));
site.use(inline());
site.use(terser({ sourceMap: true }));

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
