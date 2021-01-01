export const layout = "layouts/basic.njk";

export default async function* () {
  const pages = [1, 2, 3];

  for (const page of pages) {
    yield new Promise((res) =>
      setTimeout(() =>
        res({
          title: `Multiple pages example ${page}`,
          permalink: `modules/multiple-pages-async/${page}`,
          content: `Async Page ${page}`,
        }), 100)
    );
  }
}