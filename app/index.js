const express = require("express");
const app = express();
const PORT = 1025;

app.get("/", (req, res)=>{
    res.json({
        code: 200,
        type: "nothing_to_show"
    });
})

app.listen(PORT, ()=>{
    console.log("[APP] Ready on port " + PORT);
})