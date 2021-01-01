export const layout = "layouts/pagination.njk"

export default function* ({ search, paginate }) {
  const result = search.pages("markdown");
  const pages = paginate(result, { permalink: "markdown/page-%d.html", size: 2});

  for (const page of pages) {
    yield page;
  }
}