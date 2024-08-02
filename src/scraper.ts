import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, executablePath } from 'puppeteer';

// Add the stealth plugin to puppeteer-extra
puppeteer.use(StealthPlugin());

const main = async () => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath(),
  });
  const page = await browser.newPage();

  const url = 'https://bot.sannysoft.com/';

  await page.goto(url);
  await page.screenshot({ path: 'bot.jpg' });

  await browser.close();
};

main().catch(console.error);
