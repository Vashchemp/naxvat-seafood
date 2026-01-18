let products = [];
let cart = [];
let sales = [];
let deliveries = [];
let shipments = [];
let currentEditingProductId = null;

// Встроенные товары
const productsData = [
    {category: "Красная икра", name: "Икра кеты Премиум", weight: 100, price: 95, unit: "г", description: "Премиальная икра кеты 100г", byWeight: false},
    {category: "Красная икра", name: "Икра кеты Премиум", weight: 250, price: 250, unit: "г", description: "Премиальная икра кеты 250г", byWeight: false},
    {category: "Красная икра", name: "Икра кеты Премиум", weight: 500, price: 470, unit: "г", description: "Премиальная икра кеты 500г", byWeight: false},
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
    if (savedSales) sales = JSON.parse(savedSales);

    const savedDeliveries = localStorage.getItem('naxvat_deliveries');
    if (savedDeliveries) deliveries = JSON.parse(savedDeliveries);

    const savedShipments = localStorage.getItem('naxvat_shipments');
    if (savedShipments) shipments = JSON.parse(savedShipments);

    renderProductsList();
    renderSalesProducts();
    updateDashboard();
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

function saveShipments() {
    localStorage.setItem('naxvat_shipments', JSON.stringify(shipments));
}

function switchTab(tabName) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    
    if (tabName === 'shipments') {
        renderShipments();
    }
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

function updateCartForm() {
    const type = document.getElementById('operationType').value;
    document.getElementById('saleForm').style.display = type === 'sale' ? 'block' : 'none';
    document.getElementById('deliveryForm').style.display = type === 'delivery' ? 'block' : 'none';
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            weight: product.weight,
            unit: product.unit,
            quantity: quantity
        });
    }
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">Корзина пуста</p>';
        cartTotal.textContent = '0 PLN';
        cartCount.textContent = '0';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">${item.quantity} × ${item.price} PLN</div>
                <div class="cart-item-price">${itemTotal.toFixed(2)} PLN</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">❌ Удалить</button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = total.toFixed(2) + ' PLN';
    cartCount.textContent = cart.length;
}

function confirmOrder() {
    const type = document.getElementById('operationType').value;
    
    if (type === 'sale') {
        const paymentMethod = document.getElementById('paymentMethod').value;
        const notes = document.getElementById('saleNotes').value;
        
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }

        const sale = {
            id: Date.now(),
            date: new Date().toLocaleString('ru-RU'),
            items: [...cart],
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            paymentMethod,
            notes
        };

        sales.push(sale);
        saveSales();
        alert('✅ Продажа завершена!');
        clearCart();
        renderSalesHistory();
        updateDashboard();
    } else {
        const name = document.getElementById('deliveryName').value;
        const address = document.getElementById('deliveryAddress').value;
        const phone = document.getElementById('deliveryPhone').value;
        const date = document.getElementById('deliveryDate').value;
        const time = document.getElementById('deliveryTime').value;
        const paymentMethod = document.getElementById('deliveryPaymentMethod').value;
        const notes = document.getElementById('deliveryNotes').value;

        if (!name || !address || !phone || !date || !time) {
            alert('Заполните все поля!');
            return;
        }

        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }

        const delivery = {
            id: Date.now(),
            name,
            address,
            phone,
            date,
            time,
            items: [...cart],
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            paymentMethod,
            notes,
            status: 'pending',
            createdAt: new Date().toLocaleString('ru-RU')
        };

        deliveries.push(delivery);
        saveDeliveries();
        alert('✅ Доставка создана!');
        clearCart();
        renderDeliveries();
        updateDashboard();
    }
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
                <button class="template-btn" onclick="addToCart(${product.id})" style="background: #4CAF50; padding: 8px 12px; font-size: 12px;">➕ Добавить</button>
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
                <button class="template-btn" onclick="addToCart(${product.id})" style="background: #4CAF50; padding: 8px 12px; font-size: 12px;">➕ Добавить</button>
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

    table.innerHTML = sales.map(sale => `
        <tr>
            <td>${sale.date}</td>
            <td>${sale.total.toFixed(2)} PLN</td>
            <td>${sale.items.length}</td>
            <td>${sale.paymentMethod === 'cash' ? '💵 Наличные' : sale.paymentMethod === 'paid' ? '✅ Оплачено' : '📱 Blik'}</td>
        </tr>
    `).join('');
}

function renderDeliveries() {
    const list = document.getElementById('deliveriesList');
    if (deliveries.length === 0) {
        list.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">Нет доставок</p>';
        return;
    }

    const statusFilter = document.getElementById('deliveryStatusFilter').value;
    const filtered = statusFilter ? deliveries.filter(d => d.status === statusFilter) : deliveries;

    list.innerHTML = filtered.map(delivery => `
        <div class="delivery-row ${delivery.status}">
            <div class="product-header">
                <div class="product-name">${delivery.name}</div>
                <span class="delivery-status ${delivery.status}">
                    ${delivery.status === 'pending' ? '⏳ Ожидание' : delivery.status === 'in-transit' ? '🚗 В пути' : '✅ Завершена'}
                </span>
            </div>
            <div class="product-details">
                📍 ${delivery.address}<br>
                📞 ${delivery.phone}<br>
                📅 ${delivery.date} ${delivery.time}<br>
                💰 ${delivery.total.toFixed(2)} PLN<br>
                📝 ${delivery.notes}
            </div>
            <div class="delivery-actions">
                <button class="status-btn ${delivery.status}" onclick="updateDeliveryStatus(${delivery.id})">
                    ${delivery.status === 'pending' ? '🚗 В пути' : delivery.status === 'in-transit' ? '✅ Завершена' : '✅ Завершена'}
                </button>
                <button class="delete-btn" onclick="deleteDelivery(${delivery.id})">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');

    updateDeliveryStats();
}

function filterDeliveries() {
    renderDeliveries();
}

function updateDeliveryStatus(deliveryId) {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (!delivery) return;

    if (delivery.status === 'pending') {
        delivery.status = 'in-transit';
    } else if (delivery.status === 'in-transit') {
        delivery.status = 'completed';
    }

    saveDeliveries();
    renderDeliveries();
    updateDashboard();
}

function deleteDelivery(deliveryId) {
    if (confirm('Вы уверены?')) {
        deliveries = deliveries.filter(d => d.id !== deliveryId);
        saveDeliveries();
        renderDeliveries();
        updateDashboard();
    }
}

function updateDeliveryStats() {
    document.getElementById('statTotalDeliveries').textContent = deliveries.length;
    document.getElementById('statDeliveriesCompleted').textContent = deliveries.filter(d => d.status === 'completed').length;
    document.getElementById('statDeliveriesTransit').textContent = deliveries.filter(d => d.status === 'in-transit').length;
    document.getElementById('statDeliveriesPending').textContent = deliveries.filter(d => d.status === 'pending').length;
}

function renderShipments() {
    const list = document.getElementById('shipmentsList');
    if (shipments.length === 0) {
        list.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">Нет отправок</p>';
        return;
    }

    // Сортируем по дате отправки (раньше должны быть выше)
    const sorted = [...shipments].sort((a, b) => new Date(a.shipDate) - new Date(b.shipDate));

    const statusFilter = document.getElementById('shipmentStatusFilter')?.value || '';
    const filtered = statusFilter ? sorted.filter(s => s.completed === (statusFilter === 'completed')) : sorted;

    list.innerHTML = filtered.map(shipment => `
        <div class="product-row ${shipment.completed ? 'completed' : ''}">
            <div class="product-header">
                <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                    <input type="checkbox" ${shipment.completed ? 'checked' : ''} onchange="toggleShipmentComplete(${shipment.id})" style="width: 20px; height: 20px; cursor: pointer;">
                    <div class="product-name">${shipment.name}</div>
                </div>
                <span style="background: ${shipment.completed ? '#4CAF50' : '#FF9800'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">
                    ${shipment.completed ? '✅ Отправлено' : '⏳ Ожидание'}
                </span>
            </div>
            <div class="product-details">
                📞 ${shipment.phone}<br>
                📧 ${shipment.email}<br>
                📍 ${shipment.address}<br>
                📦 ${shipment.order}<br>
                💰 ${shipment.sum} PLN<br>
                📅 Отправить: ${shipment.shipDate}<br>
                📝 ${shipment.notes || 'Нет примечаний'}
            </div>
            <div class="product-actions">
                <button class="template-btn" onclick="copyShipmentData(${shipment.id})" style="background: #2196F3; flex: 1;">📋 Копировать</button>
                <button class="delete-btn" onclick="deleteShipment(${shipment.id})">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
}

function addShipment() {
    const name = document.getElementById('shipName').value;
    const phone = document.getElementById('shipPhone').value;
    const email = document.getElementById('shipEmail').value;
    const address = document.getElementById('shipAddress').value;
    const order = document.getElementById('shipOrder').value;
    const sum = document.getElementById('shipSum').value;
    const shipDate = document.getElementById('shipDate').value;
    const notes = document.getElementById('shipNotes').value;

    if (!name || !phone || !email || !address || !order || !sum || !shipDate) {
        alert('Заполните все обязательные поля!');
        return;
    }

    const shipment = {
        id: Date.now(),
        name,
        phone,
        email,
        address,
        order,
        sum,
        shipDate,
        notes,
        completed: false,
        createdAt: new Date().toLocaleString('ru-RU')
    };

    shipments.push(shipment);
    saveShipments();
    renderShipments();
    
    // Очищаем форму
    document.getElementById('shipName').value = '';
    document.getElementById('shipPhone').value = '';
    document.getElementById('shipEmail').value = '';
    document.getElementById('shipAddress').value = '';
    document.getElementById('shipOrder').value = '';
    document.getElementById('shipSum').value = '';
    document.getElementById('shipDate').value = '';
    document.getElementById('shipNotes').value = '';
    
    alert('✅ Отправка добавлена!');
}

function toggleShipmentComplete(shipmentId) {
    const shipment = shipments.find(s => s.id === shipmentId);
    if (shipment) {
        shipment.completed = !shipment.completed;
        saveShipments();
        renderShipments();
    }
}

function copyShipmentData(shipmentId) {
    const shipment = shipments.find(s => s.id === shipmentId);
    if (!shipment) return;

    const text = `Имя: ${shipment.name}
Телефон: ${shipment.phone}
Email: ${shipment.email}
Адрес: ${shipment.address}
Заказ: ${shipment.order}
Сумма: ${shipment.sum} PLN
Дата отправки: ${shipment.shipDate}
Примечание: ${shipment.notes || 'Нет'}`;

    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Данные скопированы в буфер обмена!');
    }).catch(() => {
        alert('❌ Ошибка при копировании');
    });
}

function deleteShipment(shipmentId) {
    if (confirm('Вы уверены?')) {
        shipments = shipments.filter(s => s.id !== shipmentId);
        saveShipments();
        renderShipments();
    }
}

function updateDashboard() {
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('byWeightProducts').textContent = products.filter(p => p.byWeight).length;
    document.getElementById('totalSales').textContent = sales.length;
    document.getElementById('deliveriesInTransit').textContent = deliveries.filter(d => d.status === 'in-transit').length;

    // Статистика
    const totalSalesSum = sales.reduce((sum, s) => sum + s.total, 0);
    const totalDeliveriesSum = deliveries.reduce((sum, d) => sum + d.total, 0);
    const avgCheck = sales.length > 0 ? totalSalesSum / sales.length : 0;

    document.getElementById('statSalesSum').textContent = totalSalesSum.toFixed(2) + ' PLN';
    document.getElementById('statDeliveriesSum').textContent = totalDeliveriesSum.toFixed(2) + ' PLN';
    document.getElementById('statAvgCheck').textContent = avgCheck.toFixed(2) + ' PLN';
    document.getElementById('statCompletedDeliveries').textContent = deliveries.filter(d => d.status === 'completed').length;
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
