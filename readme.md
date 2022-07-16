# pf2e-database
pf2e-database is a module alowing to access data from Pathfinder 2E.
### Get datasets
#### `db.getDataSets(dataSetName) -> promise`
See the list of allowed **_dataSetName_** arguments [here](https://github.com/foundryvtt/pf2e/tree/master/packs/data).
**Exemple:**
```javascript
const db = require("pf2e-database");
let set = await db.getDataSets("classes");
console.log(set);
/*
{
  alchemist: {
    _id: 'XwfcJuskrhI9GIjX',
    data: {
      ancestryFeatLevels: [Object],
      attacks: [Object],
      classDC: 1,
      classFeatLevels: [Object],
      defenses: [Object],
      description: [Object],
      generalFeatLevels: [Object],
      hp: 8,
      items: [Object],
      keyAbility: [Object],
      perception: 1,
      rules: [Array],
      savingThrows: [Object],
      skillFeatLevels: [Object],
      skillIncreaseLevels: [Object],
      source: [Object],
      trainedSkills: [Object],
      traits: [Object]
    },
    img: 'systems/pf2e/icons/classes/alchemist.webp',
    name: 'Alchemist',
    type: 'class'
  },
  barbarian: {
    _id: 'YDRiP7uVvr9WRhOI',
    data: {
      ancestryFeatLevels: [Object],
      attacks: [Object],
      ...
*/
```
### French translation
#### `db.translate(item) -> string`
Get the french translation for the **_item_** provided.
**Exemple:**
```javascript
const db = require("pf2e-database");
let nameFR = db.translate("Breath Weapon");
console.log(nameFR);
// Arme de souffle
```
### French description
#### `db.getItemById(id) -> promise`
Get the french description for an item by providing his **_id_**. Whenever the description makes a reference to another item, the item name and id is provided in the **_references_** field.
**Exemple:**
```javascript
const db = require("pf2e-database");
let description = db.getItemById("Xg57qG1rOfSSobke");
console.log(description);
/*
{
  nameFR: 'Parangon du lignage',
  descriptionFR: '<p>Vous maîtrisez à présent parfaitement la magie de votre lignage. Ajoutez deux sorts communs de niveau 10 de votre tradition à votre répertoire. Vous gagnez un unique emplacement de sort de niveau 10 que vous pouvez utiliser pour lancer l’un de ces deux sorts avec la capacité d’incantation de l’ensorceleur. Au contraire des autres emplacements de sort, vous ne gagnez pas plus de 
sorts de niveau 10 lorsque vous montez de niveaux et vous ne pouvez pas les utiliser avec des capacités qui vous permettent de lancer des sorts sans dépenser d’emplacements ou avec des pouvoirs qui vous procurent davantage d’emplacements de sort. Vous pouvez prendre le don d’ensorceleur <b>Perfection du lignage*</b> pour gagner un deuxième emplacement.</p>\r\n',
  references: [ { name: 'Perfection du lignage', id: '6SEDoht4dXEJE5SW' } ]
}
*/
```
