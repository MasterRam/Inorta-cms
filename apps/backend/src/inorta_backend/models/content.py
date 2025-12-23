from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from inorta_backend.db.session import Base


class ContentStatus(str, enum.Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class ContentType(str, enum.Enum):
    post = "post"
    page = "page"
    article = "article"


class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    content = Column(Text, nullable=True)
    excerpt = Column(String(512), nullable=True)

    author_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    author = relationship('User', backref='contents')

    status = Column(Enum(ContentStatus), default=ContentStatus.draft)
    content_type = Column(Enum(ContentType), default=ContentType.post)

    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    views_count = Column(Integer, default=0)
    featured_image_id = Column(Integer, nullable=True)
