.PHONY: up
up:
	docker-compose -f docker-compose.dev.yml up -d

.PHONY: down
down:
	docker-compose -f docker-compose.dev.yml down

.PHONY: rvolumes
rvolumes:
	docker-compose -f docker-compose.dev.yml down
	docker volume prune
	docker-compose -f docker-compose.dev.yml up -d
	pnpm run dev

.PHONY: restart
restart:
	docker-compose -f docker-compose.dev.yml restart

.PHONY: reset
reset:
	docker system prune -a -f 

.PHONY: reset-all
reset-all:
	docker-compose -f docker-compose.dev.yml down
	docker system prune -a -f 

.PHONY: dev
dev:
	pnpm run dev