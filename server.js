const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors())

app.get("/get_api_links", async (req, res) => {
    // First layer of stealing the links
    const id = req.query.id;
    const season = req.query.s;
    const episode = req.query.e;

    if (!id) {
        // Return if ID missing
        return res.json({
                "status" : "error",
                "reason" : "id_missing"
        });
    }

    // Get response based on series or movies
    let url = "https://getsuperembed.link/?video_id="+id+"&tmdb=1";
    if (season != undefined && episode != undefined)
        url = "https://getsuperembed.link/?video_id="+id+"&tmdb=1&season=1&episode=1";

    // Fetch and get json
    const apiLinks = await fetch(url);
    if (!apiLinks) {
        // Return if API error missing
        return res.json({
            "status" : "error",
            "reason" : "api_error"
    });
    }
    const videoLink = await apiLinks.text();
    return res.json({
        "status" : "success",
        "response" : videoLink
    });
})

app.get("/scrape", async (req, res) => {
    const puppeteer = require('puppeteer')

    async function getVisual() {
        try {
            const URL = req.query.url
            const browser = await puppeteer.launch()

            const page = await browser.newPage()
            await page.goto(URL)

            await page.click("#play")
            let v = await page.$(".input-button-click");
            console.log(v);

            await page.screenshot({ path: 'screenshot.png' })
            await page.pdf({ path: 'page.pdf' })

            await browser.close()
        } catch (error) {
            console.error(error)
        }
    }

    getVisual()
})

app.listen(5000, () => { console.log("Server is running on port 5000") });