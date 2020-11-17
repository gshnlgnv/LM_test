let data = {
    "displayedName": {
        "displayedName": {
            "value": [
                "Профиль маячковый ПВХ 10 мм L3м"
            ],
            "description": "Полное наименование товара для клиента"
        }
    },
    "stock": {
        "stocks": {
            "34": {
                "2": "35",
                "3": "42",
                "4": "58",
                "5": "57",
                "6": "112",
                "20": "51",
                "22": "78",
                "26": "34",
                "32": "22",
                "35": "358",
                "40": "28",
                "43": "68",
                "45": "58",
                "49": "31",
                "51": "29",
                "56": "42",
                "62": "26",
                "64": "0",
                "65": "57",
                "86": "15",
                "114": "41",
                "117": "46",
                "143": "46",
                "162": "4",
                "171": "0",
                "176": "12"
            }
        }
    }
};

let itemName = "";
let shopsNumberArr = [];
let messageShopMaxStock = "";

function getItemName(data) {
   return itemName = data.displayedName.displayedName.value.join();
}

function getShopsArrayWithStock(data) {
    let regionsArr = Object.entries(data.stock.stocks);
    let region = regionsArr[0];
    let availableShops = region[1];

    for (let keys in availableShops) {
        if (Number(availableShops[keys]) > 0) {
            shopsNumberArr.push(keys);
        }
    }
    return shopsNumberArr;
}

function getMaxStockInRegion() {
    let regionsArr = Object.entries(data.stock.stocks);
    let region = regionsArr[0];
    let availableShops = region[1];
    let maxStock = [];

    for (let keys in availableShops) {
        if (Number(availableShops[keys]) > 0) {
            maxStock.push(Number(availableShops[keys]));
        }
    }

    let maxStockValue =  Math.max(...maxStock);

    for (let keys in availableShops) {
        if (maxStockValue === Number(availableShops[keys])) {
            messageShopMaxStock = (`Магазин №${keys} имеет максимальный сток: ${maxStockValue} шт.`);
        }
    }
    return messageShopMaxStock;
}

console.log("1 - получить название товара: ", getItemName(data));
console.log("2 - получить массив номеров магазинов, в которых есть товары в наличии: ", getShopsArrayWithStock(data));
console.log("3 - найти максимальное количество товара в регионе, вернуть это количество и номер магазина: ", getMaxStockInRegion(data));
