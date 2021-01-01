export const layout = "layouts/basic.njk";
export const title = "Multiple pages from js";

export default function* () {
  const pages = [1, 2, 3];

  for (const page of pages) {
    yield {
      permalink: `modules/multiple-pages/${page}`,
      content: `Sync page ${page}`,
    };
  }
}
