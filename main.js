const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.gocomics.com/comics/a-to-z');
    const links = await page.evaluate(data => {
        const comicData = document.getElementsByClassName('gc-blended-link gc-blended-link--primary col-12 col-sm-6 col-lg-4');
        const comicLinksArray = [];
        comicData.forEach(comic => {
            const comicObj = {
                href:comic.getAttribute('href'),
                title: comic.children[0].children[1].children[0].innerText
            }
            comicLinksArray.push(comicObj);
        });
        return comicLinksArray;
        return Promise.resolve()
    })
    console.log("🚀 ~ file: main.js ~ line 12 ~ links", links)
    await browser.close();
})();