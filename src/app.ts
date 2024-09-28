import playerScraper from "./Controller/PlayerScraper";
import regionScraper from "./Controller/RegionScraper"
import teamScraper from "./Controller/TeamScraper";
import { Region } from "./model/Region";
import { Team } from "./model/Team";
import PlayerScraper from "./Controller/PlayerScraper";

import {PlayerExtractor} from "./extractor/player/PlayerExtractor";
import {Player, showPlayer} from "./model/Player";


const app = async () => {
   
    // const regionList: Region[] = await regionScraper();
    // let teamList: Team[] = []
    //
    // for (const region of regionList) {
    //     const teams = await teamScraper(region.url)
    //     console.log(teams)
    //     teamList = teamList.concat(teams)
    // }


    //const player = await playerScraper("/dota2/MiCKe");


    //showPlayer(player[1])
    //console.log(teamList)

  let player: Player = await playerScraper("/dota2/Puppey");
  console.log(player);
};
  
  app();