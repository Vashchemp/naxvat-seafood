#!/bin/bash
# 🚀 Naxvat SeaFood Bot - Автоматическая установка
# Скопируйте ВСЁ содержимое этого файла и вставьте в Termux

echo "🦞 Naxvat SeaFood Bot - Установка"
echo "================================"

# Шаг 1: Обновление
echo "[1/6] Обновление пакетов..."
pkg update -y > /dev/null 2>&1
pkg upgrade -y > /dev/null 2>&1

# Шаг 2: Установка Python и Git
echo "[2/6] Установка Python и Git..."
pkg install python git -y > /dev/null 2>&1

# Шаг 3: Скачивание бота
echo "[3/6] Скачивание бота..."
cd ~
rm -rf naxvat_bot 2>/dev/null
git clone https://github.com/ ваш-репозиторий naxvat_bot 2>/dev/null

# Если git не работает, скачиваем архив
if [ ! -d "naxvat_bot" ]; then
    echo "Скачивание архива..."
    curl -L -o bot.zip https://ваша-ссылка-на-архив/bot.zip 2>/dev/null
    unzip -q bot.zip
    mv telegram_bot naxvat_bot 2>/dev/null
    rm bot.zip 2>/dev/null
fi

# Шаг 4: Установка зависимостей
echo "[4/6] Установка библиотек..."
cd naxvat_bot
pip install python-telegram-bot requests > /dev/null 2>&1

# Шаг 5: Запуск
echo "[5/6] Запуск бота..."
echo ""
echo "✅ Бот запущен!"
echo "📱 Откройте Telegram и напишите @NaxvatSeaFood_bot"
echo ""
echo "Для работы бота в фоновecho " ом режиме:"
 1. Нажмите Ctrl+Z"
echo "  2. Напишите: bg"
echo "  3. Закройте Termux"
echo ""

python3 main.py
