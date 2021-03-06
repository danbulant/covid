const express = require("express");
const app = express();
const PORT = 1025;

var cases = {};

app.get("/", (req, res)=>{
    res.json({
        code: 200,
        type: "nothing_to_show"
    });
});

app.get("/country/:country", (req, res)=>{
    if(!cases.countries){
        cases = JSON.parse(require("fs").readFileSync(__dirname  + "/../data/cases.json"));
    }
    if(!cases.countries[req.params.country]){
        return res.status(404).json({
            code: 404,
            type: "e_country_not_found"
        });
    }
    res.json({
        code: 200,
        type: "country",
        data: cases.countries[req.params.country]
    });
});

app.get("/global", (req, res)=>{
    if(!cases.global){
        cases = JSON.parse(require("fs").readFileSync(__dirname  + "/../data/cases.json"));
    }
    res.json({
        code: 200,
        type: "country_global",
        data: cases.global
    });
});


app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({
        code: 500,
        type: "e_internal"
    });
})

app.listen(PORT, ()=>{
    console.log("[APP] Ready on port " + PORT);
})