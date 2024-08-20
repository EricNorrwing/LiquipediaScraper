import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, executablePath } from "puppeteer";
import { Player } from "../models/Player";
import baseURL from "../baseUrl";

puppeteer.use(StealthPlugin());

const playerScraper = async (relPlayerURL: string): Promise<Player[]> => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath(),
  });

  //const scrapeURL: string = baseURL + relPlayerURL;
  const scrapeURL = relPlayerURL
  let player: Player[] = [];

  try {
    const page = await browser.newPage();
    await page.goto(scrapeURL);

    const ignSelector: string = ".firstHeading";

    const ign = await page.$eval(ignSelector, (el) => el.textContent?.trim() || "");
    let name = "";
    let nationality = "";
    let earnings = 0;
    let dateOfBirth = "";
    let region = "";
    let yearsActive = "";
    let currentRoles: string[] = [];
    let team = "";
    

    const playerInfo = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll("div.infobox-cell-2.infobox-description"));

      labels.forEach((labelElement) => {
        const label = labelElement.textContent?.trim();

        switch (label) {
          case "Name:":
            name = labelElement.nextElementSibling?.textContent?.trim() || "";
            break;
          case "Nationality:":
            nationality = labelElement.nextElementSibling?.textContent?.trim() || "";
            break;
          case "Approx. Total Winnings:":
            const earningsText = labelElement.nextElementSibling?.textContent?.replace(/[^0-9.]/g, "").trim() || "0";
            earnings = Number(earningsText);
            break;
          case "Born:":
            dateOfBirth = labelElement.nextElementSibling?.textContent?.trim() || "";
            break;
          case "Region:":
            region = labelElement.nextElementSibling?.textContent?.trim() || "";
            break;
          case "Years Active (Player):":
            yearsActive = labelElement.nextElementSibling?.textContent?.trim() || "";
            break;
          case "Current Role:":
            currentRoles = labelElement.nextElementSibling?.textContent?.split(',').map(role => role.trim()) || [];
            break;
          case "Team:":
            team = labelElement.nextElementSibling?.textContent?.trim() || "";
            break;
          default:
            break;
        }
      });

      return {
        name,
        nationality,
        earnings,
        dateOfBirth,
        region,
        yearsActive,
        currentRoles,
        team,
      };
    });

    if (ign) {
      player.push({
        ign,
        name: playerInfo.name,
        nationality: playerInfo.nationality,
        earnings: playerInfo.earnings,
        dateOfBirth: playerInfo.dateOfBirth,
        region: playerInfo.region,
        yearsActive: playerInfo.yearsActive,
        currentRoles: playerInfo.currentRoles,
        team: playerInfo.team,
        url: scrapeURL,
      });
    }
    console.log(player);

    return player;
  } catch (error) {
    console.error("Error during player scraping:", error);
    return [];
  } finally {
    await browser.close();
  }
};

export default playerScraper;
