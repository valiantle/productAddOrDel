let productsDataBase = [
    {
        prodID: "ID",
        name: "NAME",
        price:"PRICE",
        description: "DESCRIPTION"
    },
    {
        prodID: "1",
        name: "Aple",
        price: 2.99,
        description: "dasdasdasd"
    },
    {
        prodID: "2",
        name: "Orange",
        price: 5.20,
        description: "dasdasdasd"
    },
    {
        prodID: "3",
        name: "Saft",
        price: 3.80,
        description: "dasdasdasd"
    },
];

function idGenerator() {    //генерирует айди для след продукта пересчитывая колличество обьектов в массиве +1 
    let nextID = 0;
    for (let i = 0; i <= productsDataBase.length; i++) {
        nextID = nextID + 1
    }
    return nextID.toString(); // будущий вывод в виде айди
}

//сама функция по добавлению новых обьектов в массив
function addNew() {
    let name = document.getElementById("addName").value
    let price = parseFloat(document.getElementById("addPrice").value);
    let description = document.getElementById("addDescription").value
    const newProd = {
        prodID: idGenerator(),
        name: name,
        price: price,
        description: description
    }
    productsDataBase.push(newProd);

}
// кнопка запуска функции по добавлению новых предметов в массив
document.getElementById("addBut").addEventListener("click", function (event) {
    event.preventDefault()                                           // SADSDEGGDFSHFGHGASFDSRFZGZGDGERATZESTZ§§%&TGARETG%$&§RGF пиздец я искал 4 часа баг почему пропадали значения массива данных а это спасибо
    console.log("button clicked");                                   // стандартному поведению кнопки обновляющему страницу ситрая кэш и заодно обнуляя архив т.к. мы еще не учили базы данных в джейсоне или где ани там
    
    let name = document.getElementById("addName").value;
    let price = document.getElementById("addPrice").value;
    let description = document.getElementById("addDescription").value;
    //чекает является ли строка числом * ну тип нету ли там символов всяких буков знаков и т.п.
    if (isNaN(price) === true) {
        alert("Pls use only numbers at price field, no space no symbols and no more than 1 '.' ");
        return;
    } else if (name.length >= 21 || price.length >=21 || description.length>=21) {
        //чекает что бы ввод не превышал 20 символов
        alert("Fields cannot be longer than 20 characters.");
        return;
    } else { //если предыдущие проверки пройдены допускает к созданию обьекта
        addNew();
        console.table(productsDataBase);
        createHtml ()
    }
});

//кнопка по переписыванию обьекта под заданным продАЙДИ

document.getElementById("changeBut").addEventListener("click", function (event) {
    event.preventDefault();
    console.log("changebut was clicked");

    let productInputID = parseFloat(document.getElementById("idInput").value);

    let newName = document.getElementById("changeName").value;
    let newPrice = parseFloat(document.getElementById("changePrice").value);
    let newDescription = document.getElementById("changeDescription").value;

    if(isNaN(productInputID) === true || isNaN(newPrice) === true) {
        alert("Pls use only whole numbers inside items ID field");   //если в поле айди или новой цены не число т.е. мат действия выдадут нан тоже нельзя
        return;
    } else if (productInputID<1 || productInputID>productsDataBase.length) {
        alert("there is no such product with that ID"); // проверка на длину если выше 20 символов то нельзя
        return;
    } else if (newName.length >= 21 || newPrice.length >=21 || newDescription.length>=21) {
        //чекает что бы ввод не превышал 20 символов
        alert("Fields cannot be longer than 20 characters.");
        return;
    } else {
        //переписывает значения ключей внутри обьекта под тем индексом под которым продуктинпутАЙДИ совпадает с числом внутри ключа продАЙДИ в массиве проддатабейс
        for (let i = 0; i<productsDataBase.length; i++) {
            if (productInputID === Number(productsDataBase[i].prodID)) {
            productsDataBase[i].name = newName;
            productsDataBase[i].price = newPrice;
            productsDataBase[i].description = newDescription;
            console.table(productsDataBase);
            createHtml ();
            }
        }
    }
});
//функция по генерации хмл дока на основе имеющихся обьектов внутри массива
function createHtml () {
    let table = document.getElementById("productsDataTable");
    table.innerHTML = "" //вытираем предыдущий результаты таблицы каждый раз генерируя ее с нуля во избежании клонирования результатов
    //создаем дорожки из 5 заданных колонн на каждый элемент внутри массива 1 колонна у всех дорог будет кнопкой удаления а дальше автозаполнение ключами самих обьектов
    for( i=0; i < productsDataBase.length; i++ ) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = 
        "<td class='" + productsDataBase[i].prodID + "'>" + "<button id='" + productsDataBase[i].prodID + "' class='" + productsDataBase[i].prodID + "'>X</button>" + "</td>" +
        //дополнительно для кнопок задоем генерацию айди на базе
        "<td class='" + productsDataBase[i].prodID + "'>"+ productsDataBase[i].prodID +"</td>" +
        "<td class='" + productsDataBase[i].prodID + "'>"+ productsDataBase[i].name +"</td>" +
        "<td class='" + productsDataBase[i].prodID + "'>"+ productsDataBase[i].price +"</td>" +
        "<td class='" + productsDataBase[i].prodID + "'>"+ productsDataBase[i].description +"</td>";
        table.appendChild(newRow);  //подвязывает к таблице дочерний элемент в данном случае строку новую
    }
    let button = document.querySelector(".ID") // ищет в доме класс АЙДИ и передает его валью в вариаблу баттон *кстати странно ведь таких предметов с этим классом целых 5 но почему то выбирает только первый видимо изза того что повторяется только 1 раз и первым меняет именно первый элемент*который мне и нужен
    if (button) { //если кнопка вариабла баттон является самой собой что всегда да передает ей ниже указанные цсс свойства
        button.style.visibility = "hidden";
        button.disabled  = "true"
        button.style.pointerEvents = "none";
    }
}

//функция по переназначению айди обьектов всего массива 
function redoProdID () {
    for (let i=0; i<productsDataBase.length; i++) {
        productsDataBase[i].prodID = i.toString()
    }
}

//ивент листенер по всей таблице с определением ивент кнопки и удалением из массива элемента под тем же прод айди что прописан в айди кнопки

function