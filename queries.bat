docker-compose build

docker cp .\eb.dump local-postgres:/tmp/d.dump

docker-compose up -d

docker exec -it local-postgres pg_restore -U anermly -d event_booking /tmp/d.dump

docker exec -it local-postgres psql -U anermly -d event_booking -c "INSERT INTO events (title, event_date, available_tickets, created_by) VALUES ('Концерт группы XYZ', '2025-04-15 20:00:00', 100, 1);"
docker exec -it local-postgres psql -U anermly -d event_booking -c "INSERT INTO events (title, description, event_date, location, available_tickets, created_by) VALUES ('Выставка искусств', 'Современное искусство от лучших художников', '2025-05-10 10:00:00', 'Музей им. Пушкина', 50, 1);"
docker exec -it local-postgres psql -U anermly -d event_booking -c "INSERT INTO events (title, event_date, location, available_tickets, created_by) VALUES ('Фестиваль еды', '2025-06-20 12:00:00', 'Парк Горького', 500, 1);"

docker exec -it local-postgres psql -U anermly -d event_booking -c "\dt"
docker exec -it local-postgres psql -U anermly -d event_booking -c "\d users"
docker exec -it local-postgres psql -U anermly -d event_booking -c "\d events"
docker exec -it local-postgres psql -U anermly -d event_booking -c "\d bookings"






