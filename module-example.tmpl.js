export const layout = "layouts/basic.njk";
export const title = "Module example";

export default function (data, { url }) {
  return `
    <h1>${data.title}</h1>
    <a href="${url("/", true)}">Back to home</a>
  `
}