# YST Elektrik — Next.js

## Geliştirme

```bash
npm install
cp .env.example .env.local   # isteğe bağlı: Mapbox, SMTP
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## Docker (production)

```bash
./scripts/build.sh
./scripts/run.sh
```

veya:

```bash
npm run docker:up
```

- **`PORT`** — host portu (varsayılan `3000`; doluysa script otomatik bir sonrakini dener)
- **`DETACH=1`** — arka planda çalıştır (`docker logs -f yst-enerji-web`)
- **`ENV_FILE`** — varsayılan `.env.local` (SMTP runtime env)

Örnek:

```bash
DETACH=1 PORT=3001 ./scripts/run.sh
```

Ham Docker:

```bash
docker build -t yst-enerji-web:latest .
docker run --rm -p 3000:3000 --env-file .env.local yst-enerji-web:latest
```
