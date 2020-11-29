export default function* () {
  const pages = [1, 2, 3];

  for (const page of pages) {
    yield {
      permalink: `page/${page}`,
      content: `Page ${page}`,
    };
  }
}
