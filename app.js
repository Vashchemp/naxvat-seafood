let products = [];
let sales = [];
let deliveries = [];
let cart = [];
let currentEditingProductId = null;

// Встроенные товары из CSV (сокращённо для примера)
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
    {category: "Чёрная икра", name: "Икра осетра", weight: 50, price: 250, unit: "г", description: "Чёрная икра осетра премиум", byWeight: false},
    {category: "Чёрная икра", name: "Икра осетра", weight: 100, price: 450, unit: "г", description: "Чёрная икра осетра премиум", byWeight: false},
    {category: "Раки", name: "Раки живые 190/240", weight: 1000, price: 190, unit: "кг", description: "Раки живые 190-240г за штуку", byWeight: true},
    {category: "Лобстеры", name: "Лобстеры Канада/ЕС 350-400г", weight: 1000, price: 250, unit: "кг", description: "Живые лобстеры 350-400г", byWeight: true},
    {category: "Морепродукты замороженные", name: "Хвосты лангустов", weight: 1000, price: 550, unit: "кг", description: "Замороженные хвосты лангустов", byWeight: true},
    {category: "Печень трески", name: "Печень трески Норвегия", weight: 500, price: 125, unit: "г", description: "Печень трески норвежская 500г", byWeight: false},
    {category: "King Krab", name: "King Krab первая фаланга", weight: 250, price: 289, unit: "г", description: "King Krab первая фаланга 250г", byWeight: false},
    {category: "Blue Crab", name: "Blue Crab meat", weight: 454, price: 170, unit: "г", description: "Blue Crab мясо 454г", byWeight: false},
    {category: "Собственное производство", name: "Скумбрия собственная посолка", weight: 1000, price: 49.99, unit: "кг", description: "Скумбрия собственного посола", byWeight: true},
    {category: "Снек-боксы", name: "Миксбокс 950г", weight: 950, price: 120, unit: "г", description: "Смесь морепродуктов 950г", byWeight: false},
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

    const savedSales = localStorage.getItem('naxvat_sales');
    if (savedSales) {
        sales = JSON.parse(savedSales);
    }

    const savedDeliveries = localStorage.getItem('naxvat_deliveries');
    if (savedDeliveries) {
        deliveries = JSON.parse(savedDeliveries);
    }

    renderProductsList();
    renderSalesProducts();
    renderDeliveries();
    updateDashboard();
    updateStatistics();
    updateDate();
}

function saveProducts() {
    localStorage.setItem('naxvat_products', JSON.stringify(products));
}

function saveSales() {
    localStorage.setItem('naxvat_sales', JSON.stringify(sales));
}

function saveDeliveries() {
    localStorage.setItem('naxvat_deliveries', JSON.stringify(deliveries));
}

function switchTab(tabName) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    renderCart();
}

function updateCartForm() {
    const operationType = document.getElementById('operationType').value;
    const saleForm = document.getElementById('saleForm');
    const deliveryForm = document.getElementById('deliveryForm');

    if (operationType === 'sale') {
        saleForm.style.display = 'block';
        deliveryForm.style.display = 'none';
    } else {
        saleForm.style.display = 'none';
        deliveryForm.style.display = 'block';
    }
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

function confirmOrder() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    const operationType = document.getElementById('operationType').value;

    if (operationType === 'sale') {
        confirmSale();
    } else {
        confirmDelivery();
    }
}

function confirmSale() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const notes = document.getElementById('saleNotes').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const sale = {
        id: Date.now(),
        items: [...cart],
        total,
        paymentMethod,
        notes,
        date: new Date().toLocaleString('ru-RU')
    };

    sales.push(sale);
    saveSales();
    alert('✅ Продажа завершена!');
    cart = [];
    renderCart();
    document.getElementById('saleNotes').value = '';
    renderSalesHistory();
    updateDashboard();
    updateStatistics();
}

function confirmDelivery() {
    const name = document.getElementById('deliveryName').value;
    const address = document.getElementById('deliveryAddress').value;
    const phone = document.getElementById('deliveryPhone').value;
    const date = document.getElementById('deliveryDate').value;
    const time = document.getElementById('deliveryTime').value;
    const paymentMethod = document.getElementById('deliveryPaymentMethod').value;
    const notes = document.getElementById('deliveryNotes').value;

    if (!name || !address || !phone || !date || !time) {
        alert('Заполните все обязательные поля!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const delivery = {
        id: Date.now(),
        name,
        address,
        phone,
        items: [...cart],
        total,
        deliveryDate: date,
        deliveryTime: time,
        paymentMethod,
        notes,
        status: 'pending',
        createdDate: new Date().toLocaleString('ru-RU')
    };

    deliveries.push(delivery);
    saveDeliveries();
    alert('✅ Доставка создана!');
    cart = [];
    renderCart();
    document.getElementById('deliveryName').value = '';
    document.getElementById('deliveryAddress').value = '';
    document.getElementById('deliveryPhone').value = '';
    document.getElementById('deliveryDate').value = '';
    document.getElementById('deliveryTime').value = '';
    document.getElementById('deliveryNotes').value = '';
    renderDeliveries();
    updateDashboard();
    updateStatistics();
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
    renderSalesProducts();
    closeProductModal();
    alert('✅ Товар обновлён!');
    updateDashboard();
}

function deleteProduct(productId) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderProductsList();
        renderSalesProducts();
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

function renderSalesProducts() {
    const table = document.getElementById('salesProductsTable');
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

function filterSalesProducts() {
    const search = document.getElementById('saleSearch').value.toLowerCase();
    const category = document.getElementById('saleCategoryFilter').value;
    
    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search);
        const matchCategory = !category || p.category === category;
        return matchSearch && matchCategory;
    });

    const table = document.getElementById('salesProductsTable');
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

function renderSalesHistory() {
    const table = document.getElementById('salesHistoryTable');
    if (sales.length === 0) {
        table.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #aaa;">Нет продаж</td></tr>';
        return;
    }

    table.innerHTML = sales.slice().reverse().slice(0, 20).map(sale => `
        <tr>
            <td>${sale.date}</td>
            <td>${sale.total.toFixed(2)} PLN</td>
            <td>${sale.items.length}</td>
            <td>${getPaymentMethodLabel(sale.paymentMethod)}</td>
        </tr>
    `).join('');
}

function renderDeliveries() {
    const list = document.getElementById('deliveriesList');
    if (deliveries.length === 0) {
        list.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">Нет доставок</p>';
        return;
    }

    list.innerHTML = deliveries.map(delivery => `
        <div class="delivery-row ${delivery.status}">
            <div class="product-header">
                <div class="product-name">${delivery.name}</div>
                <span class="delivery-status ${delivery.status}">${getStatusLabel(delivery.status)}</span>
            </div>
            <div class="product-details">
                📍 ${delivery.address}<br>
                📞 ${delivery.phone}<br>
                📅 ${delivery.deliveryDate} ${delivery.deliveryTime}<br>
                💰 ${delivery.total.toFixed(2)} PLN | ${getPaymentMethodLabel(delivery.paymentMethod)}<br>
                📝 ${delivery.notes || 'Нет примечаний'}<br>
                <small style="color: #666;">Создано: ${delivery.createdDate}</small>
            </div>
            <div class="delivery-actions">
                <button class="status-btn" onclick="changeDeliveryStatus(${delivery.id}, 'in-transit')" style="background: #FF9800;">🚗 В пути</button>
                <button class="status-btn completed" onclick="changeDeliveryStatus(${delivery.id}, 'completed')" style="background: #4CAF50;">✅ Завершена</button>
                <button class="delete-btn" onclick="deleteDelivery(${delivery.id})">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
}

function filterDeliveries() {
    const status = document.getElementById('deliveryStatusFilter').value;
    const list = document.getElementById('deliveriesList');
    
    const filtered = status ? deliveries.filter(d => d.status === status) : deliveries;

    if (filtered.length === 0) {
        list.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">Нет доставок</p>';
        return;
    }

    list.innerHTML = filtered.map(delivery => `
        <div class="delivery-row ${delivery.status}">
            <div class="product-header">
                <div class="product-name">${delivery.name}</div>
                <span class="delivery-status ${delivery.status}">${getStatusLabel(delivery.status)}</span>
            </div>
            <div class="product-details">
                📍 ${delivery.address}<br>
                📞 ${delivery.phone}<br>
                📅 ${delivery.deliveryDate} ${delivery.deliveryTime}<br>
                💰 ${delivery.total.toFixed(2)} PLN | ${getPaymentMethodLabel(delivery.paymentMethod)}<br>
                📝 ${delivery.notes || 'Нет примечаний'}<br>
                <small style="color: #666;">Создано: ${delivery.createdDate}</small>
            </div>
            <div class="delivery-actions">
                <button class="status-btn" onclick="changeDeliveryStatus(${delivery.id}, 'in-transit')" style="background: #FF9800;">🚗 В пути</button>
                <button class="status-btn completed" onclick="changeDeliveryStatus(${delivery.id}, 'completed')" style="background: #4CAF50;">✅ Завершена</button>
                <button class="delete-btn" onclick="deleteDelivery(${delivery.id})">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
}

function changeDeliveryStatus(deliveryId, newStatus) {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (delivery) {
        delivery.status = newStatus;
        saveDeliveries();
        renderDeliveries();
        updateDashboard();
        updateStatistics();
    }
}

function deleteDelivery(deliveryId) {
    if (confirm('Вы уверены?')) {
        deliveries = deliveries.filter(d => d.id !== deliveryId);
        saveDeliveries();
        renderDeliveries();
        updateDashboard();
        updateStatistics();
    }
}

function getStatusLabel(status) {
    const labels = {
        'pending': '⏳ Ожидание',
        'in-transit': '🚗 В пути',
        'completed': '✅ Завершена'
    };
    return labels[status] || status;
}

function getPaymentMethodLabel(method) {
    const labels = {
        'cash': '💵 Наличные',
        'paid': '✅ Оплачено',
        'blik': '📱 Blik'
    };
    return labels[method] || method;
}

function updateDashboard() {
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('byWeightProducts').textContent = products.filter(p => p.byWeight).length;
    document.getElementById('totalSales').textContent = sales.length;
    document.getElementById('deliveriesInTransit').textContent = deliveries.filter(d => d.status === 'in-transit').length;
}

function updateStatistics() {
    const totalSalesSum = sales.reduce((sum, s) => sum + s.total, 0);
    const totalDeliveriesSum = deliveries.reduce((sum, d) => sum + d.total, 0);
    const avgCheck = sales.length > 0 ? totalSalesSum / sales.length : 0;
    const completedDeliveries = deliveries.filter(d => d.status === 'completed').length;

    document.getElementById('statSalesSum').textContent = totalSalesSum.toFixed(2) + ' PLN';
    document.getElementById('statDeliveriesSum').textContent = totalDeliveriesSum.toFixed(2) + ' PLN';
    document.getElementById('statAvgCheck').textContent = avgCheck.toFixed(2) + ' PLN';
    document.getElementById('statCompletedDeliveries').textContent = completedDeliveries;

    document.getElementById('statTotalDeliveries').textContent = deliveries.length;
    document.getElementById('statDeliveriesCompleted').textContent = completedDeliveries;
    document.getElementById('statDeliveriesTransit').textContent = deliveries.filter(d => d.status === 'in-transit').length;
    document.getElementById('statDeliveriesPending').textContent = deliveries.filter(d => d.status === 'pending').length;
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
