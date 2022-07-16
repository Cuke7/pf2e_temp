let db = require('./index.js')


// db.getDataSets("classes").then(res => console.log(res))

// console.log(db.translate("Breath Weapon"))

// db.getItemById("feCnVrPPlKhl701x").then(res => console.log(res))


db.getItemById("GUnw9YXaW3YyaCAU", "en").then(function (res) {
    console.log(res)
})