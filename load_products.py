import json
import csv

# Читаем CSV файл с товарами
products = []
with open('data/products.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        product = {
            'id': len(products) + 1,
            'name': row['name'],
            'category': row['category'],
            'unit': row['unit'],
            'price': float(row['price']),
            'stock': 10  # Начальный остаток
        }
        products.append(product)

# Создаем JSON для загрузки в localStorage
data = {
    'inventory': products,
    'orders': [],
    'shipments': [],
    'deliveries': []
}

# Сохраняем в файл
with open('products_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ Загружено {len(products)} товаров!")
print(f"Файл сохранен: products_data.json")
