const {Router} = require('express')
const FavoritesContact = require('../models/favoritesContact')
const router = Router()

router.get('/', async (req,res)=>{
    const contactFavoriteList = await FavoritesContact.getAllFavoritesContactInDB()
    res.render('contactFavorites', {
        title: 'Избранные контакты',
        contactFavorites: true,
        contactFavoriteList
    })
})

router.delete('/deleteContact/:id', async (req,res)=>{
    await FavoritesContact.deleteContactFavorite(req.params.id)
    res.redirect('/') // при использовании клиентского JS он не будет работать. Если используем
    // кнопку удалить через форму с методом POST тогда редирект будет работать
})


module.exports = router