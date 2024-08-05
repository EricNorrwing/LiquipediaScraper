import regionScraper from "./RegionScraper"


const app = async () => {
    const scrapeURL = "https://liquipedia.net/dota2/Main_Page";
    

    const RegionList = regionScraper();

  
    // '.panel-box-heading' is the name of the box containing each region
    // await regionScraper(testURL, ['.panel-box-heading']);


  };
  
  app();