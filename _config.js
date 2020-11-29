import lume from "./lume/mod.js";

const site = lume({
  prettyUrls: false,
});

site.ignore("lume");

site.script(
  "multi",
  "rm -rf newdir",
  "mkdir newdir",
  "cd newdir",
  "touch newfile",
  "ls -al",
  "cd ..",
);

site.script(
  "log",
  () => Deno.writeTextFile(site.dest("hello.txt"), "Hello world"),
);

site.addEventListener("afterBuild", "log")

export default site;
