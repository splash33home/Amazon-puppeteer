const puppeteer = require('puppeteer');
//default global variable
let browser = null;
let page = null;
const BASE_URL = 'https://amazon.in/';
const amazon = {
    initialize :async() => 
    {
        browser = await puppeteer.launch({
            headless:false
        })
        page = await browser.newPage();
        await page.goto(BASE_URL,{waitUntil:'networkidle2'});
        console.log('Initialization competed');
    },
    getProductDetails:async(link)=>{
        console.log(`Going to the product page..${link}`);
        await page.goto(link,{waitUntil:'networkidle2'});
        let details = await page.evaluate(()=>{
            let title = document.querySelector('#productTitle').innerText;
            let Manufacturer = document.querySelector('#bylineInfo').innerText;
            let colour = document.querySelector('.selection').innerText;
            let price = document.querySelector('#priceblock_ourprice,#priceblock_dealprice').innerText;
            let saveAmount = document.querySelector('#regularprice_savings,#dealprice_savings').innerText;
            let seller = document.querySelector('#merchant-info').innerText;
            let ratings = document.querySelector('#acrCustomerReviewText').innerText;
            return{
                title,
                Manufacturer,
                colour,
                price,
                saveAmount,
                seller,
                ratings
            }
        });
        return details;
    },
    end:async()=>{
        console.log('stopping the scraper');
        await browser.close();

    }
}
module.exports = amazon;