import playerScraper from "./Controllers/PlayerScraper";
import regionScraper from "./Controllers/RegionScraper"
import regionTeamScraper from "./Controllers/RegionTeamScraper";
import { Region } from "./models/Region";
import { Team } from "./models/Team";


const app = async () => {
   
    const regionList: Region[] = await regionScraper();
    let teamList: Team[] = []

    for (const region of regionList) {
        const teams = await regionTeamScraper(region.url)
        console.log(teams)
        teamList = teamList.concat(teams)
    }
    


    //playerScraper("https://liquipedia.net/dota2/MiCKe")
    console.log(teamList)
  };
  
  app();