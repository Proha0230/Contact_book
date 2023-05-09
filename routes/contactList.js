const {Router} = require('express')
const Contact = require('../models/contact')
const FavoritesContact = require('../models/favoritesContact')
// мы достаем через деструктуризацию обьект Router 
const router = Router()
// здесь мы создаем переменную router как результат выполнения ф-ции Router и можем
// вызывать у него различные методы .get() .post() .delete() и т.п для того чтоб наш Router работал
// нам нужно зарегистрировать роут в нашем приложении в index.js 


router.get('/', async (req,res)=>{
    const contact = await Contact.getAllContactInDB()
    res.render('contactList', {
        title: 'Список контактов',
        contactListActive: true,
        contact
    })
})

router.get('/contactInfo/:id', async (req,res)=>{
    const contact = await Contact.getContactByID(req.params.id)
    res.render('contactInfo', {
        title: `Контакт `,
        contactListActive: true, 
        contact
    })
})

router.get('/editContact/:id', async (req,res)=>{
    const contact = await Contact.getContactByID(req.params.id)
    res.render('editContact', {
        title: `Контакт `,
        contactListActive: true, 
        contact
    })
})

// здесь обрабатываем метод запроса .get() на получение данных от сервера, 
// используем метод .render() чтоб отрисовать нужный нам шаблон в папке views
// по указанной ссылке в первом параметре в нашем случае это '/' но она не будет отображаться без настроенного
// layout'a т.к. мы указали что основной layout у нас main. title - мы можем передавать разные параметры для каждого из роутов,
// в нашем случае мы передаем title - это название вкладки в браузере. contactListActive - параметр который мы передаем для отслеживания
// активной ссылки, т.е. какой роут у нас сеичас отрендерился и соотв. на какои роуте мы сеичас находимся


router.post('/editContact/:id', async (req,res)=>{
    await Contact.updateContact(req.body)
    res.redirect('/')

})

router.delete('/deleteContact/:id', async (req, res)=>{
    await Contact.deleteContact(req.params.id)
    res.redirect('/') // при использовании клиентского JS он не будет работать. Если используем
    // кнопку удалить через форму с методом POST тогда редирект будет работать
})

router.post('/addContactFavorites/:id', async (req,res)=>{
    await FavoritesContact.saveFavoritesContact(req.params.id)
    res.redirect('/favorites') // при использовании клиентского JS он не будет работать. Если используем
    // кнопку удалить через форму с методом POST тогда редирект будет работать
})


module.exports = router