.PHONY: up
up:
	docker-compose -f docker-compose.dev.yml up -d

.PHONY: down
down:
	docker-compose -f docker-compose.dev.yml down

.PHONY: restart
restart:
	docker-compose -f docker-compose.dev.yml restart

.PHONY: reset
reset:
	docker system prune -a -f 

.PHONY: dev
dev:
	pnpm run dev