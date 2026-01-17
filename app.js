let products = [];
let orders = [];
let shipments = [];
let cart = [];
let currentEditingProductId = null;

// Встроенные товары из CSV
const productsData = [
    {category: "Красная икра", name: "Икра кеты Премиум", weight: 100, price: 95, unit: "г", description: "Премиальная икра кеты 100г", byWeight: false},
    {category: "Красная икра", name: "Икра кеты Премиум", weight: 250, price: 250, unit: "г", description: "Премиальная икра кеты 250г", byWeight: false},
    {category: "Красная икра", name: "Икра кеты Премиум", weight: 500, price: 470, unit: "г", description: "Премиальная икра кеты 500г", byWeight: false},
    {category: "Красная икра", name: "Икра форели Премиум", weight: 250, price: 160, unit: "г", description: "Премиальная икра форели 250г", byWeight: false},
    {category: "Красная икра", name: "Икра форели Премиум", weight: 500, price: 305, unit: "г", description: "Премиальная икра форели 500г", byWeight: false},
    {category: "Красная икра", name: "Икра горбуши Премиум", weight: 500, price: 420, unit: "г", description: "Премиальная икра горбуши 500г", byWeight: false},
    {category: "Красная икра", name: "Икра горбуши Премиум", weight: 250, price: 230, unit: "г", description: "Премиальная икра горбуши 250г", byWeight: false},
    {category: "Красная икра", name: "Икра горбуши Премиум", weight: 100, price: 90, unit: "г", description: "Премиальная икра горбуши 100г", byWeight: false},
    {category: "Красная икра", name: "Икра кижуча Премиум", weight: 250, price: 280, unit: "г", description: "Премиальная икра кижуча 250г", byWeight: false},
    {category: "Красная икра", name: "Икра Премиум без консервантов Кета", weight: 1000, price: 880, unit: "кг", description: "Натуральная икра кеты без консервантов", byWeight: true},
    {category: "Красная икра", name: "Икра Премиум без консервантов Кижуч", weight: 1000, price: 850, unit: "кг", description: "Натуральная икра кижуча без консервантов", byWeight: true},
    {category: "Красная икра", name: "Икра Премиум без консервантов Горбуша", weight: 1000, price: 800, unit: "кг", description: "Натуральная икра горбуши без консервантов", byWeight: true},
    {category: "Красная икра", name: "Икра Премиум без консервантов Кета 2 сорт", weight: 1000, price: 500, unit: "кг", description: "Икра кеты 2 сорт без консервантов", byWeight: true},
    {category: "Красная икра", name: "Икра Премиум без консервантов Форель", weight: 1000, price: 530, unit: "кг", description: "Натуральная икра форели без консервантов", byWeight: true},
    {category: "Красная икра", name: "Икра Премиум без консервантов Форель", weight: 500, price: 280, unit: "г", description: "Натуральная икра форели без консервантов 500г", byWeight: false},
    {category: "Чёрная икра", name: "Икра осетра", weight: 50, price: 250, unit: "г", description: "Чёрная икра осетра премиум", byWeight: false},
    {category: "Чёрная икра", name: "Икра осетра", weight: 100, price: 450, unit: "г", description: "Чёрная икра осетра премиум", byWeight: false},
    {category: "Чёрная икра", name: "Икра амурской белуги", weight: 50, price: 450, unit: "г", description: "Редкая икра амурской белуги", byWeight: false},
    {category: "Чёрная икра", name: "Икра амурской белуги", weight: 100, price: 850, unit: "г", description: "Редкая икра амурской белуги", byWeight: false},
    {category: "Чёрная икра", name: "Икра белуги Huso Huso", weight: 50, price: 550, unit: "г", description: "Элитная икра белуги Huso Huso", byWeight: false},
    {category: "Чёрная икра", name: "Икра гольца", weight: 250, price: 230, unit: "г", description: "Икра гольца премиум", byWeight: false},
    {category: "Чёрная икра", name: "Икра щуки", weight: 100, price: 108, unit: "г", description: "Натуральная икра щуки", byWeight: false},
    {category: "Чёрная икра", name: "Икра мойвы", weight: 200, price: 40, unit: "г", description: "Икра мойвы", byWeight: false},
    {category: "Раки", name: "Раки живые 190/240", weight: 1000, price: 190, unit: "кг", description: "Раки живые 190-240г за штуку", byWeight: true},
    {category: "Раки", name: "Раки живые 190/240 (варка)", weight: 1000, price: 239, unit: "кг", description: "Раки живые с варкой", byWeight: true},
    {category: "Раки", name: "Раки живые 190/240 (варка)", weight: 1000, price: 270, unit: "кг", description: "Раки живые с варкой премиум", byWeight: true},
    {category: "Лобстеры", name: "Лобстеры Канада/ЕС 350-400г", weight: 1000, price: 250, unit: "кг", description: "Живые лобстеры 350-400г", byWeight: true},
    {category: "Лобстеры", name: "Лобстеры Канада/ЕС 500-800г", weight: 1000, price: 360, unit: "кг", description: "Живые лобстеры 500-800г", byWeight: true},
    {category: "Лобстеры", name: "Лобстеры Канада/ЕС 1кг+", weight: 1000, price: 410, unit: "кг", description: "Живые лобстеры более 1кг", byWeight: true},
    {category: "Лобстеры", name: "Лобстеры варка", weight: 1000, price: 20, unit: "кг", description: "Услуга варки лобстера", byWeight: true},
    {category: "Морепродукты замороженные", name: "Хвосты лангустов", weight: 1000, price: 550, unit: "кг", description: "Замороженные хвосты лангустов", byWeight: true},
    {category: "Морепродукты замороженные", name: "Клешни снежного краба", weight: 1000, price: 240, unit: "кг", description: "Замороженные клешни снежного краба", byWeight: true},
    {category: "Морепродукты замороженные", name: "Клешни королевского краба", weight: 1000, price: 950, unit: "кг", description: "Замороженные клешни королевского краба", byWeight: true},
    {category: "Морепродукты замороженные", name: "Гребенцы с икрой", weight: 1000, price: 180, unit: "кг", description: "Гребенцы с икрой", byWeight: true},
    {category: "Морепродукты замороженные", name: "Мясо королевского краба", weight: 1000, price: 950, unit: "кг", description: "Мясо королевского краба", byWeight: true},
    {category: "Печень трески", name: "Печень трески Норвегия", weight: 500, price: 125, unit: "г", description: "Печень трески норвежская 500г", byWeight: false},
    {category: "Печень трески", name: "Печень трески Норвегия", weight: 350, price: 99, unit: "г", description: "Печень трески норвежская 350г", byWeight: false},
    {category: "King Krab", name: "King Krab первая фаланга", weight: 250, price: 289, unit: "г", description: "King Krab первая фаланга 250г", byWeight: false},
    {category: "King Krab", name: "King Krab первая фаланга", weight: 400, price: 444, unit: "г", description: "King Krab первая фаланга 400г", byWeight: false},
    {category: "King Krab", name: "King Krab первая фаланга", weight: 520, price: 599, unit: "г", description: "King Krab первая фаланга 520г", byWeight: false},
    {category: "King Krab", name: "King Krab первая фаланга", weight: 720, price: 779, unit: "г", description: "King Krab первая фаланга 720г", byWeight: false},
    {category: "Blue Crab", name: "Blue Crab meat", weight: 454, price: 170, unit: "г", description: "Blue Crab мясо 454г", byWeight: false},
    {category: "Собственное производство", name: "Скумбрия собственная посолка", weight: 1000, price: 49.99, unit: "кг", description: "Скумбрия собственного посола", byWeight: true},
    {category: "Собственное производство", name: "Скумбрия с луком нарезка", weight: 1000, price: 59.99, unit: "кг", description: "Скумбрия с луком нарезанная", byWeight: true},
    {category: "Собственное производство", name: "Скумбрия свежемороженая", weight: 1000, price: 29.99, unit: "кг", description: "Скумбрия свежемороженая", byWeight: true},
    {category: "Собственное производство", name: "Скумбрия маринованная", weight: 1000, price: 39.99, unit: "кг", description: "Скумбрия маринованная для запекания", byWeight: true},
    {category: "Снек-боксы", name: "Миксбокс 950г", weight: 950, price: 120, unit: "г", description: "Смесь морепродуктов 950г", byWeight: false},
    {category: "Снек-боксы", name: "Снек 100г (для микса)", weight: 100, price: 12, unit: "г", description: "Позиция для самостоятельного микса", byWeight: false},
    {category: "Снек-боксы", name: "Снек бокс 200 золотых", weight: 2000, price: 200, unit: "кг", description: "Снек бокс на 200 золотых", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс 150 золотых", weight: 1500, price: 150, unit: "кг", description: "Снек бокс на 150 золотых", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс 100 золотых", weight: 1000, price: 100, unit: "кг", description: "Снек бокс на 100 золотых", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс Arriwa", weight: 2500, price: 250, unit: "кг", description: "Премиум снек бокс Arriwa", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс Рыбалка", weight: 2000, price: 200, unit: "кг", description: "Снек бокс Рыбалка", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс KrabsTime", weight: 2000, price: 200, unit: "кг", description: "Снек бокс KrabsTime", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс Игра в кальмара", weight: 2000, price: 200, unit: "кг", description: "Снек бокс Игра в кальмара", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс Рыбный", weight: 2000, price: 200, unit: "кг", description: "Рыбный снек бокс", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс Морские", weight: 2000, price: 200, unit: "кг", description: "Морской снек бокс", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс Пивная тарелка", weight: 2000, price: 200, unit: "кг", description: "Снек бокс Пивная тарелка", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс Рыжий", weight: 2000, price: 200, unit: "кг", description: "Снек бокс Рыжий", byWeight: true},
    {category: "Снек-боксы", name: "Снек бокс 250 золотых (все позиции)", weight: 2500, price: 250, unit: "кг", description: "Максимальный снек бокс 2.3кг+", byWeight: true},
    {category: "Премиальная таранька", name: "Лящи Икряные", weight: 1000, price: 148, unit: "кг", description: "Лящи с икрой", byWeight: true},
    {category: "Премиальная таранька", name: "Плотва Икряная с чешуей S", weight: 1000, price: 120, unit: "кг", description: "Плотва S с икрой и чешуей", byWeight: true},
    {category: "Премиальная таранька", name: "Плотва Икряная с чешуей M", weight: 1000, price: 160, unit: "кг", description: "Плотва M с икрой и чешуей", byWeight: true},
    {category: "Премиальная таранька", name: "Плотва Икряная с чешуей L", weight: 1000, price: 180, unit: "кг", description: "Плотва L с икрой и чешуей", byWeight: true},
    {category: "Премиальная таранька", name: "Плотва Икряная без чешуи M", weight: 1000, price: 170, unit: "кг", description: "Плотва M с икрой без чешуи", byWeight: true},
    {category: "Премиальная таранька", name: "Плотва Икряная без чешуи XL", weight: 1000, price: 230, unit: "кг", description: "Плотва XL мега икряная без чешуи", byWeight: true},
    {category: "Премиальная таранька", name: "Щука", weight: 1000, price: 109, unit: "кг", description: "Вяленая щука", byWeight: true},
    {category: "Премиальная таранька", name: "Судак", weight: 1000, price: 119, unit: "кг", description: "Вяленый судак", byWeight: true},
    {category: "Премиальная таранька", name: "Бички черноморские", weight: 1000, price: 110, unit: "кг", description: "Вяленые бички", byWeight: true},
    {category: "Премиальная таранька", name: "Корюшка с икрой 50/50", weight: 1000, price: 180, unit: "кг", description: "Корюшка с икрой 50/50", byWeight: true},
    {category: "Премиальная таранька", name: "Корюшка зубатка Икряная", weight: 1000, price: 510, unit: "кг", description: "Корюшка зубатка с икрой", byWeight: true},
    {category: "Премиальная таранька", name: "Юкола из кеты", weight: 1000, price: 255, unit: "кг", description: "Юкола из кеты", byWeight: true},
    {category: "Премиальная таранька", name: "Юкола из лосося", weight: 1000, price: 255, unit: "кг", description: "Юкола из лосося", byWeight: true},
    {category: "Вяленая натуральная икра", name: "Икра судака", weight: 100, price: 24, unit: "г", description: "Вяленая икра судака", byWeight: false},
    {category: "Вяленая натуральная икра", name: "Икра форели", weight: 100, price: 35, unit: "г", description: "Вяленая икра форели", byWeight: false},
    {category: "Копчености", name: "Рулет из 3 рыб", weight: 1000, price: 238, unit: "кг", description: "Рулет из трех видов рыб", byWeight: true},
    {category: "Копчености", name: "Рулет с кальмаром", weight: 1000, price: 266, unit: "кг", description: "Рулет с кальмаром", byWeight: true},
    {category: "Копчености", name: "Сыр косичка", weight: 100, price: 12, unit: "г", description: "Сыр косичка", byWeight: false},
    {category: "Копчености", name: "Скумбрия копченая", weight: 1000, price: 70, unit: "кг", description: "Скумбрия горячего копчения", byWeight: true},
    {category: "Копчености", name: "Юкола из семги", weight: 1000, price: 266, unit: "кг", description: "Юкола из семги копченая", byWeight: true},
    {category: "Сушеные морепродукты", name: "Мюдии сушеные", weight: 100, price: 18, unit: "г", description: "Сушеные мюдии", byWeight: false},
    {category: "Сушеные морепродукты", name: "Креветки сушеные целые", weight: 100, price: 24, unit: "г", description: "Сушеные креветки целые", byWeight: false},
    {category: "Сушеные морепродукты", name: "Креветки сушеные чищеные", weight: 100, price: 26, unit: "г", description: "Сушеные креветки чищеные", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Анчоусы", weight: 100, price: 17, unit: "г", description: "Анчоусы для снек боксов", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Икрянники с лососем", weight: 100, price: 17, unit: "г", description: "Икрянники с лососем", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Филе щуки", weight: 100, price: 17, unit: "г", description: "Филе щуки", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Филе щуки с перцем", weight: 100, price: 17, unit: "г", description: "Филе щуки с перцем", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Осьминог", weight: 100, price: 17, unit: "г", description: "Осьминог", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Филе кальмара полосатый", weight: 100, price: 17, unit: "г", description: "Филе кальмара полосатый", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Голден Фиш", weight: 100, price: 17, unit: "г", description: "Голден Фиш", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Стружка краба", weight: 100, price: 17, unit: "г", description: "Стружка краба", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Стружка кальмара", weight: 100, price: 17, unit: "г", description: "Стружка кальмара", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Мясо краба", weight: 100, price: 17, unit: "г", description: "Мясо краба", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Нарезка краба", weight: 100, price: 17, unit: "г", description: "Нарезка краба", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Кольца кальмаров", weight: 100, price: 17, unit: "г", description: "Кольца кальмаров", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Паутинка кальмара", weight: 100, price: 17, unit: "г", description: "Паутинка кальмара", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Тунец премиум", weight: 100, price: 17, unit: "г", description: "Тунец премиум", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Кальмар по-шанхайски", weight: 100, price: 17, unit: "г", description: "Кальмар по-шанхайски", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Триглa", weight: 100, price: 17, unit: "г", description: "Триглa", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Камбала", weight: 100, price: 17, unit: "г", description: "Камбала", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Угорь", weight: 100, price: 17, unit: "г", description: "Угорь", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Триглa с перцем", weight: 100, price: 17, unit: "г", description: "Триглa с перцем", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Крабовые палочки из кальмара", weight: 100, price: 17, unit: "г", description: "Крабовые палочки из кальмара", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Икрянники", weight: 100, price: 17, unit: "г", description: "Икрянники", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Нерка в терияки", weight: 100, price: 17, unit: "г", description: "Нерка в соусе терияки", byWeight: false},
    {category: "Снеки (позиции для микса)", name: "Кета в терияки", weight: 100, price: 17, unit: "г", description: "Кета в соусе терияки", byWeight: false}
];

function init() {
    const saved = localStorage.getItem('naxvat_products');
    if (saved) {
        products = JSON.parse(saved);
    } else {
        products = productsData.map((p, i) => ({
            id: i + 1,
            ...p
        }));
        saveProducts();
    }

    const savedOrders = localStorage.getItem('naxvat_orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }

    const savedShipments = localStorage.getItem('naxvat_shipments');
    if (savedShipments) {
        shipments = JSON.parse(savedShipments);
    }

    renderProductsList();
    renderOrderProducts();
    renderShipments();
    updateDashboard();
    updateStatistics();
    updateDate();
}

function saveProducts() {
    localStorage.setItem('naxvat_products', JSON.stringify(products));
}

function saveOrders() {
    localStorage.setItem('naxvat_orders', JSON.stringify(orders));
}

function saveShipments() {
    localStorage.setItem('naxvat_shipments', JSON.stringify(shipments));
}

function switchTab(tabName) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    
    if (tabName === 'statistics') {
        updateStatistics();
    }
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">Корзина пуста</p>';
        cartTotal.textContent = '0 PLN';
        cartCount.textContent = '0';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">${item.quantity} × ${item.price} PLN</div>
                <div class="cart-item-price">${itemTotal.toFixed(2)} PLN</div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">❌ Удалить</button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = total.toFixed(2) + ' PLN';
    cartCount.textContent = cart.length;
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.byWeight) {
        const weight = prompt(`Введите вес в ${product.unit}:`, product.weight);
        if (weight === null) return;
        quantity = parseFloat(weight);
    }

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            unit: product.unit
        });
    }

    renderCart();
    alert(`✅ Добавлено: ${product.name}`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function clearCart() {
    if (confirm('Очистить корзину?')) {
        cart = [];
        renderCart();
    }
}

function checkoutCart() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    alert('✅ Заказ оформлен! Товаров: ' + cart.length);
    cart = [];
    renderCart();
    toggleCart();
}

function renderProductsList() {
    const list = document.getElementById('productsList');
    list.innerHTML = products.map(product => `
        <div class="product-row ${product.byWeight ? 'by-weight' : ''}">
            <div class="product-header">
                <div class="product-name">${product.name}</div>
                ${product.byWeight ? '<span class="product-badge weight">На вес</span>' : ''}
            </div>
            <div class="product-details">
                📁 ${product.category}<br>
                ⚖️ ${product.weight} ${product.unit} | 💰 ${product.price} PLN<br>
                📝 ${product.description}
            </div>
            <div class="product-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">✏️ Редактировать</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const search = document.getElementById('productSearch').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
        const matchCategory = !category || p.category === category;
        return matchSearch && matchCategory;
    });

    const list = document.getElementById('productsList');
    list.innerHTML = filtered.map(product => `
        <div class="product-row ${product.byWeight ? 'by-weight' : ''}">
            <div class="product-header">
                <div class="product-name">${product.name}</div>
                ${product.byWeight ? '<span class="product-badge weight">На вес</span>' : ''}
            </div>
            <div class="product-details">
                📁 ${product.category}<br>
                ⚖️ ${product.weight} ${product.unit} | 💰 ${product.price} PLN<br>
                📝 ${product.description}
            </div>
            <div class="product-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">✏️ Редактировать</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentEditingProductId = productId;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductWeight').value = product.weight;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductUnit').value = product.unit;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductByWeight').checked = product.byWeight;

    document.getElementById('productModal').classList.add('show');
}

function saveEditedProduct() {
    const product = products.find(p => p.id === currentEditingProductId);
    if (!product) return;

    product.name = document.getElementById('editProductName').value;
    product.category = document.getElementById('editProductCategory').value;
    product.weight = parseFloat(document.getElementById('editProductWeight').value);
    product.price = parseFloat(document.getElementById('editProductPrice').value);
    product.unit = document.getElementById('editProductUnit').value;
    product.description = document.getElementById('editProductDescription').value;
    product.byWeight = document.getElementById('editProductByWeight').checked;

    saveProducts();
    renderProductsList();
    renderOrderProducts();
    closeProductModal();
    alert('✅ Товар обновлён!');
    updateDashboard();
}

function deleteProduct(productId) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderProductsList();
        renderOrderProducts();
        alert('✅ Товар удалён!');
        updateDashboard();
    }
}

function openAddProductModal() {
    currentEditingProductId = null;
    document.getElementById('editProductName').value = '';
    document.getElementById('editProductCategory').value = 'Красная икра';
    document.getElementById('editProductWeight').value = '';
    document.getElementById('editProductPrice').value = '';
    document.getElementById('editProductUnit').value = 'г';
    document.getElementById('editProductDescription').value = '';
    document.getElementById('editProductByWeight').checked = false;
    document.getElementById('productModal').classList.add('show');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

function renderOrderProducts() {
    const table = document.getElementById('orderProductsTable');
    table.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price} PLN</td>
            <td>${product.weight} ${product.unit}</td>
            <td>${product.byWeight ? '✅' : '❌'}</td>
            <td>
                <button class="template-btn" onclick="addToCart(${product.id})" style="background: #4CAF50; padding: 8px 12px; font-size: 12px;">➕ В корзину</button>
            </td>
        </tr>
    `).join('');
}

function filterOrderProducts() {
    const search = document.getElementById('orderSearch').value.toLowerCase();
    const category = document.getElementById('orderCategoryFilter').value;
    
    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search);
        const matchCategory = !category || p.category === category;
        return matchSearch && matchCategory;
    });

    const table = document.getElementById('orderProductsTable');
    table.innerHTML = filtered.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price} PLN</td>
            <td>${product.weight} ${product.unit}</td>
            <td>${product.byWeight ? '✅' : '❌'}</td>
            <td>
                <button class="template-btn" onclick="addToCart(${product.id})" style="background: #4CAF50; padding: 8px 12px; font-size: 12px;">➕ В корзину</button>
            </td>
        </tr>
    `).join('');
}

function completeSale() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    const customer = document.getElementById('saleCustomer').value || 'Без имени';
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = {
        id: Date.now(),
        customer,
        items: [...cart],
        total,
        date: new Date().toLocaleString('ru-RU')
    };

    orders.push(order);
    saveOrders();
    alert('✅ Продажа завершена для: ' + customer);
    cart = [];
    renderCart();
    document.getElementById('saleCustomer').value = '';
    document.getElementById('saleNotes').value = '';
    updateDashboard();
    updateStatistics();
}

function addShipment() {
    const name = document.getElementById('shipName').value;
    const address = document.getElementById('shipAddress').value;
    const phone = document.getElementById('shipPhone').value;
    const email = document.getElementById('shipEmail').value;
    const notes = document.getElementById('shipNotes').value;
    const price = document.getElementById('shipPrice').value;

    if (!name || !address || !phone || !email || !notes || !price) {
        alert('Заполните все поля!');
        return;
    }

    const shipment = {
        id: Date.now(),
        name,
        address,
        phone,
        email,
        notes,
        price: parseFloat(price),
        completed: false,
        date: new Date().toLocaleString('ru-RU')
    };

    shipments.push(shipment);
    saveShipments();
    renderShipments();
    document.getElementById('shipName').value = '';
    document.getElementById('shipAddress').value = '';
    document.getElementById('shipPhone').value = '';
    document.getElementById('shipEmail').value = '';
    document.getElementById('shipNotes').value = '';
    document.getElementById('shipPrice').value = '';
    alert('✅ Отправка добавлена!');
    updateDashboard();
}

function renderShipments() {
    const list = document.getElementById('shipmentsList');
    if (shipments.length === 0) {
        list.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">Нет отправок</p>';
        return;
    }

    list.innerHTML = shipments.map(shipment => `
        <div class="product-row ${shipment.completed ? 'completed' : ''}">
            <div class="product-header">
                <div class="product-name">${shipment.name}</div>
                <input type="checkbox" class="shipment-checkbox" ${shipment.completed ? 'checked' : ''} 
                    onchange="toggleShipmentComplete(${shipment.id})">
            </div>
            <div class="product-details">
                📍 ${shipment.address}<br>
                📞 ${shipment.phone}<br>
                📧 ${shipment.email}<br>
                📝 ${shipment.notes}<br>
                💰 ${shipment.price} PLN<br>
                📅 ${shipment.date}
            </div>
            <div class="product-actions">
                <button class="delete-btn" onclick="deleteShipment(${shipment.id})">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
}

function toggleShipmentComplete(shipmentId) {
    const shipment = shipments.find(s => s.id === shipmentId);
    if (shipment) {
        shipment.completed = !shipment.completed;
        saveShipments();
        renderShipments();
        updateDashboard();
    }
}

function deleteShipment(shipmentId) {
    if (confirm('Вы уверены?')) {
        shipments = shipments.filter(s => s.id !== shipmentId);
        saveShipments();
        renderShipments();
        updateDashboard();
    }
}

function updateDashboard() {
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('byWeightProducts').textContent = products.filter(p => p.byWeight).length;
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('shipmentsInTransit').textContent = shipments.filter(s => !s.completed).length;
}

function updateStatistics() {
    // Финансовая статистика
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const avgCheck = orders.length > 0 ? totalSales / orders.length : 0;
    const maxOrder = orders.length > 0 ? Math.max(...orders.map(o => o.total)) : 0;
    const minOrder = orders.length > 0 ? Math.min(...orders.map(o => o.total)) : 0;

    document.getElementById('totalSales').textContent = totalSales.toFixed(2) + ' PLN';
    document.getElementById('avgCheck').textContent = avgCheck.toFixed(2) + ' PLN';
    document.getElementById('maxOrder').textContent = maxOrder.toFixed(2) + ' PLN';
    document.getElementById('minOrder').textContent = minOrder.toFixed(2) + ' PLN';

    // Статистика товаров
    const categories = new Set(products.map(p => p.category)).size;
    document.getElementById('statTotalProducts').textContent = products.length;
    document.getElementById('statByWeight').textContent = products.filter(p => p.byWeight).length;
    document.getElementById('statFixed').textContent = products.filter(p => !p.byWeight).length;
    document.getElementById('statCategories').textContent = categories;

    // Статистика заказов
    const completedOrders = orders.length;
    const pendingOrders = 0;
    const avgOrderSize = orders.length > 0 ? (orders.reduce((sum, o) => sum + o.items.length, 0) / orders.length).toFixed(1) : 0;

    document.getElementById('statTotalOrders').textContent = orders.length;
    document.getElementById('statCompletedOrders').textContent = completedOrders;
    document.getElementById('statPendingOrders').textContent = pendingOrders;
    document.getElementById('statAvgOrderSize').textContent = avgOrderSize + ' товаров';

    // Статистика отправок
    const completedShipments = shipments.filter(s => s.completed).length;
    const pendingShipments = shipments.filter(s => !s.completed).length;
    const shipmentsSum = shipments.reduce((sum, s) => sum + s.price, 0);

    document.getElementById('statTotalShipments').textContent = shipments.length;
    document.getElementById('statCompletedShipments').textContent = completedShipments;
    document.getElementById('statPendingShipments').textContent = pendingShipments;
    document.getElementById('statShipmentsSum').textContent = shipmentsSum.toFixed(2) + ' PLN';

    // Топ товаров
    const productSales = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            if (!productSales[item.name]) {
                productSales[item.name] = { count: 0, sum: 0 };
            }
            productSales[item.name].count += item.quantity;
            productSales[item.name].sum += item.price * item.quantity;
        });
    });

    const topProducts = Object.entries(productSales)
        .sort((a, b) => b[1].sum - a[1].sum)
        .slice(0, 10);

    const topTable = document.getElementById('topProductsTable');
    if (topProducts.length === 0) {
        topTable.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #aaa;">Нет данных о продажах</td></tr>';
    } else {
        topTable.innerHTML = topProducts.map(([name, data]) => `
            <tr>
                <td>${name}</td>
                <td>${data.count}</td>
                <td>${data.sum.toFixed(2)} PLN</td>
            </tr>
        `).join('');
    }

    // История заказов
    const ordersTable = document.getElementById('ordersHistoryTable');
    if (orders.length === 0) {
        ordersTable.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #aaa;">Нет заказов</td></tr>';
    } else {
        ordersTable.innerHTML = orders.slice().reverse().slice(0, 10).map(order => `
            <tr>
                <td>${order.date}</td>
                <td>${order.customer}</td>
                <td>${order.total.toFixed(2)} PLN</td>
                <td>${order.items.length}</td>
            </tr>
        `).join('');
    }
}

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('ru-RU', options);
    document.getElementById('currentDate').textContent = today;
}

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
}

init();
