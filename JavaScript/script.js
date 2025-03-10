// fetch('prodData.json')
let productsDataBase = JSON.parse(localStorage.getItem("prodDB")) || [];

function idGenerator() {    //генерирует айди для след продукта пересчитывая колличество обьектов в массиве +1 
    let nextID = 0;
    for (let i = 0; i <= productsDataBase.length; i++) {
        nextID = nextID + 1
    }
    nextID = nextID-1 ///////////////////////////////////////////////////////////////////////////////ЭТО ЖОСТКА ВАЖНЫЙ КОСТЛЬ КОТОРЫЙ ЧИНИТ ВСЮ ПРОЕБАНУЮ МНОЙ ЛОГИКУ АГА
    //мем в том что все 150 строк кода идут нахер если не минус 2 кек уже минус 1
    return nextID.toString(); // будущий вывод в виде айди
}
//функция по сохранению массива внутрь локал сторадж * будет использоваться после любого внесения в изменения самого массива
function saveProd () {
    localStorage.setItem("prodDB", JSON.stringify(productsDataBase));
}
//class product для генерации продуктов по шаблону конструктора
class Product {
    constructor(prodID, name, price, description) {
        this.prodID = prodID;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
//сама функция по добавлению новых обьектов в массив
function addNew() {
    let prodID = idGenerator();
    let name = document.getElementById("addName").value
    let price = parseFloat(document.getElementById("addPrice").value);
    let description = document.getElementById("addDescription").value
    if (!name || isNaN(price) === true || !description){
        alert("pls fill in all input fields")
        return;
    } else {
        
        // const newProd = {
        //     prodID: idGenerator(),
        //     name: name,
        //     price: price,
        //     description: description
        // }
        // productsDataBase.push(newProd);
        productsDataBase.push(new Product(prodID, name, price, description))
        saveProd();
    }
    
}

// кнопка запуска функции по добавлению новых предметов в массив
document.getElementById("addBut").addEventListener("click", function (event) {
    event.preventDefault()                                           // SADSDEGGDFSHFGHGASFDSRFZGZGDGERATZESTZ§§%&TGARETG%$&§RGF пиздец я искал 4 часа баг почему пропадали значения массива данных а это спасибо
    // console.log("button clicked");                                 // стандартному поведению кнопки обновляющему страницу ситрая кэш и заодно обнуляя архив т.к. мы еще не учили базы данных в джейсоне или где ани там
    
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
        // console.table(productsDataBase);
        createHtml ()
        document.getElementById("addName").value = "";
        document.getElementById("addPrice").value = "";
        document.getElementById("addDescription").value = "";
    }
});

//кнопка по переписыванию обьекта под заданным продАЙДИ

document.getElementById("changeBut").addEventListener("click", function (event) {
    event.preventDefault();
    // console.log("changebut was clicked");

    let productInputID = parseFloat(document.getElementById("idInput").value);

    let newName = document.getElementById("changeName").value;
    let newPrice = parseFloat(document.getElementById("changePrice").value);
    let newDescription = document.getElementById("changeDescription").value;

    if(isNaN(productInputID) === true || isNaN(newPrice) === true) {
        alert("Pls use only whole numbers inside items ID field");   //если в поле айди или новой цены не число т.е. мат действия выдадут нан тоже нельзя

    } else if (productInputID<0 || productInputID>productsDataBase.length) {
        alert("there is no such product with that ID"); // проверка на наличие такого айди, т.к. у меня айди генерируются основываясь на колличестве обьектов массива все числа что выше или ниже колличества не существуют + 0 обьект нельзя менять поэтому меньше 1 а не меньше 0

    } else if (newName.length >= 21 || newPrice.length >=21 || newDescription.length>=21) {
        //чекает что бы ввод не превышал 20 символов
        alert("Fields cannot be longer than 20 characters.");

    } else {
        //переписывает значения ключей внутри обьекта под тем индексом под которым продуктинпутАЙДИ совпадает с числом внутри ключа продАЙДИ в массиве проддатабейс
        for (let i = 0; i<productsDataBase.length; i++) {
            if (productInputID === Number(productsDataBase[i].prodID)) {
            productsDataBase[i].name = newName;
            productsDataBase[i].price = newPrice;
            productsDataBase[i].description = newDescription;
            // console.table(productsDataBase);
            createHtml ();
            document.getElementById("changeName").value = "";
            document.getElementById("changePrice").value = "";
            document.getElementById("changeDescription").value = "";

            }
        }
        saveProd();
    }
});
//функция по генерации хмл дока на основе имеющихся обьектов внутри массива
createHtml(); // this needed to generate first 3 test objects inside
function createHtml () {
    let table = document.getElementById("productsDataTable");
    table.innerHTML = "" //вытираем предыдущий результаты таблицы каждый раз генерируя ее с нуля во избежании клонирования результатов
    //создаем дорожки из 5 заданных колонн на каждый элемент внутри массива 1 колонна у всех дорог будет кнопкой удаления а дальше автозаполнение ключами самих обьектов
    for( i=0; i < productsDataBase.length; i++ ) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = 
        "<td class='" + productsDataBase[i].prodID + "'>" + "<button name='BUTTON' id='" + productsDataBase[i].prodID + "' class='" + productsDataBase[i].prodID + "'>X</button>" + "</td>" +
        //дополнительно для кнопок задоем генерацию айди на базе
        "<td class='" + productsDataBase[i].prodID + "'>"+ productsDataBase[i].prodID +"</td>" +
        "<td class='" + productsDataBase[i].prodID + "'>"+ productsDataBase[i].name +"</td>" +
        "<td class='" + productsDataBase[i].prodID + "'>"+ productsDataBase[i].price +"</td>" +
        "<td class='" + productsDataBase[i].prodID + "'>"+ productsDataBase[i].description +"</td>";
        table.appendChild(newRow);  //подвязывает к таблице дочерний элемент в данном случае строку новую
    }
}

//функция по переназначению айди обьектов всего массива 
function redoProdID () {
//ух епт я почти попал в двухчасовое дебагувание но по итогу долшло что нельзя переписывать нулевой элемент т.к. там в айди не цифра что ломает некоторые действия с цифрой из айди в будущем т.е. просто начинаем с 1 а не 0 и радуемся жизни
    for (let i=0; i<productsDataBase.length; i++) {
        productsDataBase[i].prodID = i.toString()
    }
}

//ивент листенер по всей таблице с определением ивент кнопки и удалением из массива элемента под тем же прод айди что прописан в айди кнопки
document.getElementById("productsDataTable").addEventListener("click", function(event){
    if (event.target.name === "BUTTON") {
        // event.stopPropagation()
        let targetID = event.target.id
        for (let i = 0; i<productsDataBase.length; i++) {
            if (targetID === productsDataBase[i].prodID) {
                // console.log("deleted items wit prod id:" + productsDataBase[i].prodID)
                productsDataBase.splice(i, 1);
                
                break;
            }
        }
        redoProdID();
        saveProd();
        createHtml();
    }
});