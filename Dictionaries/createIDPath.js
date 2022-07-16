let fs = require('fs')

temp().then(res => console.log(res))

async function temp() {
    let idMap = []
    const folderList = fs.readdirSync("./PF2E_DATA_EN")
    for (const folder of folderList) {
        const files = fs.readdirSync("./PF2E_DATA_EN/" + folder)
        for (const file of files) {
            const data = await fs.promises.readFile("./PF2E_DATA_EN/" + folder + "/" + file);
            let item = JSON.parse(data)
            idMap.push({ id: item._id, path: folder + "/" + file })
        }
    }
    fs.writeFileSync("./idPaths.json", JSON.stringify(idMap));
    return Promise.resolve(idMap)
}