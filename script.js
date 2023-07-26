// Prohibit 'e' and '-' in the input zone
document.querySelector('input[type="number"]').addEventListener('keydown', event => {
    if (event.key === 'e' || event.key === '-') {
        event.preventDefault();
    }
});

////////////////////////
// public variable /////
////////////////////////
const table = document.getElementById('table');
const childs = table.children;
const resetBtn = document.getElementById('reset');
const arrData = JSON.parse(localStorage.getItem("data"));
const distBtn = document.getElementById('distribution');

// Making an array of a deck and shuffle
let shuffledCards = [];
const Deck = function() {
    let result = [];
    const pattern = ['S', 'H', 'D', 'C'];
    const number = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K'];
    pattern.forEach(a1 => {
        number.forEach(a2 => {
            result.push(a1 + '-' + a2);
        });
    });

    const order = [...Array(52)].map((_, i) => i);
    const randomNum = order.sort(_ => Math.random() - 0.5).splice(0, 52);

    randomNum.forEach(n => {
        let numbers = parseInt(n);
        shuffledCards.push(result[numbers]);
    });
};
Deck();

// Calculate the number of cards
distBtn.addEventListener('click', function() {
    let players = parseInt(document.querySelector('input[type="number"]').value);
    let cardNum = Math.floor(52 / players);
    let leftOver = 52 % players;
    let Arr = [];
    // Check if there are leftovers and adjust number of cards
    if (leftOver !== 0) {
        cardNum += 1;
    }
    // Distribute cards 
    const Distribution = function() {
        // Initialize UI
        initialize()
        // Creating arrays as same number of players
        for (let e = 0; e < players; e++) {
            Arr.push([]);
        }
        // Distributing cards to the array which made above
        for (let e = 1; e <= cardNum; e++) {
            Arr.forEach(Current => {
                let x = shuffledCards.shift();
                if (x !== undefined) {
                    Current.push(x);
                }
            });
        }
        // Preserving the data at localStorage
        arrJson = JSON.stringify(Arr);
        localStorage.setItem("data",arrJson)

        // Creating UI
        createUi(Arr)

        // Reseting the array and shuffle cards again
        Arr = [];
        Deck();
    };

    // Detecting inappropriate numbers and displays an error.
    if (players <= 0 || isNaN(players)) {
        alert('Input value does not exist or value is invalid');
        document.querySelector('input[type="number"]').value = null;
    } else {
        Distribution();
    }
})

// When the page is reloaded, if data remains in local storage, create the UI
window.onload = function(){
    // UI
    if(arrData !== null){
        createUi(arrData )
    }
}

// Reseting the data and UI
resetBtn.addEventListener('click', function() {
    initialize()
})


// //////////////////////
// public functions /////
////////////////////////

// UI generater
let createUi = function(uidata){
    table.classList.add("table_color");
    uidata.forEach((i, index) => {
        let cardContent = "";
        i.forEach(card => {
            cardContent += `<li class="cards_item"><img src="/img/${card}.png"></li>`;
        });
        let playerHtml = `<div class="player">` +
            ` <p class="player_name">Player${index + 1}</p>` +
            ` <ul class="cards">` +
            `${cardContent}` +
            `</ul>` +
            `<div>`;
        table.insertAdjacentHTML('beforeend', playerHtml);
    });
}


// Initialize UI
let initialize = function(){
    table.classList.remove("table_color");
    Array.from(childs).forEach(child => {
        child.remove();
    });
    document.querySelector('input[type="number"]').value = null;
    localStorage.setItem("data",null)
}