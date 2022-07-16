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

    temp().then(function (res) {
        for (let item2 of res) {
            for (let i = 0; i < fullDictionary.length; i++) {
                if (item2.id == fullDictionary[i].id) {
                    console.log(fullDictionary[i].nameFR)
                    fullDictionary[i].pathEN = item2.path

                }
            }

        }
        fs.writeFileSync("./fullDictionary.json", JSON.stringify(fullDictionary));
    })
    // fs.writeFileSync("searchDictionary.json", JSON.stringify(searchDictionary));

});





async function temp() {
    let idMap = []
    const folderList = fs.readdirSync("PF2E_data_EN")
    for (const folder of folderList) {
        const files = fs.readdirSync("PF2E_data_EN/" + folder)
        for (const file of files) {
            const data = await fs.promises.readFile("PF2E_data_EN/" + folder + "/" + file);
            let item = JSON.parse(data)
            idMap.push({ id: item._id, path: folder + "/" + file })
        }
    }
    return Promise.resolve(idMap)
}