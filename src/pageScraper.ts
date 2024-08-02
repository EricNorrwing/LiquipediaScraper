import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, ElementHandle, executablePath } from 'puppeteer';


puppeteer.use(StealthPlugin());

const pageScraper = async (scrapeURL: string) => {
  try {

    const browser: Browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath()
    })

    const page = await browser.newPage();

    
    await page.goto(scrapeURL)

    
    const titles = await page.$$('.panel-box-heading')


    const  extractedTitles = await Promise.all(titles.map(async (titles) => {
      return titles.evaluate(el => el.textContent?.trim())
    }))

    console.log(extractedTitles)






    await browser.close()
  } catch (error) {
    console.error('Error during scraping:', error);
  }

}

export default pageScraper
