const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.gocomics.com/comics/a-to-z');
    const comics = await page.evaluate(() => {
        const comicEle = document.getElementsByClassName('gc-blended-link gc-blended-link--primary col-12 col-sm-6 col-lg-4');
        const comicArray = {};
        comicEle.forEach(comic => {
            const comicName = comic.children[0].children[1].children[0].innerText;
            const comicHref = comic.getAttribute('href');
            const comicObj = {
                lastHref: comicHref,
                comicUrl: comicHref.split('/')[1],
                title: comicName
            }
            comicArray[comicName] = comicObj;
        });
        return comicArray;
    })
    console.log("🚀 ~ file: main.js ~ line 22 ~ comics ~ comics", comics)
    const curatedArr = ["The Argyle Sweater", "Calvin and Hobbes", "Close to Home", "DeFlocked", "Dilbert Classics", "F Minus", "FoxTrot", "Garfield", "Get Fuzzy", "In the Bleachers", "Lio", "Non Sequitur", "Pearls Before Swine", "Perry Bible Fellowship", "Pooch Cafe", "Wallace the Brave"]
    const chosenComics = [];
    for (let i = 0; i < curatedArr.length; i++) {
        const comicName = curatedArr[i];
        console.log(`Grabbing ${i + 1} of ${curatedArr.length} comics`);
        if (comics[comicName]) {
            await page.goto(`https://www.gocomics.com${comics[comicName].lastHref}`, {waitUntil:"load"});
            comics[comicName].image = await page.evaluate(() => {
                if (document.getElementsByClassName('item-comic-image')[0]) {
                    return document.getElementsByClassName('item-comic-image')[0].children[0].getAttribute('src');
                } else {
                    return
                }
            })
            chosenComics.push(comics[comicName]);
        }
    }
    console.log("🚀 ~ file: main.js ~ line 12 ~ links", chosenComics)
    await browser.close();
})();