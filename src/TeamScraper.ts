import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, ElementHandle, executablePath } from 'puppeteer';

puppeteer.use(StealthPlugin());

const teamScraper = async (regionURL: string): Promise<Team[]> => {
  
    const browser: Browser = await puppeteer.launch({
        headless: true,
        executablePath: executablePath(),
      });

    const selector: string = '.team-template-text';
    const teams: Team[] = []

    try {
        const page = await browser.newPage();
        await page.goto(regionURL);

        const teamElements: ElementHandle<Element>[] = await page.$$(selector);

        for (const teamElement of teamElements) {
            const name = await teamElement.$eval("a",(el) => el.textContent?.trim() || "");
            const url = await teamElement.$eval("a",(el) => el.getAttribute("href") || "");
      
            if(url.includes("Inactive")) {
              continue
            }
            console.log(name, url)
            //teams.push({ name, url });
          }


    return teams;
  } catch (error) {
    console.error('Error during team scraping:', error);
    return [];
  } finally {
    await browser.close();
  }
};

export default teamScraper;
