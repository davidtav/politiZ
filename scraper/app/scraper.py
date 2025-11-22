import uuid
from datetime import datetime
from typing import Optional

import requests
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session

from .models import Channel, News


def extract_text(element) -> Optional[str]:
    """Retorna o texto limpo de um elemento HTML."""
    if not element:
        return None
    return element.get_text(strip=True)


def scrape_channel(session: Session, channel: Channel):
    """Executa o scraping para um canal específico com base nos seletores do banco."""
    if not channel.source_url:
        print(f"[Scraper] Canal {channel.name} sem 'sourceUrl'. Pulando.")
        return

    print(f"[Scraper] Coletando notícias de: {channel.name} ({channel.source_url})")

    try:
        resp = requests.get(channel.source_url, timeout=20)
        resp.raise_for_status()
    except Exception as e:
        print(f"[Scraper] Erro ao acessar {channel.source_url}: {e}")
        return

    soup = BeautifulSoup(resp.text, "html.parser")

    # Selector do container da notícia
    item_selector = channel.item_selector or "article"
    items = soup.select(item_selector)

    if not items:
        print(f"[Scraper] Nenhum item encontrado com selector '{item_selector}'.")
        return

    new_count = 0

    for item in items:
        # Título
        if channel.title_selector:
            title_el = item.select_one(channel.title_selector)
        else:
            title_el = item.find("h1") or item.find("h2") or item.find("h3")

        title = extract_text(title_el)
        if not title:
            continue

        # Link
        link_el = None
        if channel.link_selector:
            link_el = item.select_one(channel.link_selector)
        elif title_el is not None and title_el.name == "a":
            link_el = title_el
        else:
            link_el = item.find("a")

        url = link_el.get("href") if link_el and link_el.has_attr("href") else None
        if not url:
            continue

        # Completa URL relativa
        if url.startswith("/"):
            from urllib.parse import urljoin
            url = urljoin(channel.source_url, url)

        # Conteúdo
        if channel.content_selector:
            content_el = item.select_one(channel.content_selector)
            content = extract_text(content_el)
        else:
            p_el = item.find("p")
            content = extract_text(p_el) or title

        # Imagem
        image_url = None
        img_el = None
        if channel.image_selector:
            img_el = item.select_one(channel.image_selector)
        else:
            img_el = item.find("img")

        if img_el and img_el.has_attr("src"):
            from urllib.parse import urljoin
            image_url = urljoin(channel.source_url, img_el["src"])

        # Data
        published_at = None
        if channel.date_selector:
            date_el = item.select_one(channel.date_selector)
            date_text = extract_text(date_el)

            # TODO: implementar parser de datas em PT-BR futuramente
            # Por enquanto armazenamos None

        # Evitar duplicados: mesma URL no mesmo canal
        exists = (
            session.query(News)
            .filter(News.channel_id == channel.id, News.url == url)
            .first()
        )
        if exists:
            continue

        # Criar registro da notícia
        news = News(
            id=str(uuid.uuid4()),  # Prisma usa cuid(), aqui UUID string funciona igual
            channel_id=channel.id,
            title=title,
            content=content,
            image=image_url,
            url=url,
            created_at=datetime.utcnow(),
            published_at=published_at,
        )

        session.add(news)
        new_count += 1

    session.commit()
    print(f"[Scraper] {new_count} novas notícias adicionadas para {channel.name}.")


def scrape_all_channels(session: Session):
    """Executa scraping em todos os canais ativos e configurados."""
    channels = (
        session.query(Channel)
        .filter(Channel.is_active == True)
        .filter(Channel.source_url.isnot(None))
        .all()
    )

    if not channels:
        print("[Scraper] Nenhum canal ativo com 'sourceUrl'.")
        return

    for ch in channels:
        scrape_channel(session, ch)
