/**
 * <p>
 *   Description: index
 * </p>
 * @author c332030
 * @since 2024/4/26
 */

const fs = require('fs')

const cheerio = require('cheerio')

const htmlDecoder = new TextDecoder("gbk");

async function readHtml(url) {
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => htmlDecoder.decode(buffer))
}

const bookName = "大宋的智慧"
const chapterUrl = "https://www.ddxs.com/dasongdezhihui/"

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
    const chapterCheerio = cheerio.load(chapterHtml)

    const chapterEleArr = chapterCheerio('.centent li > a')

    for(const ele of chapterEleArr) {

        const href = ele.attribs.href;
        if(!href.endsWith('.html')) {
            continue
        }

        write(`\n${ele.children[0].data}\n`, true)

        const contentHtml = await readHtml(`${chapterUrl}${href}`)
        const contentCheerio = cheerio.load(contentHtml)
        write(contentCheerio.text(), true)

        const tableDiv = contentCheerio(`table`)

        const tableNextAll = tableDiv.nextAll();
        write(text, true)

    }

    write(null, true)

}

main()
