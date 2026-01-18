#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Naxvat SeaFood Telegram Bot
Main bot file with webhook support

Author: Naxvat SeaFood
"""

import os
import sys
import json
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, KeyboardButton
from telegram.ext import (
    Application, CommandHandler, MessageHandler, 
    CallbackQueryHandler, ContextTypes, filters
)

# Добавляем путь для импорта модулей
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from bot_config import BOT_TOKEN, OWNER_CHAT_ID, BOT_SETTINGS
from ai_agent import SessionManager

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Инициализация менеджера сессий
session_manager = SessionManager()

# ═══════════════════════════════════════════════════════════════
# КЛАВИАТУРЫ
# ═══════════════════════════════════════════════════════════════

def get_main_keyboard():
    """Основная клавиатура"""
    keyboard = [
        [
            KeyboardButton("📋 Каталог"),
            KeyboardButton("🛒 Моя корзина")
        ],
        [
            KeyboardButton("💰 Цены"),
            KeyboardButton("🚚 Доставка")
        ],
        [
            KeyboardButton("📱 Связаться с менеджером")
        ]
    ]
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True)


def get_catalog_keyboard():
    """Клавиатура каталога"""
    from products_knowledge import get_all_categories
    
    keyboard = []
    row = []
    
    for cat in get_all_categories():
        row.append(KeyboardButton(f"{cat['icon']} {cat['name']}"))
        if len(row) == 2:
            keyboard.append(row)
            row = []
    
    if row:
        keyboard.append(row)
    
    keyboard.append([KeyboardButton("🔙 Назад")])
    
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True)


# ═══════════════════════════════════════════════════════════════
# ОБРАБОТЧИКИ КОМАНД
# ═══════════════════════════════════════════════════════════════

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    user = update.message.from_user
    
    logger.info(f"User {user.first_name} started the bot")
    
    # Приветственное сообщение
    await update.message.reply_text(
        BOT_SETTINGS["welcome_message"],
        reply_markup=get_main_keyboard()
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /help"""
    help_text = """
🤖 *Помощь по боту Naxvat SeaFood*

Доступные команды:
/start — Начать диалог
/help — Это сообщение
/catalog — Каталог товаров
/cart — Ваша корзина
/clear — Очистить корзину

Кнопки:
📋 Каталог — посмотреть все товары
🛒 Корзина — управление заказом
💰 Цены — прайс-лист
🚚 Доставка — условия доставки
📱 Менеджер — связаться с человеком

━━━━━━━━━━━━━━━━━━━━
📱 Живая поддержка: @naxvatseafood_manager
    """
    
    await update.message.reply_text(
        help_text,
        parse_mode="Markdown",
        reply_markup=get_main_keyboard()
    )


async def catalog_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /catalog"""
    from products_knowledge import format_catalog
    
    await update.message.reply_text(
        format_catalog(),
        parse_mode="Markdown",
        reply_markup=get_catalog_keyboard()
    )


async def cart_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /cart"""
    user_id = update.message.from_user.id
    
    cart_text = session_manager.format_cart(user_id)
    
    keyboard = []
    if session_manager.get_cart(user_id):
        keyboard.append([
            KeyboardButton("💳 Оформить заказ"),
            KeyboardButton("🗑️ Очистить корзину")
        ])
    keyboard.append([KeyboardButton("🔙 Назад")])
    
    await update.message.reply_text(
        cart_text,
        parse_mode="Markdown",
        reply_markup=ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    )


async def clear_cart(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Очистить корзину"""
    user_id = update.message.from_user.id
    session_manager.clear_cart(user_id)
    
    await update.message.reply_text(
        "🗑️ Корзина очищена!",
        reply_markup=get_main_keyboard()
    )


# ═══════════════════════════════════════════════════════════════
# ОБРАБОТЧИКИ СООБЩЕНИЙ
# ═══════════════════════════════════════════════════════════════

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик текстовых сообщений"""
    user = update.message.from_user
    message = update.message.text
    
    logger.info(f"Message from {user.first_name}: {message}")
    
    # Проверяем кнопки
    if message == "📱 Связаться с менеджером":
        await update.message.reply_text(
            f"""
📱 *Связь с менеджером*

Напишите напрямую: @naxvatseafood_manager

Мы ответим быстро! 🦞
            """,
            parse_mode="Markdown"
        )
        return
    
    if message == "🔙 Назад":
        await update.message.reply_text(
            "Главное меню:",
            reply_markup=get_main_keyboard()
        )
        return
    
    if message == "🚚 Доставка":
        await update.message.reply_text(
            BOT_SETTINGS["delivery_info"],
            reply_markup=get_main_keyboard()
        )
        return
    
    if message == "💰 Цены":
        from products_knowledge import get_all_products
        products = get_all_products()[:15]  # Первые 15 товаров
        
        text = "💰 *Популярные цены:*\n\n"
        for p in products:
            text += f"• {p['name']} ({p['weight']}) — {p['price']} zł\n"
        
        text += "\n📱 Полный прайс: @naxvatseafood_manager"
        
        await update.message.reply_text(
            text,
            parse_mode="Markdown",
            reply_markup=get_main_keyboard()
        )
        return
    
    if message == "📋 Каталог":
        from products_knowledge import format_catalog
        await update.message.reply_text(
            format_catalog(),
            parse_mode="Markdown",
            reply_markup=get_catalog_keyboard()
        )
        return
    
    if message == "🛒 Моя корзина":
        user_id = user.id
        cart_text = session_manager.format_cart(user_id)
        
        keyboard = []
        if session_manager.get_cart(user_id):
            keyboard.append([
                KeyboardButton("💳 Оформить заказ"),
                KeyboardButton("🗑️ Очистить корзину")
            ])
        keyboard.append([KeyboardButton("🔙 Назад")])
        
        await update.message.reply_text(
            cart_text,
            parse_mode="Markdown",
            reply_markup=ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
        )
        return
    
    if message == "🗑️ Очистить корзину":
        user_id = user.id
        session_manager.clear_cart(user_id)
        await update.message.reply_text(
            "🗑️ Корзина очищена!",
            reply_markup=get_main_keyboard()
        )
        return
    
    if message == "💳 Оформить заказ":
        user_id = user.id
        cart = session_manager.get_cart(user_id)
        
        if not cart:
            await update.message.reply_text(
                "🛒 Корзина пуста! Добавьте товары.",
                reply_markup=get_main_keyboard()
            )
            return
        
        total = session_manager.get_cart_total(user_id)
        
        await update.message.reply_text(
            f"""
💳 *Оформление заказа*

Сумма: *{total} zł*

Для подтверждения заказа напишите:
• Ваше имя
• Адрес доставки
• Телефон

📱 @naxvatseafood_manager
            """,
            parse_mode="Markdown"
        )
        return
    
    # Обрабатываем через AI
    response = session_manager.process_message(
        user_id=user.id,
        message=message,
        username=user.username,
        first_name=user.first_name
    )
    
    await update.message.reply_text(
        response,
        parse_mode="Markdown",
        reply_markup=get_main_keyboard()
    )


# ═══════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════

def main():
    """Запуск бота"""
    logger.info("🚀 Запуск Naxvat SeaFood Telegram Bot...")
    
    # Создаём приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Добавляем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("catalog", catalog_command))
    application.add_handler(CommandHandler("cart", cart_command))
    application.add_handler(CommandHandler("clear", clear_cart))
    
    # Обработчик сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # Запуск
    logger.info("✅ Бот готов к работе!")
    print("\n" + "="*50)
    print("🦞 Naxvat SeaFood Telegram Bot запущен!")
    print("="*50)
    print(f"\n📱 Ваш бот: @NaxvatSeaFood_bot\n")
    print("⚠️ ВАЖНО: Username бота = @NaxvatSeaFood_bot")
    print("   Менеджер для связи = @naxvatseafood_manager\n")
    
    # Запускаем polling (для тестирования)
    application.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    app = Application.builder().token(BOT_TOKEN).build()
    application = app  # Alias для совместимости
    
    # Добавляем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("catalog", catalog_command))
    application.add_handler(CommandHandler("cart", cart_command))
    application.add_handler(CommandHandler("clear", clear_cart))
    
    # Обработчик сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # Запуск
    logger.info("✅ Бот готов к работе!")
    print("\n" + "="*50)
    print("🦞 Naxvat SeaFood Telegram Bot запущен!")
    print("="*50)
    print(f"\n📱 Ваш бот: @NaxvatSeaFood_bot\n")
    print("⚠️ ВАЖНО: Username бота = @NaxvatSeaFood_bot")
    print("   Менеджер для связи = @naxvatseafood_manager\n")
    
    # Запускаем polling (для тестирования)
    application.run_polling(drop_pending_updates=True)