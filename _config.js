import lume from "./lume/mod.js";

const site = lume({
  prettyUrls: false,
});

site.ignore("lume");

site.script(
  "multi",
  "mkdir newdir",
  "cd newdir",
  "touch newfile",
  "ls -al",
  "cd ..",
  "rm -rf newdir",
);

site.script(
  "log",
  () => Deno.writeTextFile(site.dest("hello.txt"), "Hello world"),
);

site.addEventListener("afterBuild", "log")

export default site;
