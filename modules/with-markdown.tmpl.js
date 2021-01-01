export const layout = "layouts/basic.njk";
export const title = "Module example";
export const templateEngine = "md";

export default function ({ title }) {
  return `
# ${title}

[Back to home](/)
`
}