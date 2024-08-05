import regionScraper from "./RegionScraper"
import teamScraper from "./TeamScraper";


const app = async () => {
    const scrapeURL = "https://liquipedia.net/dota2/Main_Page";
    

    const regionList: Region[] = await regionScraper();
    let teamList: Team[] = []

    for (const region of regionList) {
        const teams = await teamScraper(region.url)
        teamList = teamList.concat(teams)
    }
    

  };
  
  app();