const fs = require('fs');
const path = require('path');

const dataFile = path.join(process.cwd(), 'data.json');

// Инициализируем данные если файла нет
function initializeData() {
    if (!fs.existsSync(dataFile)) {
        const initialData = {
            products: [
                {id: 1, category: "Красная икра", name: "Икра кеты Премиум", weight: 100, price: 95, unit: "г", description: "Премиальная икра кеты 100г", byWeight: false},
                {id: 2, category: "Красная икра", name: "Икра кеты Премиум", weight: 250, price: 250, unit: "г", description: "Премиальная икра кеты 250г", byWeight: false},
                {id: 3, category: "Красная икра", name: "Икра кеты Премиум", weight: 500, price: 470, unit: "г", description: "Премиальная икра кеты 500г", byWeight: false}
            ],
            sales: [],
            deliveries: [],
            shipments: []
        };
        fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
    }
}

function readData() {
    initializeData();
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData, initializeData };
