# ═══════════════════════════════════════════════════════════════
# Naxvat SeaFood - AI Agent Configuration
# ═══════════════════════════════════════════════════════════════

# Telegram Bot Token
BOT_TOKEN = "8236320067:AAEK-O0_CE-8VSy7UE1R8EMVqwzRyV1Q8BI"

# Owner Telegram ID (for notifications)
OWNER_CHAT_ID = None  # Укажите ваш Telegram ID для уведомлений

# OpenAI Configuration (для умных ответов)
OPENAI_API_KEY = None  # Опционально: добавьте ключ для GPT-4

# Bot Settings
BOT_SETTINGS = {
    "shop_name": "Naxvat SeaFood",
    "welcome_message": """
🦞 Добро пожаловать в Naxvat SeaFood!

Мы предлагаем лучшие морепродукты премиум качества:
• Красная и черная икра
• Свежие раки и лобстеры
• Крабы King Crab, Blue Crab
• Снек-боксы с морепродуктами
• Премиальная таранька

Чем могу помочь сегодня? 🐟
    """,
    "fallback_message": """
Извините, я не совсем понял ваш вопрос. 🤔

Попробуйте:
• Узнать наличие икры
• Сделать заказ
• Спросить про цены
• Узнать про доставку

Или напишите @naxvatseafood_manager для связи с человеком! 👨‍💼
    """,
    "contact_button": "📱 Связаться с менеджером",
    "catalog_button": "📋 Меню / Каталог",
    "order_button": "🛒 Оформить заказ",
    "cart_button": "🛒 Корзина",
    "checkout_button": "💳 Оформить"
}

# Price range settings
PRICE_RANGES = {
    "budget": "до 100 zł",
    "medium": "100-250 zł", 
    "premium": "250-500 zł",
    "luxury": "от 500 zł"
}

# Working hours
WORKING_HOURS = "Ежедневно с 9:00 до 20:00"

# Delivery info
DELIVERY_INFO = """
🚚 Доставка по всей Польше!

Стоимость доставки рассчитывается индивидуально.
При заказе от 500 zł — бесплатная доставка! 🎁

Самовывоз также возможен.
"""
