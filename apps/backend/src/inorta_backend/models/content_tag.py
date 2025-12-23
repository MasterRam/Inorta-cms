from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime

from inorta_backend.db.session import Base


class ContentTag(Base):
    __tablename__ = "content_tags"

    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey('contents.id'), nullable=False, index=True)
    tag_id = Column(Integer, ForeignKey('tags.id'), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
