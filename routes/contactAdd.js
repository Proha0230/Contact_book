const {Router} = require('express')
const Contact = require('../models/contact')
const router = Router()


router.get('/', (req,res)=>{
    res.render('contactAdd', {
        title: 'Добавить контакт',
        contactAdd: true
    })
})

router.post('/', async (req,res)=>{
    const contact = new Contact(req.body.phone, req.body.fio, req.body.dob)
    await contact.save()
    res.redirect('/')
})
// мы получаем данные в формате JSON с наших инпутов со страницы contactAdd в request.body и можем с ними работать. Чтоб их сохранить
// мы создадим модель которая будет работать с этими данными
// как ответ response от сервера на наш запрос мы делаем редирект ( res.redirect('/') ) на главную страницу. 

module.exports = router