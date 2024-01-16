# 🇫🇷 Reqeefy Backend 🇫🇷

J'ai choisi d'utiliser NestJS pour le backend de mon application en raison de sa structure modulaire et de sa simplicité d'utilisation. J'ai opté pour TypeORM pour faciliter la gestion de ma base de données PostgreSQL. Zod a été intégré pour valider de manière robuste les variables d'environnement, garantissant une configuration fiable du système. J'utilise Redis en tant que cache des réponses serveur pour renforcer l'efficacité et la réactivité de mon application. De plus, j'ai décidé d'adopter Docker en environnement de développement pour monter rapidement des containers contenant Redis et PostgreSQL, simplifiant ainsi le processus de configuration de mon environnement de développement.

## Installation


mac :

```bash
pnpm i && make up && pnpm run dev
```

windows :

```bash
pnpm i && docker-compose up -d && pnpm run dev:win
```

# 🇬🇧 Reqeefy Backend 🇬🇧

I chose to use NestJS for the backend of my application because of its modular structure and ease of use. I opted for TypeORM to facilitate the management of my PostgreSQL database. Zod has been integrated to robustly validate environment variables, guaranteeing reliable system configuration. I use Redis as a server response cache to enhance the efficiency and responsiveness of my application. In addition, I've decided to adopt Docker as a development environment to quickly assemble containers containing Redis and PostgreSQL, simplifying the process of configuring my development environment in a smooth and reproducible way.

## Installation

```bash
npm i && npm run dev
```

