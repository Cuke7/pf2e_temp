let db = require('./index.js')


// db.getDataSets("classes").then(res => console.log(res))

//console.log(db.translateToFr("Breath Weapon"))

// db.getItemById("feCnVrPPlKhl701x").then(res => console.log(res))


//db.getItemById("GUnw9YXaW3YyaCAU", "en").then(function (res) {
//    console.log(res)
//})

//db.getDataEn("GUnw9YXaW3YyaCAU").then(res => console.log(res))
db.getDataFr("GUnw9YXaW3YyaCAU").then(res => console.log(res))