import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, ElementHandle, executablePath } from 'puppeteer';
/*
puppeteer.use(StealthPlugin());

const teamScraper = async (regionURL: string): Promise<string[]> => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath()
  });

  const teams: string[] = [];
  const teamsURL: string[] = [];

  try {
    const page = await browser.newPage();
    await page.goto(regionURL);

    const teamElements: ElementHandle<Element>[] = await page.$$('.team-template-text a');
    const teamNames = await Promise.all(
      teamElements.map(async (item) => {
        const regionURL = await teamElements.$eval('a', el => el.getAttribute('href'));
        return item.evaluate(el => el.textContent?.trim() || '');
        

      })
    );

    const cleanedTeamNames = teamNames.filter((name): name is string => name !== '');
    teams.push(...cleanedTeamNames);

    console.log(`Teams for ${regionURL}:`, teams);
    return teams;
  } catch (error) {
    console.error('Error during team scraping:', error);
    return [];
  } finally {
    await browser.close();
  }
};

export default teamScraper;
*/