import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, executablePath } from "puppeteer";
import { Player } from "../models/Player";

puppeteer.use(StealthPlugin());

const playerScraper = async (): Promise<Player[]> => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath(),
  });

  const scrapeURL: string = "https://liquipedia.net/dota2/MiCKe";
  let players: Player[] = [];

  try {
    const page = await browser.newPage();
    await page.goto(scrapeURL);

    // Selector for IGN
    const ignSelector: string = ".firstHeading";

    // Extract the IGN
    const ign = await page.$eval(ignSelector, el => el.textContent?.trim() || "");

    // Extract the earnings by finding the "Approx. Total Winnings:" and then getting the adjacent sibling div
    const earnings = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('div.infobox-cell-2.infobox-description'));
      
      let earnings = 0;
      
      for (const labelElement of labels) {
        if (labelElement.textContent?.trim() === 'Approx. Total Winnings:') {
          const earningsElement = labelElement.nextElementSibling;
          if (earningsElement) {
            const earningsText = earningsElement.textContent?.replace(/[^0-9.]/g, '').trim() || "0";
            earnings = Number(earningsText);
            break;
          }
        }
      }
      
      return earnings;
    });

    // Push the player data
    if (ign) {
      players.push({ name: ign, earnings });
    }
    console.log(ign,earnings)

    return players;
  } catch (error) {
    console.error("Error during player scraping:", error);
    return [];
  } finally {
    await browser.close();
  }
};

export default playerScraper;
