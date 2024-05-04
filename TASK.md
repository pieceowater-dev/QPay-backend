- [ ] Backend сервер.
  - [x] Проектирование схемы базы данных на основе описанного функционала.
  - [x] Websocket-соединение с постами для двустороннего обмена данными.
  - [ ] Управление Постами.
    - [ ] Обработка создания транзакции с Поста.
    - [x] Таблица существующих доступных постов (Имя, Адрес, Идентификатор поста).
    - [x] Создание нового поста.
    - [x] Удаление (архивация) поста.
    - [x] Редактирование Имени и Адреса поста.
    - [x] Приостановка / Возобновление поста.
  - [ ] Управление Пользователями.
    - [x] Авторизация пользователей.
    - [x] Таблица существующих пользователей.
    - [x] Функционал создания нового пользователя с уникальной электронной почтой и привилегиями Manager-пользователя.
    - [ ] Редактирование доступных Постов пользователя.
    - [x] Обновление пароля пользователя.
    - [x] Удаление пользователя.
- [ ] Дополнительно.
  - [x] Обработка API Kaspi для проверки и проведения транзакции.
  - [ ] Учет транзакций с последующей выгрузкой в «Dashboard / Аналитика».
  - [ ] Один Administrator (системный) пользователь и неограниченное количество Manager-
пользователей.
  - [ ] Administrator имеет доступ ко всему.
  - [ ] Manager имеет доступ только к данным, связанным с его постами с возможностью
редактирования.
  - [ ] Pipeline автоматического развертывания Backend приложения.