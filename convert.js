const input = require("./export.json");
const fs = require("fs");

const fullList = input.list;
const reducedList = [];
for (const [key, value] of Object.entries(fullList)) {
  if (value.annotations) {
    reducedList.push(value);
  }
}

const content = reducedList
  .sort((a, b) => {
    if (a.annotations[0].created_at > b.annotations[0].created_at) {
      return -1;
    }
    if (a.annotations[0].created_at < b.annotations[0].created_at) {
      return 1;
    }
    return 0;
  })
  .map((item) => {
    //evtl. datum. evt. autor
    const authors = [];
    if (item.authors) {
      for (const [key, author] of Object.entries(item.authors)) {
        authors.push(author.name);
      }
    }
    const annotated = item.annotations[0].created_at;
    const annotations = item.annotations.map(
      (annotation) => `<li>${annotation.quote}`
    );

    return `<h2>${item.resolved_title}${
      authors.length > 0 ? ", " : ""
    }${authors.join(",")}, ${annotated
      .split("-")
      .shift()}</h2><aside>${annotated}: ${
      item.excerpt
    } </aside><ul><li><a href="${item.resolved_url}" target="_blank">${
      item.resolved_url
    }</a></li>${annotations}</ul><hr />\n`;
  })
  .join("");

fs.writeFileSync(
  "dist/index.html",
  `${fs.readFileSync("theme/header.html")}${content}${fs.readFileSync(
    "theme/footer.html"
  )}`
);
