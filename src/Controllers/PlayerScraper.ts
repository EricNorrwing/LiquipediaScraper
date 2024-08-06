import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, ElementHandle, executablePath } from "puppeteer";
import baseUrl from "../baseUrl";
import { Player } from "../models/Player";

puppeteer.use(StealthPlugin());

const playerScraper = async (relPlayerURL: string): Promise<Player[]> => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath(),
  });

  const selector: string = ".wikitable wikitatable-striped roster-card";

  const scrapeURL: string = baseUrl() + relPlayerURL;
  let players: Player[] = [];

  try {
    const page = await browser.newPage();
    await page.goto(scrapeURL);

    const playersElements: ElementHandle<Element>[] = await page.$$(selector);

    for (const playerElement of playersElements) {
      const name = await playerElement.$eval("a",(el) => el.textContent?.trim() || "")
      const earnings = await playerElement.$eval("a",(el) => el.getAttribute("href") || "")

      players.push({name ,earnings})
    }


    return players;
  } catch (error) {
    console.error("Error during player scraping:", error, "at url", relPlayerURL);
    return [];
  } finally {
    await browser.close();
  }

  return players;
};

export default playerScraper;
