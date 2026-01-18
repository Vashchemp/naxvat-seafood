-- Создаём таблицу товаров
CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  weight FLOAT NOT NULL,
  price FLOAT NOT NULL,
  unit TEXT NOT NULL,
  description TEXT,
  by_weight BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Создаём таблицу продаж
CREATE TABLE IF NOT EXISTS sales (
  id BIGINT PRIMARY KEY,
  date TEXT NOT NULL,
  items JSONB NOT NULL,
  total FLOAT NOT NULL,
  payment_method TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'sold',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Создаём таблицу доставок
CREATE TABLE IF NOT EXISTS deliveries (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  items JSONB NOT NULL,
  total FLOAT NOT NULL,
  payment_method TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Создаём таблицу отправок
CREATE TABLE IF NOT EXISTS shipments (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  order_info TEXT NOT NULL,
  sum FLOAT NOT NULL,
  ship_date TEXT NOT NULL,
  notes TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Вставляем товары
INSERT INTO products (id, category, name, weight, price, unit, description, by_weight) VALUES
-- Красная икра
(1, 'Красная икра', 'Икра кеты Премиум', 100, 95, 'г', 'Премиальная икра кеты 100г', false),
(2, 'Красная икра', 'Икра кеты Премиум', 250, 250, 'г', 'Премиальная икра кеты 250г', false),
(3, 'Красная икра', 'Икра кеты Премиум', 500, 470, 'г', 'Премиальная икра кеты 500г', false),
(4, 'Красная икра', 'Икра горбуши', 100, 75, 'г', 'Икра горбуши 100г', false),
(5, 'Красная икра', 'Икра горбуши', 250, 180, 'г', 'Икра горбуши 250г', false),
(6, 'Красная икра', 'Икра горбуши', 500, 340, 'г', 'Икра горбуши 500г', false),
(7, 'Красная икра', 'Икра нерки', 100, 85, 'г', 'Икра нерки 100г', false),
(8, 'Красная икра', 'Икра нерки', 250, 210, 'г', 'Икра нерки 250г', false),
(9, 'Красная икра', 'Икра нерки', 500, 400, 'г', 'Икра нерки 500г', false),
-- Черная икра
(10, 'Черная икра', 'Икра осетра', 50, 180, 'г', 'Икра осетра 50г', false),
(11, 'Черная икра', 'Икра осетра', 100, 350, 'г', 'Икра осетра 100г', false),
(12, 'Черная икра', 'Икра белуги', 50, 220, 'г', 'Икра белуги 50г', false),
(13, 'Черная икра', 'Икра белуги', 100, 420, 'г', 'Икра белуги 100г', false),
-- Раки
(14, 'Раки', 'Раки живые', 1, 45, 'шт', 'Живые раки 1 шт', true),
(15, 'Раки', 'Раки вареные', 1, 50, 'шт', 'Вареные раки 1 шт', true),
(16, 'Раки', 'Раки замороженные', 500, 120, 'г', 'Замороженные раки 500г', false),
-- Лобстеры
(17, 'Лобстеры', 'Лобстер живой', 1, 180, 'шт', 'Живой лобстер 1 шт', true),
(18, 'Лобстеры', 'Лобстер вареный', 1, 200, 'шт', 'Вареный лобстер 1 шт', true),
(19, 'Лобстеры', 'Хвост лобстера', 200, 150, 'г', 'Хвост лобстера 200г', false),
-- Морепродукты
(20, 'Морепродукты', 'Креветки королевские', 500, 280, 'г', 'Креветки королевские 500г', false),
(21, 'Морепродукты', 'Креветки тигровые', 500, 320, 'г', 'Креветки тигровые 500г', false),
(22, 'Морепродукты', 'Мидии', 500, 140, 'г', 'Мидии 500г', false),
(23, 'Морепродукты', 'Устрицы', 1, 60, 'шт', 'Устрицы 1 шт', true),
(24, 'Морепродукты', 'Гребешки', 500, 250, 'г', 'Гребешки 500г', false),
(25, 'Морепродукты', 'Кальмар', 500, 180, 'г', 'Кальмар 500г', false),
(26, 'Морепродукты', 'Осьминог', 500, 220, 'г', 'Осьминог 500г', false),
-- Снек-боксы
(27, 'Снек-боксы', 'Снек-бокс Премиум', 500, 450, 'г', 'Премиум набор морепродуктов 500г', false),
(28, 'Снек-боксы', 'Снек-бокс Стандарт', 300, 280, 'г', 'Стандартный набор 300г', false),
(29, 'Снек-боксы', 'Снек-бокс Икра', 200, 350, 'г', 'Набор с икрой 200г', false),
(30, 'Снек-боксы', 'Снек-бокс Деликатес', 400, 520, 'г', 'Деликатесный набор 400г', false),
-- Таранька
(31, 'Таранька', 'Таранька вяленая', 500, 160, 'г', 'Таранька вяленая 500г', false),
(32, 'Таранька', 'Таранька копченая', 500, 190, 'г', 'Таранька копченая 500г', false),
(33, 'Таранька', 'Таранька сушеная', 300, 140, 'г', 'Таранька сушеная 300г', false);
