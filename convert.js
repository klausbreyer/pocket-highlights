const input = require('./export.json')
const fs = require('fs')
const express = require('express')


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

    return `<h1>${item.resolved_title}${authors.length > 0 ? ', ' : ''}${authors.join(",")}, ${annotated.split("-").shift()}</h1><aside>${annotated}: ${item.excerpt} </aside><ul><li><a href="${item.resolved_url}" target="_blank">${item.resolved_url}</a></li>${annotations}</ul><hr />\n`;
}).join("")


const full = `<title>Pocket Highlights</title>${content}`;

fs.writeFileSync('highlights.html', full)

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send(full)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})