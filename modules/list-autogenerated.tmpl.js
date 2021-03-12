export const layout = "layouts/pagination.njk";
export const renderOrder = 1;

export default function* ({ search, paginate }) {
  const result = search.pages("autogenerated");
  const pages = paginate(
    result,
    { permalink: "autogenerated/page-%d.html", size: 2 },
  );

  for (const page of pages) {
    yield page;
  }
}
