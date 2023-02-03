const items = [{
        place: 1,
        login: "smitd@gmail.com",
        confirmedOrders: 312,
        status: "Ценитель красоты",
    },
    {
        place: 2,
        login: "lenin@gmail.com",
        confirmedOrders: 120,
        status: "Поставщик аксессуаров",
    },
    {
        place: 3,
        login: "mask@gmail.com",
        confirmedOrders: 98,
        status: "Конкурент минздрава",
    },
    {
        place: 4,
        login: "dog@mail.tu",
        confirmedOrders: 64,
        status: "рыбак",
    },
    {
        place: 5,
        login: "nightmare@gmail.com",
        confirmedOrders: 34,
        status: "охотник",
    },
    {
        place: 6,
        login: "cat@mail.ru",
        confirmedOrders: 1,
        status: "Ценитель красоты",
    },
];

let currentState = [...items];
const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");


function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";


    arr.forEach((item) => {
        itemsContainer.append(preparShopItem(item));
    })
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }

}

function sortByAlphabet(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase()
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}
renderItems(currentState.sort((a, b) => sortByAlphabet(a.status, b.status)));

function preparShopItem(shopItem) {

    const { place, login, confirmedOrders, status } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector(".place").textContent = place;
    item.querySelector(".login").textContent = login;
    item.querySelector(".confirmedOrders").textContent = confirmedOrders;
    item.querySelector(".status").textContent = status;

    return item;
}


const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "maximum":
            {
                // По количеству подтв. заказов(max)
                currentState.sort((a, b) => b.confirmedOrders - a.confirmedOrders);
                break;
            }
        case "minimum":
            {
                // По количеству подтв. заказов(min)
                currentState.sort((a, b) => a.confirmedOrders - b.confirmedOrders);
                break;
            }
        case "alphabet":
            {
                // По алфавиту
                currentState.sort((a, b) => sortByAlphabet(a.status, b.status));
                break;
            }
    }
    renderItems(currentState);
});



const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.login.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a.status, b.status));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);