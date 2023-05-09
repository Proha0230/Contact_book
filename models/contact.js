const {v4 : uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

class Contact{
    constructor(phone, fio, dob){
        this.phone = phone
        this.fio = fio
        this.dob = dob
        this.id = uuidv4()
    }

    async save(){
        const contactAllList = await Contact.getAllContactInDB()
        // получаем весь список контактов из нашей БД dataBase/contactDB.json
        contactAllList.push(this.toJSON())
        // пушим (добавляем) в нашу БД всех контактов - обьект с данными из контекста вызова 
        // this ( т.е. из инпутов так как мы там используем метод save() в .post() запросе )
        return new Promise ((resolve, reject)=>{
            fs.writeFile(
                path.join(__dirname, '..', 'dataBase', 'contactDB.json'),
                JSON.stringify(contactAllList),
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
// далее мы вовзращаем результат выполнения Promise в котором обращаемся к модулю fs и его методу записи данных в файл .writeFile() в нем
// указываем путь до файла в который хотим записать что либо через модуль path и его метод join() дальше мы приводим к строке те данные что 
// хотим записать в файл нашей базы данных всех контактов в нашем случае с помощью обращения к глобальному обьекту JSON и его метода
// приведение данных в строковый формат .stringify() где указываем полученную нами БД со всеми контактами но уже измененную, ведь мы в нее
// запушили данные с наших input'ов перед записью в файл БД и далее обрабатываем ошибку если есть.


    toJSON(){
        return {
        phone: this.phone,
        fio: this.fio,
        dob: this.dob,
        id: this.id
        }
    }
// возвращаем обьект в котором данные из контекста вызова this ( т.е. из инпутов так как мы там используем метод save() в .post() запросе )
// и назначаем их в переменные в которых они будут записаны в файл БД всех контактов

    static async getContactByID(id){
    const contact = await Contact.getAllContactInDB()
    const idx = contact.findIndex(c => c.id === id)
    return contact[idx]
    }

    static async updateContact(contact){    
    const contactList = await Contact.getAllContactInDB()
    const idx = contactList.findIndex(c => c.id === contact.id)
    contactList[idx] = contact

    return new Promise((resolve, reject)=>{
        fs.writeFile(
        path.join(__dirname, '..', 'dataBase', 'contactDB.json'),
        JSON.stringify(contactList),
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

    static async deleteContact(id){
    const contactList = await Contact.getAllContactInDB()
    const contactListUPD = contactList.filter(c => c.id !== id)
    return new Promise((resolve,reject)=>{
    fs.writeFile(
    path.join(__dirname, '..', 'dataBase', 'contactDB.json'),
    JSON.stringify(contactListUPD),
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

    static getAllContactInDB(){
    return new Promise((resolve,reject)=>{
    fs.readFile(
    path.join(__dirname, '..', 'dataBase', 'contactDB.json'),
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
    // в методе getAllContactInDB() мы обращаемся к модулю filesystem сокр. fs где указываем путь с помощью модуля path и его метода .join()
    // далее указываем кодировку для получения текстового содержимого файла и затем обрабаываем возможную ошибку и если ошибки нет то вызываем
    // метод resolve в случае успешного завершения асинхронной операции promise где мы с помощью обращения к глобальному обьекту JSON и его метода
    // .parse() парсим (преобразовываем данные из формата JSON т.е. строкового) тот контент (содержимое нашего файла) который находится в нашем
    // файле contactDB.json



}

module.exports = Contact