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
            },
            "99": {
                "2": "0",
                "3": "42",
                "4": "0",
                "5": "0",
                "117": "46",
                "143": "46",
                "162": "4",
                "171": "0",
                "176": "12"
            }
        }
    }
};

function getItemName() {
    const {
        displayedName: {
            displayedName: {
                value: productName
            }
        }
    } = data;

    return productName.join();
}

function getRegionsWithStock() {
    const regionWithStocks = {};
    const regionsArr = Object.entries(data.stock.stocks);

    regionsArr.forEach( region => {
        const shopWithStocks = [];
        const [regionId, shops] = region;

        for (let key in shops) {
            const stock = Number(shops[key]);
            if (stock > 0) {
                shopWithStocks.push([key, stock]);
            }
        }
        regionWithStocks[regionId] = shopWithStocks;
    });

    return regionWithStocks;
}

function getShopsArrayWithStock() {
    const shopsWithStocks = {};
    const regions = getRegionsWithStock();

    for (let regionId in regions) {
        const shops = regions[regionId];
        shopsWithStocks[regionId] = shops.map( shop => Number(shop.shift()))
    }

    return shopsWithStocks;
}

function getMaxStockInRegion() {
    const shopsWithMaxStocks = {};
    const regions = getRegionsWithStock();

    for (let regionId in regions) {
        const shops = regions[regionId];

        const maxStock = shops.reduce( (acc, next) => {
            const [shopId, stock] = next;
            return Math.max(acc, stock);
        }, 0);

        shopsWithMaxStocks[regionId] = maxStock;
    }
    return shopsWithMaxStocks;
}

console.log("1 - получить название товара: ", getItemName());
console.log("2 - получить массив номеров магазинов, в которых есть товары в наличии: ", getShopsArrayWithStock());
console.log("3 - найти максимальное количество товара в регионе, вернуть это количество и номер магазина: ", getMaxStockInRegion());
