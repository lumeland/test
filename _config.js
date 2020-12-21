import lume from "./lume/mod.js";
import pug from "./lume/plugins/pug.js";
import eta from "./lume/plugins/eta.js";

const site = lume({
  prettyUrls: false,
  location: new URL("https://example-site.com/subdirectory")
});

site.use(pug());
site.use(eta());

site.ignore("lume", "tests");

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
