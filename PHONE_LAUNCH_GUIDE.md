# 🦞 Naxvat SeaFood Bot - Быстрый запуск с телефона

## Шаг 1: Установите Termux
Скачайте из Google Play или F-Droid приложение **"Termux"**

## Шаг 2: Откройте Termux и введите команды

```bash
# Обновить и установить Python
pkg update -y
pkg install python git -y

# Скачать файлы бота
git clone https://github.com/naxvatseafood/naxvat-bot.git
cd naxvat-bot

# Установить библиотеку
pip install python-telegram-bot

# Запустить бота
python main.py
```

---

## 🎯 Если не работает GitHub — альтернатива:

### Вариант A: Через Telegram файлы
1. Скачайте этот архив: `naxvat_bot.zip`
2. Передайте файл в Termux:
   ```bash
   # В Termux введите
   termux-setup-storage
   cp /storage/emulated/0/Download/naxvat_bot.zip ~/
   ```
3. Распакуйте:
   ```bash
   cd ~
   unzip naxvat_bot.zip
   cd telegram_bot
   ```
4. Запустите:
   ```bash
   pip install python-telegram-bot
   python main.py
   ```

### Вариант B: Прямая установка
```bash
# В Termux введите по очереди:
pkg update -y
pkg install python git -y

git clone https://github.com/naxvatseafood/naxvat-bot.git
cd naxvat-bot/telegram_bot
pip install python-telegram-bot
python main.py
```

---

## ✅ Проверка
После запуска вы увидите:
```
🦞 Naxvat SeaFood Telegram Bot запущен!
📱 Ваш бот: @NaxvatSeaFood_bot
```

---

## 📱 Контакты
Возникли вопросы: @naxvatseafood_manager
