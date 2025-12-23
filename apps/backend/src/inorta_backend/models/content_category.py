from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime

from inorta_backend.db.session import Base


class ContentCategory(Base):
    __tablename__ = "content_categories"

    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey('contents.id'), nullable=False, index=True)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
