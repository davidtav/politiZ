import time
from datetime import datetime

from .db import SessionLocal
from .config import settings
from .scraper import scrape_all_channels


def run():
    interval = settings.SCRAPE_INTERVAL_MINUTES
    print(f"[Job] Scraper iniciado. Intervalo: {interval} minutos.")

    while True:
        print(f"\n[Job] Iniciando ciclo de scraping em {datetime.utcnow()} (UTC)")
        db = SessionLocal()
        try:
            scrape_all_channels(db)
        except Exception as e:
            print(f"[Job] Erro durante scraping: {e}")
        finally:
            db.close()

        print(f"[Job] Aguardando {interval} minutos para o próximo ciclo...")
        time.sleep(interval * 60)


if __name__ == "__main__":
    run()
