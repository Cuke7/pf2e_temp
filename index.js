const fs = require('fs');
let glob = require('glob');
let dictionary = require('./Dictionaries/dictionary.json')
let idpaths = require('./Dictionaries/idPaths.json')

exports.translateToFr = function (nameEN) {
    let translation = dictionary.find(item => item.nameEN.toLowerCase() === nameEN.toLowerCase())
    if (translation) return translation.nameFR
    return undefined
}

exports.getDataSets = function (category) {
    return new Promise(async function (resolve, reject) {
        glob("PF2E_DATA_EN/" + category + ".db/*.json", async function (er, files) {
            let result = await readFiles(files)
            resolve(result)
        })
    })
}

exports.getDataEn = async function (itemID) {
    let itemTemp = idpaths.find(item => item.id == itemID)
    if (!itemTemp) return Promise.resolve(null)
    const data = await fs.promises.readFile("./PF2E_DATA_EN/" + itemTemp.path);
    let item = JSON.parse(data)
    return Promise.resolve(item)
}

exports.getDataFr = async function (itemID) {
    let err = { nameFR: null, descriptionFR: null, references: [] }
    let item = dictionary.find(item => item.pathFR.split("/")[1].includes(itemID))
    if (!item) return Promise.resolve(err)
    let nameFR = item.nameFR
    let data = await fs.promises.readFile("PF2E_DATA_FR/" + item.pathFR + ".htm").catch(err => console.log(err))
    if (!data) return Promise.resolve(err)
    let description = null
    data = data + ""
    //description = data.split("Description (fr) ------\r\n")[1]
    description = data.split("Description (fr) ------\n")[1]
    if (!description) return Promise.resolve(err)
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
    return Promise.resolve({ nameFR, descriptionFR, references })
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