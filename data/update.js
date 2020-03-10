const got = require("got");
const cheerio = require("cheerio");
const fs = require("fs");

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

    var out = {};

    console.log("Parsing");
    const $ = cheerio.load(res);
    var lines = $("tbody")[0].children;
    var cases = $(".maincounter-number");

    var all = cases[0].childNodes[1].children[0].data;
    var death = cases[1].childNodes[1].children[0].data;
    var recovered = cases[2].childNodes[1].children[0].data;

    var countries = {};

    for(var i = 0; i < lines.length; i++){
        if(i % 2 != 1)continue;

        var name = lines[i].children[1].children[1];
        
        if(!name)break;

        if(name.type == "text"){
            name = name.data;
        } else {
            //link
            name = name.children[0].data;
        }

        var o = {};
        var lang = [
            "Country", null, "cases", null, "deaths", "recovered", "active", "serious", "casePerMil"
        ];
        var pt = 0;

        for(var u = 0; u < lines[i].children.length; u++){
            if(lines[i].children[u].type != "tag")continue;
            if(lang[pt] == null){
                pt++;
                continue;
            }

            o[lang[pt]] = lines[i].children[u].children[0].data.trim();
            pt++;
        }

        o["Country"] = name;
        countries[name] = o;
    }

    console.log("Done");

    out.global = {
        all,
        death,
        recovered
    }
    out.contries = countries;

    fs.writeFileSync(__dirname + "/cases.json", JSON.stringify(out));
    return out;
}

(async () => {
    if (require.main == module) {
        var keepingAlive = setInterval(() => {}, 1000);
        await module.exports();
        clearInterval(keepingAlive);
    }
})();