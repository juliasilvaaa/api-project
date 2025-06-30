// let button = document.getElementById('buttonCard')
// let card = document.getElementById('cardInfo')

// button.addEventListener('click', function() {
//     card.classList.toggle('elevated')
// })



// Pesquisa de usuarios de acordo com o nome 
const searchUser = document.getElementById('search')

searchUser.addEventListener('input', (event) => {
    const value = (event.target.value)

    // Colocando nossa função 
    console.log(formatString(value))
} )

// Formatando
function formatString(value){
    return value
        .toLoweCase()
        // Tirar os espaços 
        .trim();
}