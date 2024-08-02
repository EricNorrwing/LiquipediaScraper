import regionScraper from "./RegionScraper"


const app = async () => {

    const scrapeURL = "https://liquipedia.net/dota2/Main_Page"

    const testURL = "https://liquipedia.net/dota2/Portal:Teams"

    await regionScraper(testURL, ['.panel-box-heading'])
    
}



app()