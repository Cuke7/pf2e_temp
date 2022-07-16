const fs = require('fs');
let glob = require('glob');
let dictionary = require('./fullDictionary2.json')

exports.translate = function (nameEN) {
    let translation = dictionary.find(item => item.nameEN.toLowerCase() === nameEN.toLowerCase())
    if (translation) return translation.nameFR
    return undefined
}

exports.getDataSets = function (category) {
    return new Promise(async function (resolve, reject) {
        glob("PF2E_data_EN/" + category + ".db/*.json", async function (er, files) {
            let result = await readFiles(files)
            resolve(result)
        })
    })
}

exports.getItemById = async function (itemID, lang) {
    if (lang == "fr") {
        let err = { nameFR: null, descriptionFR: null, references: [] }

        return new Promise(function (resolve, reject) {
            let item = dictionary.find(item => item.link.split("/")[1].includes(itemID))
            if (!item) resolve(err)

            let nameFR = item.nameFR
            let category = item.link.split("/")[0]
            let id = item.link.split("/")[1]

            fs.readFile("PF2E_data_FR/" + category + "/" + id + ".htm", "utf8", function (err, data) {
                if (err) resolve(err)
                let description = null
                description = data.split("Description (fr) ------\r\n")[1]
                // description = data.split("Description (fr) ------\n")[1]
                if (!description) resolve(err)
                let references = []
                let regex =
                    /@Compendium\[pf2e\.[ ]*?([A-z-0-9]*?)\.[ ]*?([A-z0-9]*?)\]\{(.*?)[\}|\]*]/gm;
                let descriptionFR = description;
                let matchs = descriptionFR.matchAll(regex);
                let count = '*';
                for (const match of matchs) {
                    descriptionFR = descriptionFR.replace(
                        match[0],
                        "<b>" + match[3] + count + "</b>"
                    );
                    references.push({
                        name: match[3],
                        id: match[2],
                    })
                    count += "*"
                }
                resolve({ nameFR, descriptionFR, references })
            })
        })
    }

    if (lang == "en") {
        const folderList = fs.readdirSync("PF2E_data_EN")
        for (const folder of folderList) {
            const files = fs.readdirSync("PF2E_data_EN/" + folder)
            for (const file of files) {
                const data = await fs.promises.readFile("PF2E_data_EN/" + folder + "/" + file);
                let item = JSON.parse(data)
                if (item._id == itemID) return Promise.resolve(item)
            }
        }
    }

    return Promise.resolve(null)
}

async function readFiles(files) {
    let out = {}
    for (const file of files) {
        const data = await fs.promises.readFile(file);
        let nameEN = file.split("/")[2].split(".json")[0]
        let fileData = Buffer.from(data);
        out[nameEN] = JSON.parse(fileData.toString())
    }
    return out
}