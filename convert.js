const input = require('./export.json')
const express = require('express')


const object1 = input.list
const filtered = []
for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
    if (value.annotations) {
        filtered.push(value)
    }
}

console.log(filtered)


const app = express()
const port = 3000

app.get('/', (req, res) => {

    const result = filtered.map(item => {
        //evtl. datum. evt. autor
        const authors = [];
        if (item.authors) {
            for (const [key, author] of Object.entries(item.authors)) {
                authors.push(author.name)
            }
        }
        const annotations = item.annotations.map(annotation => `<li>${annotation.quote}`)

        return `<h1>${item.resolved_title}${authors.length > 0 ? ', ' : ''}${authors.join(",")}, ${item.annotations[0].created_at.split("-").shift()}</h1><li>${item.resolved_url}</li>${annotations}</ul></ul><hr />`;
    }).join("")



    res.send(result)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})