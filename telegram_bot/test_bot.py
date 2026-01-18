#!/usr/bin/env python3
"""Тест работы бота — отправка сообщения в Telegram"""

import requests
import sys

BOT_TOKEN = "8236320067:AAEK-O0_CE-8VSy7UE1R8EMVqwzRyV1Q8BI"

def test_bot():
    print("🧪 Тестирование Naxvat SeaFood Bot...")
    print("-" * 50)
    
    # 1. Проверяем информацию о боте
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getMe"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if data.get('ok'):
            bot_info = data['result']
            print(f"✅ Бот работает!")
            print(f"   Имя: {bot_info['first_name']}")
            print(f"   Username: @{bot_info['username']}")
            print(f"   ID: {bot_info['id']}")
        else:
            print("❌ Ошибка: неверный токен")
            return False
    else:
        print(f"❌ Ошибка HTTP: {response.status_code}")
        return False
    
    print("-" * 50)
    print("\n✅ Бот настроен правильно!")
    print("\n📱 Теперь напишите боту в Telegram:")
    print("   1. Откройте @naxvatseafood_manager")
    print("   2. Нажмите 'Start' или отправьте /start")
    print("   3. Напишите 'Привет'")
    print("\n🤖 Бот ответит автоматически!")
    
    return True

if __name__ == "__main__":
    test_bot()
