from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship

from inorta_backend.db.session import Base


class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=True)
    file_path = Column(String(1024), nullable=False)
    file_url = Column(String(1024), nullable=True)
    file_type = Column(String(50), nullable=True)
    mime_type = Column(String(100), nullable=True)
    size = Column(Integer, nullable=True)
    alt_text = Column(String(255), nullable=True)
    caption = Column(Text, nullable=True)
    uploaded_by = Column(Integer, ForeignKey('users.id'), nullable=True)
    uploader = relationship('User', backref='media')
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
