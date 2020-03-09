const got = require("got");
const cheerio = require("cheerio");

function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

module.exports = async () => {
    console.log("Fetching...");
    var res = await execShellCommand("curl https://www.worldometers.info/coronavirus/");

    console.log("Parsing");
    const $ = cheerio.load(res);
    var table = $("tbody");
    var cases = $(".maincounter-number");

    var all = cases[0].childNodes[1].children[0].data;
    var death = cases[1].childNodes[1].children[0].data;
    var recovered = cases[2].childNodes[1].children[0].data;

    console.log("[ALL] " + all);
    console.log("[DEATH] " + death);
    console.log("[RECOVERED] " + recovered);

    console.log("Done");
}

(async () => {
    if (require.main == module) {
        var keepingAlive = setInterval(() => {}, 1000);
        await module.exports();
        clearInterval(keepingAlive);
    }
})();