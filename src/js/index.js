let button = document.getElementById('buttonCard')
let card = document.getElementById('cardInfo')

button.addEventListener('click', function() {
    card.classList.toggle('elevated')
})