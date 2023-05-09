const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const contactListRoutes = require('./routes/contactList')
const contactAddRoutes = require('./routes/contactAdd')
const contactFavoritesRoutes = require('./routes/contactFavorites')
const app = express()


const hbs = exphbs.create({
    defaultLayout:'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
// говорим экспрессу что есть такой движок как handlebars,
// т.к. extname выше указали как 'hbs' то и везде теперь указываем hbs

app.set('view engine', 'hbs')
// здесь мы начинаем уже использовать его

app.set('views', 'views')
// здесь мы конфигурируем переменную views, она указывает на то,
// где будут храниться все наши файлы шаблонов в формате hbs

app.use(express.static('public'))
// таким образом мы обращаясь к express.js задаем статическиую папку - папку в которой у нас будут лежать пользовательские скрипты/картинки/стили
// и express.js при запросах различных к серверу будет смотреть именно в эту папку и мы сможем указывать путь к скриптам/картинкам/стилям
// просто через '/index.css' к примеру и express.js будет искать этот файл именно в статической папке что мы указали в нашес случае это public 

app.use(express.urlencoded({extended: true}))
// т.к все данные мы отправляем на сервер в видео Buffer'ов т.е. по частям нам нужно их обработать чтоб мы могли с ними работать
// для этого у express обращаемся к методу .urlencoded() В целом, поведение аналогично express.json() который форматирует все данные 
// в строковый формат и в него передаем обьект где указываем ключ extended в значении true, extended: true - библиотека для разбора строки запроса.
// Грубо говоря, extended: true означает, что req.body может содержать любые значения, extended: false - только строки.
// таким образом если у каждого нашего input'a есть name/type то введя в них данные и засабмитив их мы получим их в формате JSON

app.use('/', contactListRoutes)
app.use('/add', contactAddRoutes)
app.use('/favorites', contactFavoritesRoutes)
// мы указываем пути до наших роутов - которые обрабатывают различные запросы к серверу.
// используя метод .use() обращаясь к переменной app что является результатом express() мы добавляем различный middleware 
// т.е расширяем функционал нашего приложения. Мы добавляем использование наших роутов и пишем для каждого роута путь (префикс)
// по которому он будет обратывается. Для того чтоб обрабатывать отдельные роуты например /add/create - мы это пишем уже в самом роуте 
// routes/contactAdd.js но указываем уже не /add/create , а просто /create т.к. префикс /add мы указываем здесь и для других роутов так
// же указываем префиксы по аналогичной схеме регистрируя роуты и используя метод .use()






















const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Сервер запущен на ${PORT} порте`)
})
