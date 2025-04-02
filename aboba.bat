REM 1. Пересобираем контейнеры
docker-compose build


REM 2. Копируем дамп базы данных
docker cp .\event_booking.dump local-postgres:/tmp/t.dump

docker-compose up -d

REM 3. Восстанавливаем базу из дампа
docker exec -it local-postgres pg_restore -U anermly -d event_booking /tmp/t.dump

REM 4. Добавляем колонку created_by и внешний ключ
docker exec -it local-postgres psql -U anermly -d event_booking -c "ALTER TABLE events ADD COLUMN created_by INTEGER; ALTER TABLE events ADD CONSTRAINT fk_events_created_by FOREIGN KEY (created_by) REFERENCES users(id);"

REM 6. Добавляем тестовые события с created_by = 1
docker exec -it local-postgres psql -U anermly -d event_booking -c "INSERT INTO events (title, event_date, available_tickets, created_by) VALUES ('Концерт группы XYZ', '2025-04-15 20:00:00', 100, 1);"
docker exec -it local-postgres psql -U anermly -d event_booking -c "INSERT INTO events (title, description, event_date, location, available_tickets, created_by) VALUES ('Выставка искусств', 'Современное искусство от лучших художников', '2025-05-10 10:00:00', 'Музей им. Пушкина', 50, 1);"
docker exec -it local-postgres psql -U anermly -d event_booking -c "INSERT INTO events (title, event_date, location, available_tickets, created_by) VALUES ('Фестиваль еды', '2025-06-20 12:00:00', 'Парк Горького', 500, 1);"
docker exec -it local-postgres psql -U anermly -d event_booking -c "INSERT INTO events (title, description, event_date, location, available_tickets, created_by) VALUES ('Технологическая конференция', 'Искусственный интеллект и будущее', '2026-02-15 09:30:00', 'Крокус Экспо', 200, 1);"
docker exec -it local-postgres psql -U anermly -d event_booking -c "INSERT INTO events (title, description, event_date, location, available_tickets, created_by) VALUES ('Кинофестиваль', 'Премьеры новых фильмов от мировых режиссеров', '2025-07-05 18:00:00', 'Кинотеатр Октябрь', 150, 1);"

REM 7. Проверяем добавленные данные
docker exec -it local-postgres psql -U anermly -d event_booking -c "SELECT * FROM users;"
docker exec -it local-postgres psql -U anermly -d event_booking -c "SELECT id, title, created_by FROM events;"


echo Настройка завершена!
pause