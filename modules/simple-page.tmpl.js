export const layout = "layouts/basic.njk";
export const title = "Module example";

export default function ({ title }, { url }) {
  return `
    <h1>${title}</h1>
    <a href="${url("/", true)}">Back to home</a>
  `;
}
