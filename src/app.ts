import playerScraper from "./Controllers/PlayerScraper";
import regionScraper from "./Controllers/RegionScraper"
import teamScraper from "./Controllers/TeamScraper";
import { Region } from "./models/Region";
import { Team } from "./models/Team";


const app = async () => {
   /*
    const regionList: Region[] = await regionScraper();
    let teamList: Team[] = []

    for (const region of regionList) {
        const teams = await teamScraper(region.url)
        teamList = teamList.concat(teams)
    }
    */

    
    playerScraper()
    //console.log(teamList)
  };
  
  app();