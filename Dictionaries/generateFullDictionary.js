//
// Don't forget to remove the first lines of dictionnaire-fr.md
//
const fs = require("fs");
let fullDictionary = []
fs.readFile("./dictionnaire-fr.md", "utf8", function (err, data) {
    if (err) throw err;
    let categories = data.split("##")
    for (let i = 1; i < categories.length; i++) {
        let category = categories[i]

        for (line of category.split("\n")) {
            if (line.includes("|[")) {
                let nameFR = line.split("](")[0].split("|[")[1]
                let nameEN = line.split("|")[2].split("|")[0]
                if (nameFR != "") {
                    let pathFR = line.split("](")[1].split(".htm)")[0]
                    let id = pathFR.split('/')[1]
                    fullDictionary.push({
                        id: id,
                        nameFR: nameFR,
                        nameEN: nameEN,
                        pathFR: pathFR,
                    })
                }
            }
        }

    }
    fs.writeFileSync("dictionary.json", JSON.stringify(fullDictionary));
});