/**
 * <p>
 *   Description: index
 * </p>
 * @author c332030
 * @since 2024/4/26
 */

const fs = require('fs')

const { JSDOM } = require('jsdom')

const htmlDecoder = new TextDecoder("utf-8");

async function readHtml(url) {
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => htmlDecoder.decode(buffer))
}

const bookName = "大宋的智慧"
const chapterUrl = "https://www.hetushu.com/book/115/index.html"

function write(content, append) {

    const option = {
        flag: append ? 'a+' : 'w+'
    }

    if(null === content || undefined === content) {
        content = ''
    }

    fs.writeFileSync(`d:/${bookName}.txt`, `\n${content}`, option)

}

async function main() {

    write(bookName)

    const chapterHtml = await readHtml(chapterUrl)

    const dom = new JSDOM(chapterHtml)

    const document = dom.window.document

    const as = document.querySelectorAll('a');

    as.forEach(a => console.debug(`${a.textContent}[${a.href}]`))

}

main()
