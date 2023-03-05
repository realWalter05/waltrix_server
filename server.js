const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors())


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
    console.log(s);
    res.json({"pirate_link" : realLink, "status" : "success"});
})

app.listen(5000, () => { console.log("Server is running on port 5000") });