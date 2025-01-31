/**
 * convert.js
 *
 * Liest export.json ein und schreibt dist/index.html
 * basierend auf dem Layout aus dem Go-Template (getHtml).
 */

const input = require("./export.json");
const fs = require("fs");

// 1. Pocket-Daten (Liste) einlesen und filtern
const fullList = input.list;
const reducedList = [];
for (const [key, value] of Object.entries(fullList)) {
  // Nur Einträge mit Annotations übernehmen
  if (value.annotations) {
    reducedList.push(value);
  }
}

// 2. Sortierung nach Datum der ersten Annotation
const sortedList = reducedList.sort((a, b) => {
  if (a.annotations[0].created_at < b.annotations[0].created_at) {
    return -1;
  }
  if (a.annotations[0].created_at > b.annotations[0].created_at) {
    return 1;
  }
  return 0;
});

// Hilfsfunktion: Titelstring bauen ("Titel, Autor, Jahr") und Doppelpunkte entfernen
function buildTitle(item) {
  let authors = [];
  if (item.authors) {
    for (const author of Object.values(item.authors)) {
      authors.push(author.name);
    }
  }
  const annotated = item.annotations[0].created_at;
  const year = annotated.split("-")[0] || "";

  let titleStr = item.resolved_title;
  if (authors.length > 0) {
    titleStr += ", " + authors.join(", ");
  }
  titleStr += ", " + year;

  // Doppelpunkt entfernen wie im Go-Code: strings.ReplaceAll
  return titleStr.replace(/:/g, "");
}

// Hilfsfunktion: Alle Annotationen in <li>-Elemente
function buildHighlights(item) {
  // Im Go-Code: <li> {{.Text}}</li> => hier: annotation.quote
  const liHTML = item.annotations
    .map((ann) => `<li>${ann.quote}</li>`)
    .join("");
  return `<ul>${liHTML}</ul>`;
}

// 3. Gesamtes Content-Markup auf Basis des Go-Templates
const content = sortedList
  .map((item, i) => {
    const titleStr = buildTitle(item);
    const url = item.resolved_url || "";

    return `
<a id="${i}" href="#${i}">#${i}</a>
<h2 style="cursor:copy;" onclick="copyToClipboard('read/${titleStr}')">${titleStr}</h2>
<span onclick="copyToClipboard('${url}')" style="cursor:copy;">${url}</span>
<a href="${url}" target="_blank">&raquo;&raquo;&raquo;</a>
${buildHighlights(item)}
<hr/>
`;
  })
  .join("");

// 4. Copy-to-Clipboard-Skript + Zusammenbau mit Header und Footer
//    Wir binden das Skript direkt nach dem Header ein.
//    Achte darauf, dass in deinem Footer nichts "geschlossen" wird,
//    bevor wir das Skript eingefügt haben. Ansonsten Skript in header.html packen.
const finalHTML = `
${fs.readFileSync("theme/header.html", "utf8")}
<script>
function copyToClipboard(copyText) {
  var textArea = document.createElement("textarea");
  textArea.value = copyText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
}
</script>
${content}
${fs.readFileSync("theme/footer.html", "utf8")}
`;

fs.writeFileSync("dist/index.html", finalHTML, "utf8");

// Optional: SHA256-Funktion, falls du sie weiterhin brauchst:
async function sha256(source) {
  const sourceBytes = new TextEncoder().encode(source);
  const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
  const resultBytes = [...new Uint8Array(digest)];
  return resultBytes.map((x) => x.toString(16).padStart(2, "0")).join("");
}
