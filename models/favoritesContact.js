const fs = require('fs')
const path = require('path')
const Contact = require('../models/contact')

class FavoritesContact{


static getAllFavoritesContactInDB(){
return new Promise((resolve,reject)=>{
fs.readFile(
path.join(__dirname, '..', 'dataBase', 'favoritContactDB.json'),
'utf-8',
(err,content)=>{
if(err){
    reject(err)
} else {
    resolve(JSON.parse(content))
}
}
)
})
}

static async deleteContactFavorite(id){
const contactFavoritesList = await FavoritesContact.getAllFavoritesContactInDB()
// получаем cписок избранных контактов из нашей БД dataBase/favoritContactDB.json
const contactFavoritesListUPD = contactFavoritesList.filter(c => c.id !== id)
return new Promise((resolve,reject)=>{
fs.writeFile(
path.join(__dirname, '..', 'dataBase', 'favoritContactDB.json'),
JSON.stringify(contactFavoritesListUPD),
(err)=>{
if(err){
reject(err)
} else {
resolve()
}
}
)
})
}

static async saveFavoritesContact(id){
const contactFavoritesList = await FavoritesContact.getAllFavoritesContactInDB()
// получаем cписок избранных контактов из нашей БД dataBase/favoritContactDB.json
const contactAllList = await Contact.getAllContactInDB()
// получаем cписок всех контактов из нашей БД dataBase/contactDB.json
const contactFavorites = contactAllList.findIndex(c => c.id === id)
// ищем в общем списке контактов - контакт с id который мы передаем в дата атрибуте при клике на кнопкку "Добавить в избранное" в data-idFavorite
const favoritesContact = contactAllList[contactFavorites]
const contactFavoritesPresent = contactFavoritesList.find(c => c.id === favoritesContact.id)

if(!contactFavoritesPresent){
contactFavoritesList.push(favoritesContact)
// пушим (добавляем) в нашу БД всех контактов - обьект с данными из контекста вызова 
// this ( т.е. из инпутов так как мы там используем метод save() в .post() запросе )
return new Promise ((resolve, reject)=>{
fs.writeFile(
path.join(__dirname, '..', 'dataBase', 'favoritContactDB.json'),
JSON.stringify(contactFavoritesList),
(err)=>{
if(err){
    reject(err)
} else {
    resolve()
}
}
)
})
}


}
}



module.exports = FavoritesContact