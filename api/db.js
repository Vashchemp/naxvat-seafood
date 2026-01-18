const fs = require('fs');
const path = require('path');

const dataFile = path.join(process.cwd(), 'data.json');

// Инициализируем данные если файла нет
function initializeData() {
    if (!fs.existsSync(dataFile)) {
        const initialData = {
            products: [
                // Красная икра
                {id: 1, category: "Красная икра", name: "Икра кеты Премиум", weight: 100, price: 95, unit: "г", description: "Премиальная икра кеты 100г", byWeight: false},
                {id: 2, category: "Красная икра", name: "Икра кеты Премиум", weight: 250, price: 250, unit: "г", description: "Премиальная икра кеты 250г", byWeight: false},
                {id: 3, category: "Красная икра", name: "Икра кеты Премиум", weight: 500, price: 470, unit: "г", description: "Премиальная икра кеты 500г", byWeight: false},
                {id: 4, category: "Красная икра", name: "Икра горбуши", weight: 100, price: 75, unit: "г", description: "Икра горбуши 100г", byWeight: false},
                {id: 5, category: "Красная икра", name: "Икра горбуши", weight: 250, price: 180, unit: "г", description: "Икра горбуши 250г", byWeight: false},
                {id: 6, category: "Красная икра", name: "Икра горбуши", weight: 500, price: 340, unit: "г", description: "Икра горбуши 500г", byWeight: false},
                {id: 7, category: "Красная икра", name: "Икра нерки", weight: 100, price: 85, unit: "г", description: "Икра нерки 100г", byWeight: false},
                {id: 8, category: "Красная икра", name: "Икра нерки", weight: 250, price: 210, unit: "г", description: "Икра нерки 250г", byWeight: false},
                {id: 9, category: "Красная икра", name: "Икра нерки", weight: 500, price: 400, unit: "г", description: "Икра нерки 500г", byWeight: false},
                
                // Черная икра
                {id: 10, category: "Черная икра", name: "Икра осетра", weight: 50, price: 180, unit: "г", description: "Икра осетра 50г", byWeight: false},
                {id: 11, category: "Черная икра", name: "Икра осетра", weight: 100, price: 350, unit: "г", description: "Икра осетра 100г", byWeight: false},
                {id: 12, category: "Черная икра", name: "Икра белуги", weight: 50, price: 220, unit: "г", description: "Икра белуги 50г", byWeight: false},
                {id: 13, category: "Черная икра", name: "Икра белуги", weight: 100, price: 420, unit: "г", description: "Икра белуги 100г", byWeight: false},
                
                // Раки
                {id: 14, category: "Раки", name: "Раки живые", weight: 1, price: 45, unit: "шт", description: "Живые раки 1 шт", byWeight: true},
                {id: 15, category: "Раки", name: "Раки вареные", weight: 1, price: 50, unit: "шт", description: "Вареные раки 1 шт", byWeight: true},
                {id: 16, category: "Раки", name: "Раки замороженные", weight: 500, price: 120, unit: "г", description: "Замороженные раки 500г", byWeight: false},
                
                // Лобстеры
                {id: 17, category: "Лобстеры", name: "Лобстер живой", weight: 1, price: 180, unit: "шт", description: "Живой лобстер 1 шт", byWeight: true},
                {id: 18, category: "Лобстеры", name: "Лобстер вареный", weight: 1, price: 200, unit: "шт", description: "Вареный лобстер 1 шт", byWeight: true},
                {id: 19, category: "Лобстеры", name: "Хвост лобстера", weight: 200, price: 150, unit: "г", description: "Хвост лобстера 200г", byWeight: false},
                
                // Морепродукты
                {id: 20, category: "Морепродукты", name: "Креветки королевские", weight: 500, price: 280, unit: "г", description: "Креветки королевские 500г", byWeight: false},
                {id: 21, category: "Морепродукты", name: "Креветки тигровые", weight: 500, price: 320, unit: "г", description: "Креветки тигровые 500г", byWeight: false},
                {id: 22, category: "Морепродукты", name: "Мидии", weight: 500, price: 140, unit: "г", description: "Мидии 500г", byWeight: false},
                {id: 23, category: "Морепродукты", name: "Устрицы", weight: 1, price: 60, unit: "шт", description: "Устрицы 1 шт", byWeight: true},
                {id: 24, category: "Морепродукты", name: "Гребешки", weight: 500, price: 250, unit: "г", description: "Гребешки 500г", byWeight: false},
                {id: 25, category: "Морепродукты", name: "Кальмар", weight: 500, price: 180, unit: "г", description: "Кальмар 500г", byWeight: false},
                {id: 26, category: "Морепродукты", name: "Осьминог", weight: 500, price: 220, unit: "г", description: "Осьминог 500г", byWeight: false},
                
                // Снек-боксы
                {id: 27, category: "Снек-боксы", name: "Снек-бокс Премиум", weight: 500, price: 450, unit: "г", description: "Премиум набор морепродуктов 500г", byWeight: false},
                {id: 28, category: "Снек-боксы", name: "Снек-бокс Стандарт", weight: 300, price: 280, unit: "г", description: "Стандартный набор 300г", byWeight: false},
                {id: 29, category: "Снек-боксы", name: "Снек-бокс Икра", weight: 200, price: 350, unit: "г", description: "Набор с икрой 200г", byWeight: false},
                {id: 30, category: "Снек-боксы", name: "Снек-бокс Деликатес", weight: 400, price: 520, unit: "г", description: "Деликатесный набор 400г", byWeight: false},
                
                // Таранька
                {id: 31, category: "Таранька", name: "Таранька вяленая", weight: 500, price: 160, unit: "г", description: "Таранька вяленая 500г", byWeight: false},
                {id: 32, category: "Таранька", name: "Таранька копченая", weight: 500, price: 190, unit: "г", description: "Таранька копченая 500г", byWeight: false},
                {id: 33, category: "Таранька", name: "Таранька сушеная", weight: 300, price: 140, unit: "г", description: "Таранька сушеная 300г", byWeight: false}
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
