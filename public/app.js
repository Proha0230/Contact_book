const $contactInfo = document.querySelector('.contactInfoList')
const $mainTableContactList = document.querySelector('.mainTableContactList')

if($contactInfo){
    $contactInfo.addEventListener('click', event =>{
        if(event.target.classList.contains('deletebutton')){
            const id = event.target.dataset.id
            fetch('/deleteContact/' + id, {
                method: 'DELETE'
            })
            setTimeout(()=>{
            window.location.href = '/'
            }, 300)
        }
        // таким образом на нативном JS совершаем переход по указанной ссылке через 300мс 
        
        else if (event.target.classList.contains('addFavoriteButton')){
            const idfavorites = event.target.dataset.idfavorite
            fetch('/addContactFavorites/' + idfavorites, {
                method: 'POST'
            })
            setTimeout(()=>{
                window.location.href = '/favorites'
                }, 300)
        } 
        
        else if(event.target.classList.contains('backButton')){
            setTimeout(()=>{
                window.location.href = '/', 300
                }, 300)
        } 
        
        else if(event.target.classList.contains('editButton')){
            const idedit = event.target.dataset.idedit
            fetch('/editContact/' + idedit, {
                method: 'GET'
            })
            setTimeout(()=>{
                window.location.href = '/editContact/' + idedit
                }, 300)
        }
    })
} 

if($mainTableContactList){
    $mainTableContactList.addEventListener('click', event => {
        if(event.target.classList.contains('deleteFavoritesContact')){
            const idDeleteFavorite = event.target.dataset.iddeletefavorite
            fetch('/favorites/deleteContact/' + idDeleteFavorite, {
                method: 'DELETE'
            })
            setTimeout(()=>{
            window.location.href = '/favorites'
            }, 300)
// таким образом на нативном JS совершаем переход по указанной ссылке через 300мс
        } 

    })

}