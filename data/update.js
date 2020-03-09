const got = require("got");
const cheerio = require("cheerio");

module.exports = async()=>{
    var res = got("https://www.worldometers.info/coronavirus/");
    const $ = cheerio.load(res);
    var table = $("tbody");
    var cases = $(".maincounter-number");

    var all = cases[0].text();
    var death = cases[1].text();
    var recovered = cases[2].text();

    console.log("[ALL] " + all);
    console.log("[DEATH] " + death);
    console.log("[RECOVERED] " + recovered);
}

if(require.main == module){
    module.exports();
}