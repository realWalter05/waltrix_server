const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors())

app.get("/get_api_links", async (req, res) => {
    // First layer of stealing the links (https://seapi.link)
    const id = req.query.id;
    const season = req.query.s;
    const episode = req.query.e;

    if (!id)
        // Return if ID missing
        res.json({
                "status" : "error",
                "reason" : "id_missing",
        });

    // Get response based on series or movies
    let url = "https://seapi.link/?type=tmdb&id="+id;+"&max_results=1";
    if (season != undefined && episode != undefined)
        url = "https://seapi.link/?type=tmdb&id="+id+"&season="+season+"&episode="+episode+"&max_results=1";

    // Fetch and get json
    const apiLinks = await fetch(url);
    const jsonLinks = await apiLinks.json();
    res.json({
        "status" : "success",
        "response" : jsonLinks
    });
})

app.get("/", async (req, res) => {
    console.log(req.query.url);
    const url = 'https://seapi.link/?type=tmdb&id='+req.query.tmdb_id;+'&max_results=1';
    const response = await fetch(url);
    const data = await response.json();

    const first = data?.results.filter(result => result.server == "upstream");
    const urlNext = first[0].url;
    const anotherResponse = await fetch(urlNext);
    const anotherRes = await anotherResponse.text();
    if (!anotherRes.includes("window.atob(")) {
        res.json({"pirate_link" : "", "status" : "captcha"});
    }
    const realLink = anotherRes.split("window.atob('")[1].split("')+")[0];
    res.json({"pirate_link" : realLink, "status" : "success"});
})

app.listen(5000, () => { console.log("Server is running on port 5000") });