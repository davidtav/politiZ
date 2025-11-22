from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, String, Text, Boolean, DateTime, ForeignKey
from datetime import datetime

Base = declarative_base()

class Channel(Base):
    __tablename__ = "Channel"

    id = Column("id", String, primary_key=True)
    name = Column("name", String, nullable=False)
    description = Column("description", String, nullable=False)
    avatar = Column("avatar", String)
    category = Column("category", String)
    created_at = Column("createdAt", DateTime)

    source_url = Column("sourceUrl", Text)
    scrape_type = Column("scrapeType", String)
    item_selector = Column("itemSelector", Text)
    title_selector = Column("titleSelector", Text)
    link_selector = Column("linkSelector", Text)
    content_selector = Column("contentSelector", Text)
    image_selector = Column("imageSelector", Text)
    date_selector = Column("dateSelector", Text)
    is_active = Column("isActive", Boolean)

    news = relationship("News", back_populates="channel")


class News(Base):
    __tablename__ = "News"

    id = Column("id", String, primary_key=True)
    channel_id = Column("channelId", String, ForeignKey("Channel.id"), nullable=False)
    title = Column("title", Text, nullable=False)
    content = Column("content", Text, nullable=False)
    image = Column("image", String)
    url = Column("url", Text)
    created_at = Column("createdAt", DateTime, default=datetime.utcnow)
    published_at = Column("publishedAt", DateTime)

    channel = relationship("Channel", back_populates="news")
