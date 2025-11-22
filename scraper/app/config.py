import os

class Settings:
    # Usa a mesma DATABASE_URL que o backend (Prisma)
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL não definida. Defina no ambiente ou use env_file no Docker.")

    # Intervalo entre ciclos de scraping (em minutos)
    SCRAPE_INTERVAL_MINUTES = int(os.getenv("SCRAPE_INTERVAL_MINUTES", "10"))

settings = Settings()
