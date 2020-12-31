const input = require('./export.json')
const fs = require('fs')


const object1 = input.list
const filtered = []
for (const [key, value] of Object.entries(object1)) {
    if (value.annotations) {
        filtered.push(value)
    }
}


const content = filtered.reverse().map(item => {
    //evtl. datum. evt. autor
    const authors = [];
    if (item.authors) {
        for (const [key, author] of Object.entries(item.authors)) {
            authors.push(author.name)

        }
    }
    const annotated = item.annotations[0].created_at;
    const annotations = item.annotations.map(annotation => `<li>${annotation.quote}`)

    return `<h2>${item.resolved_title}${authors.length > 0 ? ', ' : ''}${authors.join(",")}, ${annotated.split("-").shift()}</h2><aside>${annotated}: ${item.excerpt} </aside><ul><li><a href="${item.resolved_url}" target="_blank">${item.resolved_url}</a></li>${annotations}</ul><hr />\n`;
}).join("")



fs.writeFileSync('dist/index.html', `${fs.readFileSync("theme/header.html")}${content}${fs.readFileSync("theme/footer.html")}`)
