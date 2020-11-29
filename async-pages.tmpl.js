export default async function* () {
  const pages = [1, 2, 3];

  for (const page of pages) {
    yield new Promise((res) =>
      setTimeout(() =>
        res({
          permalink: `async-page/${page}`,
          content: `Page ${page}`,
        }), 100)
    );
  }
}
